import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStylesTheme } from "../../style/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEmergencialContext } from "../../hook/useEmergencialContext";
import { useEffect } from "react";

export function Welcome({navigation}) {
  const stylesTheme = useStylesTheme();
  const {backgroundColorComponents} = useEmergencialContext();

    return (
      <SafeAreaView style={{...stylesTheme.containerTheme, ...styles.container}}>
        <View style={styles.conteudoPrincipal}>
          <View >
            <Text style={{...stylesTheme.grande, ...styles.tituloWelcome}}>
              BEM VINDO AO EMERGENCIAL SAÚDE
            </Text>
          </View>
          <View style={styles.viewImgLogo}>
            <Image source={require('../../assets/logo.png')} style={styles.imgLogo}/>
          </View>
          <View style={styles.viewBotaoCadastrar}>
            <TouchableOpacity style={{...styles.botaoCadastrarEntrar, backgroundColor: backgroundColorComponents}} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={{...stylesTheme.grande, ...styles.textCadastrar, ...stylesTheme.colorTextCadastrar}}>
                Cadastrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.botaoCadastrarEntrar, ...stylesTheme.backgroundColorComponentsEntrar}} onPress={() => navigation.navigate('Login')}>
              <Text style={{...stylesTheme.grande, ...styles.textCadastrar}}>
                Entrar
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.botaoEntrar} onPress={() => navigation.navigate('Login')}>
              <Text style={{...styles.textColor,...styles.textEntrar}}>
                JÁ POSSUO CADASTRO
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>  
        <View style={{...styles.acessibilidade,...styles.textColor}}>
          <TouchableOpacity style={styles.botaoAcessibilidade} onPress={() => navigation.navigate('Acessibilidade')}>
            {/* <Text style={{...styles.textColor, ...styles.textAcessibilidade}}>
              Acessibilidade
            </Text> */}
            <Icon name="accessible" style={stylesTheme.textColor} size={28}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  conteudoPrincipal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    gap: 70,
  },
  tituloWelcome: {
    textAlign: 'center',
  },
  viewImgLogo:{
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  imgLogo:{
    resizeMode: 'contain',
    marginBottom: 10,
  },
  viewBotaoCadastrar:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  botaoCadastrarEntrar:{
    backgroundColor: '#fff',
    width: '80%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCadastrar:{
    fontWeight: 600,
  },
  acessibilidade: {
    width: '100%',
    height: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  botaoAcessibilidade: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4, 
  },
  imgAcessibilidade: {
    width: 30,
    height: 30,
    marginBottom: 5,
    marginHorizontal: 10
  },
  textAcessibilidade: {
    color: '#fff',
    fontSize: 15,
  }
})