import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useStylesTheme } from '../../../style/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useEmergencialContext } from '../../../hook/useEmergencialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function FichaEditavel({ navigation }) {
  const stylesTheme = useStylesTheme();
  const [usuario, setUsuario] = useState({});
  const [fichaMedica, setFichaMedica] = useState(null); // Altere para null
  const [nascimento, setNascimento] = useState()

  
  
  
  useEffect(() => {
    async function pegarInfo() {
      const usuarioIdString = await AsyncStorage.getItem('UsuarioId');
      const usuarioId = parseInt(usuarioIdString);
      
      console.log(usuarioId)
      
      const response = await axios.post('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/pegarInfo/', {
        id: usuarioId
      });
      setUsuario(response.data);
      setFichaMedica(response.data.FichaMedica);
      setNascimento(usuario.nascimento)
    }
    
    pegarInfo();
  }, []);
  
  const formatarData = (data) => {
    // Certifique-se de que a data não seja undefined ou null
    if (data && typeof data === 'string') {
      const [year, month, day] = data.split('-');
      return `${day}/${month}/${year}`;
    }
    return 'Data não disponível';
  };


  const listarDoencas = () => {
    if (usuario.Doencas && usuario.Doencas.length > 0) {
      return usuario.Doencas.map((doenca) => doenca.doenca).join(', ');
    }
    return 'Nenhuma doença registrada.';
  };
  return (
    <SafeAreaView style={{ ...stylesTheme.containerTheme, ...styles.container }}>
      <StatusBar backgroundColor={'#060007'} hidden={true} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%' }}>
        <Icon name='arrow-back' style={{ ...stylesTheme.textColorBlack, ...styles.arrow }} />
      </TouchableOpacity>
      <View style={styles.viewBody}>
        <View>
          <Text style={{ ...stylesTheme.grande, ...styles.tituloFicha, ...stylesTheme.textColorBlack }}> FICHA </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.areaInformacoes}>
          <View>
            <Text style={{ ...stylesTheme.medio, ...styles.titulosAreaInformacoes, ...stylesTheme.textColorBlack }}>INFORMAÇÕES PESSOAIS</Text>
            <View style={{ ...styles.boxAreaInformacoes, ...stylesTheme.backgroundColorVermelho }}>
              <Text style={stylesTheme.pequeno}>Nome: {usuario.nome}</Text>
              <View style={styles.subBoxAreaInformacoes}>
                <Text style={stylesTheme.pequeno}>Sexo: {usuario.sexo}</Text>
                <Text style={stylesTheme.pequeno}>Idade: {formatarData(usuario.nascimento)}</Text>
              </View>
              <Text style={stylesTheme.pequeno}>CPF: {usuario.CPF}</Text>
              <Text style={stylesTheme.pequeno}>Telefone pessoal: {usuario.telefonePessoal}</Text>
              <Text style={stylesTheme.pequeno}>Telefone emergência: {usuario.telefoneEmergencia}</Text>
            </View>
            <Text style={{ ...stylesTheme.medio, ...styles.titulosAreaInformacoes, ...stylesTheme.textColorBlack }}>ENDEREÇO</Text>
            <View style={{ ...styles.boxAreaInformacoes, ...stylesTheme.backgroundColorVermelho }}>
              <Text style={stylesTheme.pequeno}>CEP: {usuario.CEP}</Text>
              <Text style={stylesTheme.pequeno}>Rua: {usuario.endereco}</Text>
              <View style={styles.subBoxAreaInformacoes}>
                <Text style={stylesTheme.pequeno}>N°: {usuario.numero} </Text>
                <Text style={stylesTheme.pequeno}>Bairro: {usuario.bairro}</Text>
              </View>
              <View style={styles.subBoxAreaInformacoes}>
                <Text style={stylesTheme.pequeno}>Cidade: {usuario.cidade}</Text>
                <Text style={stylesTheme.pequeno}>Estado: {usuario.estado}</Text>
              </View>
            </View>
            <Text style={{ ...stylesTheme.medio, ...styles.titulosAreaInformacoes, ...stylesTheme.textColorBlack }}>INFORMAÇÕES MÉDICAS:</Text>
            <View style={{ ...styles.boxAreaInformacoes, ...stylesTheme.backgroundColorVermelho }}>
              <Text style={stylesTheme.pequeno}>Problemas de Saúde: {listarDoencas()}</Text>
              <Text style={stylesTheme.pequeno}>Medicamentos: {fichaMedica ? fichaMedica.medicamentos : 'Carregando...'}</Text>
              <Text style={stylesTheme.pequeno}>Alergias: {fichaMedica ? fichaMedica.alergias : 'Carregando...'}</Text>
              <Text style={stylesTheme.pequeno}>Comorbidades: {fichaMedica ? fichaMedica.comorbidades : 'Carregando...'}</Text>
              <Text style={stylesTheme.pequeno}>Câncer: {fichaMedica ? fichaMedica.cancer : 'Carregando...'}</Text>
              <Text style={stylesTheme.pequeno}>Tipo sanguíneo: {fichaMedica ? fichaMedica.tipoSanguineo : 'Carregando...'}</Text>
              <Text style={stylesTheme.pequeno}>Observação: {fichaMedica ? fichaMedica.obs : 'Carregando...'}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    gap: 20
  },
  arrow: {
    fontSize: 30,
  },
  viewBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    width: '95%'
  },
  titulosAreaInformacoes: {
    marginBottom: 10,
    marginLeft: 10,
  },
  areaInformacoes: {
    width: '100%'
  },
  boxAreaInformacoes: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    gap: 7,
    borderRadius: 15
  },
  subBoxAreaInformacoes: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between'
  },
  viewAreaBotao: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  areaBotao: {
    backgroundColor: '#DE2335',
    padding: 10,
    borderRadius: 10,
    width: '35%',
  },
  textoAreaBotao: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '300',
  },
})