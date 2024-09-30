import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStylesTheme } from '../../style/styles';
import { Inputs } from '../../components/textInputs';
import { Buttons } from '../../components/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({navigation}) {
  const stylesTheme = useStylesTheme();

  const [cpf, setCPF] = useState('')
  const [senha, setSenha] = useState('')
  const [idUsuario, setIdUsuario] = useState()


  async function verificarLogin() {
    const response = await axios.post('https://ccdd-2804-14c-b385-8302-b55c-d800-af93-e30f.ngrok-free.app/logar/', {
      cpf: cpf,
      senha: senha,
    })
    setIdUsuario(response.data.id)
    

  }


  useEffect(() => {
    if(idUsuario != undefined){
      const salvarIdUsuario = async () => {
      const idUsuarioString = idUsuario.toString();
      await AsyncStorage.setItem('UsuarioId', idUsuarioString);
    };
    salvarIdUsuario()
    navigation.navigate('Drawer')
  }
}, [idUsuario])

// useEffect(() => {
//   async function teste() {
//     try {
//       const usuarioId = await AsyncStorage.getItem('UsuarioId');
//       console.log(usuarioId)
//       if (usuarioId !== null) {
//         console.log('Usuário encontrado:', usuarioId);
//       } else {
//         console.log('Nenhum usuário encontrado.');
//       }
//     } catch (error) {
//       console.log('Erro ao buscar o usuário do AsyncStorage:', error);
//     }
//   }

//   teste(); // Chama a função dentro do useEffect
// }); // Array de dependências vazio
 return (
   <SafeAreaView style={{...stylesTheme.containerTheme, ...styles.container}}>
     <StatusBar backgroundColor={'#060007'} hidden={true} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%' }}>
          <Icon name='arrow-back' style={{ ...stylesTheme.textColor, ...styles.arrow }} />
        </TouchableOpacity>
    <View style={styles.viewBody}>
      <Text style={stylesTheme.medio}>
        Digite seu CPF e sua Senha para entrar:
      </Text>
      <View style={styles.elementos}>
        <Inputs
          label="CPF: "
          placeholder="Digite aqui..."
          maxLength={14}
          typeMask='cpf'
          valor={cpf}
          onChangeText={(text) => setCPF(text)}
        />
        <Inputs
          label="Senha: "
          placeholder="Digite aqui..."
          maxLength={10}
          valor={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />
      </View>
    </View>
    <View style={styles.viewRodape}>
      <View style={styles.viewBotao}>
        <Buttons
          text='Próximo'
          action={verificarLogin}
        />
      </View>
    </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    gap: 15,
  },
  arrow:{
    fontSize: 30
  },
  viewBody:{
    width: '95%',
    flex: 1,
    gap: 20,
    justifyContent: 'center'
  },
  elementos:{
    gap: 20,
  },
  viewRodape:{
    width: '95%',
    alignItems: 'flex-end',
    marginBottom: 10,
  }
})