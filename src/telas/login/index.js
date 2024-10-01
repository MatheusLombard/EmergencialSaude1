import { View, Text, StatusBar, StyleSheet, ImageBackground, Dimensions, Image, ScrollView } from 'react-native';
import { useStylesTheme } from '../../style/styles';
import { Inputs } from '../../components/textInputs';
import { Buttons } from '../../components/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({ navigation }) {
  const stylesTheme = useStylesTheme();

  const [cpf, setCPF] = useState('')
  const [senha, setSenha] = useState('')
  const [idUsuario, setIdUsuario] = useState()
  const { height, width } = Dimensions.get('window')


  async function verificarLogin() {
    const response = await axios.post('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/logar/', {
      cpf: cpf,
      senha: senha,
    })
    setIdUsuario(response.data.id)


  }


  useEffect(() => {
    if (idUsuario != undefined) {
      const salvarIdUsuario = async () => {
        const idUsuarioString = idUsuario.toString();
        await AsyncStorage.setItem('UsuarioId', idUsuarioString);
      };
      salvarIdUsuario()
      navigation.navigate('Home')
    }
  }, [idUsuario])

  return (
    <ImageBackground style={{ ...stylesTheme.containerTheme, ...styles.container }} source={require('../../assets/backgroundElements.png')}>
      <StatusBar backgroundColor={'#060007'} hidden={true} />
      <View style={{ height: height * 0.35, alignItems: 'center', justifyContent: 'center',}}>
        <Image source={require('../../assets/logo.png')} style={{width: 200, height: 200 }}/>
      </View>
      <View style={styles.viewBody}>
        <ScrollView style={{width:'100%' }} contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly',  alignItems: 'center'}}>
          <Text style={stylesTheme.grande}>
            Entrar
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
          <View style={styles.viewRodape}>
            <View style={styles.viewBotoes}>
              <Buttons
                text='Anterior'
                action={() => navigation.goBack()}
              />
              <Buttons
                text='Próximo'
                action={() => verificarLogin()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 30
  },
  viewBody: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#840d0d',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 25,
    paddingVertical: 10,
    paddingTop: 20
  },
  elementos: {
    gap: 20,
    width: '95%'
  },
  viewRodape: {
    width: '95%',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewBotoes: {
    gap: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },

})