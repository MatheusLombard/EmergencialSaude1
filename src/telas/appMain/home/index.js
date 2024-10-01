import { TouchableOpacity, View, Text, StyleSheet, StatusBar, Dimensions, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Icon  from 'react-native-vector-icons/FontAwesome';
// import { useFocusEffect } from '@react-navigation/native';
import { useStylesTheme } from '../../../style/styles';
import { useEffect, useState } from 'react';
import { useEmergencialContext } from '../../../hook/useEmergencialContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Home({ navigation }) {
  const styleTheme = useStylesTheme();
  const { backgroundColor } = useEmergencialContext();
  const { width } = Dimensions.get('window');
  const [borderColor, setBorderColor] = useState('white');

  const [usuario, setUsuario] = useState({});
  const [saude, setSaude] = useState('');


  function calcularIdade(dataNascimento) {
    if (!dataNascimento) {
      console.log("Data de nascimento não fornecida ou está indefinida");
      return;
    }

    const hoje = new Date(); // Data atual
    const nascimento = new Date(dataNascimento); // Converte a string de nascimento em um objeto de data

    // Verifica se a data de nascimento é válida
    if (isNaN(nascimento)) {
      console.log("Data de nascimento inválida");
      return;
    }

    // Calcula a diferença entre os anos
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    // Ajusta a idade se o aniversário ainda não ocorreu neste ano
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  useEffect(() => {
    if (backgroundColor === '#060007') {
      setBorderColor('#fff')
    } else {
      setBorderColor('#000')
    }
  })

  const circleSize = width * 0.8;

  // useEffect(() => {
  //   async function pegarDados() {
  //     try {
  //       // Obtém o id do usuário do AsyncStorage
  //       const idUsuarioString = await AsyncStorage.getItem('UsuarioId')
  //       const idUsuario = parseInt(idUsuarioString)

  //       // Faz a requisição para pegar as informações do usuário
  //       const response = await axios.post('https://d75b-2804-14c-b385-8302-4556-caff-7263-c55d.ngrok-free.app/pegarInfo/', {
  //         id: idUsuario
  //       });

  //       // Pega os dados da resposta
  //       const dadosUsuario = response.data;

  //       // Atualiza os estados diretamente
  //       setUsuario(dadosUsuario);
  //       setIdentificacao(dadosUsuario.nome);
  //       setAge(dadosUsuario.nascimento);
  //       setRua(dadosUsuario.endereco);
  //       setNumero(dadosUsuario.numero);
  //       setBairro(dadosUsuario.bairro);
  //       setMedicamentos(dadosUsuario.FichaMedica.medicamentos);
  //       setAlergia(dadosUsuario.FichaMedica.alergias);
  //       setNascimento(calcularIdade(age))
  //       setObs(dadosUsuario.FichaMedica.obs)

  //     } catch (error) {
  //       console.error("Erro ao pegar dados do usuário:", error);
  //     }
  //   }

  //   pegarDados();
  // }, []);  // O array vazio garante que o useEffect rode apenas uma vez





  const iniciarChamada = async () => {
    const idUsuarioString = await AsyncStorage.getItem('UsuarioId');
    const idUsuario = parseInt(idUsuarioString);

    try {
      const response = await axios.post('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/pegarInfo/', {
        id: idUsuario
      });

      // Pega os dados da resposta
      const dadosUsuario = response.data;

      const listarDoencas = () => {
        if (dadosUsuario.Doencas && dadosUsuario.Doencas.length > 0) {
          return dadosUsuario.Doencas.map((doenca) => doenca.doenca).join(', ');
        }
        return 'Nenhuma doença registrada.';
      };
      setUsuario(dadosUsuario)
      // Atualiza os estados diretamente
      const identificacao = dadosUsuario.nome;
      const age = dadosUsuario.nascimento;
      const rua = dadosUsuario.endereco;
      const numero = dadosUsuario.numero;
      const bairro = dadosUsuario.bairro;
      const medicamentos = dadosUsuario.FichaMedica.medicamentos;
      const alergia = dadosUsuario.FichaMedica.alergias;
      const nascimento = calcularIdade(age);
      const obs = dadosUsuario.FichaMedica.obs;
      const saudeLista = listarDoencas();
      console.log(saudeLista)
      console.log(nascimento)

      const motivo = 'acidente'

      // Faz a requisição para iniciar a chamada
      const chamadaResponse = await fetch('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/iniciar-chamada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identificacao,
          age: nascimento,
          rua,
          numero,
          bairro,
          saude: saudeLista,
          alergia,
          medicamentos,
          motivo,
          obs
        }),
      });

      if (!chamadaResponse.ok) {
        throw new Error('Erro ao iniciar chamada: ' + chamadaResponse.statusText);
      }

      const data = await chamadaResponse.json();
      Alert.alert('Sucesso', `Chamada iniciada com SID: ${data.sid}`);
    } catch (error) {
      console.error('Erro ao iniciar chamada:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a chamada: ' + error.message);
    }
  };



  return (
    <SafeAreaView style={{ ...styleTheme.containerTheme, ...styles.container }}>
      <StatusBar backgroundColor={'#fff'} hidden={true} />
      {/* <TouchableOpacity style={styles.areaMenu} onPress={() => navigation.openDrawer()}>
        <Text style={{ ...styleTheme.medio, ...styles.textoMenu }}>Menu</Text>
        <Icon name="navicon" size={27} style={styleTheme.textColor} />
      </TouchableOpacity> */}
      <View style={styles.areaChamar}>
        <View style={styles.ViewBotaoAreaChamar}>
          <TouchableOpacity style={{ ...styleTheme.backgroundColorVermelho, ...styles.botaoAreaChamar, width: circleSize, height: circleSize, borderColor: borderColor }} onPress={() => navigation.navigate('TelaEscolha')}>
            <Icon name='phone' size={150} style={{...styleTheme.textColor}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewBotaoAreaChamarAcidente}>
          <TouchableOpacity style={{ ...styleTheme.backgroundColorVermelho, ...styles.botaoAreaChamarAcidente, borderColor: borderColor }} onPress={iniciarChamada}>
            <Text style={{ ...styleTheme.grande, ...styles.textoChamar }}>ACIDENTE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.navBar, ...styleTheme.backgroundColorVermelho }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" style={{ ...styleTheme.grande, ...styleTheme.textColor }} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('FichaEditavel')}>
        <Icon name="user" style={{ ...styleTheme.grande, ...styleTheme.textColor }} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Acessibilidade')}>
        <Icon name="eye-slash" style={{ ...styleTheme.grande, ...styleTheme.textColor }} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Sair')}>
        <Icon name="sign-out" style={{ ...styleTheme.grande, ...styleTheme.textColor }} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  areaMenu: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  areaChamar: {
    flex: 1,
    width: '100%',
  },
  ViewBotaoAreaChamar: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAreaChamar: {
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  ViewBotaoAreaChamarAcidente: {
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  botaoAreaChamarAcidente: {
    bottom: 10,
    width: '80%',
    borderRadius: 25,
    borderWidth: 2
  },
  textoChamar: {
    textAlign: 'center',
    fontWeight: '600',
    padding: 20
  },
  navBar:{
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }

})
