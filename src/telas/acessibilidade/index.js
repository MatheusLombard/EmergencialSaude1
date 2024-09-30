import { StyleSheet, View, StatusBar, TouchableOpacity, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { useStylesTheme } from '../../style/styles';
import { useEmergencialContext } from '../../hook/useEmergencialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Acessibilidade({ navigation }) {
  const [isEnabledTrita, setIsEnabledTrita] = useState(false);
  const [isEnabledProta, setIsEnabledProta] = useState(false);
  const stylesTheme = useStylesTheme();
  const { setBackgroundColor, backgroundColor, setColorText, setColorTextCadastrar,
     setBackgroundColorComponents, setBackgroundColorComponentsEntrar, backgroundColorComponentsEntrar, 
     setTamanhoFonte, setColorComponentsChamarDrawer} = useEmergencialContext();

  useEffect(() => {
    console.log(backgroundColor)
    if(backgroundColor === '#FFFFFE'){
      setIsEnabledProta(true)
    }
    if(backgroundColor === '#FFF'){
      setIsEnabledTrita(true)
    }
  }, [])

  function colorPadrao(){
    setBackgroundColor('#060007');
    setColorText('#fff');
    setColorTextCadastrar('#ff3131');//o mesmo do chamarDrawer
    setBackgroundColorComponents('#fff');
    setBackgroundColorComponentsEntrar('#ff3131');
    setColorComponentsChamarDrawer('#ff3131');
    // setColorTextFicha('#060007')
  }
  function colorProta(){
    setBackgroundColor('#FFFFFE');
    setColorText('#38070C');
    setColorTextCadastrar('#38070C');
    setBackgroundColorComponents('#FF933E');
    setBackgroundColorComponentsEntrar('#FF933E');
    setColorComponentsChamarDrawer('#FF933E');
  }
  function colorTrita(){
    setBackgroundColor('#FFF');
    setColorText('#38070C');
    setColorTextCadastrar('#38070C');
    setBackgroundColorComponents('#FFA1AA');
    setBackgroundColorComponentsEntrar('#FFA1AA');
    setColorComponentsChamarDrawer('#FFA1AA');
  }
  const changeValueProta = async () => {
    setIsEnabledProta(previousState => !previousState);
    if (isEnabledProta !== false) {
      console.log('desativado')
      colorPadrao();

      await AsyncStorage.setItem('background', '#060007')

    } else {
      console.log('ativado')
      colorProta();
      
      // GUARDANDO INFORMAÇÕES 

      await AsyncStorage.setItem('background', '#FFFFFE')
    }
  }
  const changeValueTrita = async () => {
    setIsEnabledTrita(previousState => !previousState);
    if (isEnabledTrita !== false) {
      console.log('desativado')
      colorPadrao();

      // GUARDANDO INFORMAÇÕES 

      await AsyncStorage.setItem('background', '#060007')
      
      } else {
        console.log('ativado')
        colorTrita();
        
        // GUARDANDO INFORMAÇÕES 

        await AsyncStorage.setItem('background', '#FFF')
        

    }
  }

  const changeFontSize = async (e) => {
    if('p' === e) { 
      setTamanhoFonte(0)

      await AsyncStorage.setItem('tamanhoFonte', 'p')
    }else if('m' === e){
      setTamanhoFonte(3)
      await AsyncStorage.setItem('tamanhoFonte', 'm')
    }else if('g' === e){
      setTamanhoFonte(6)
      await AsyncStorage.setItem('tamanhoFonte', 'g')
    }
  }

  return (
    <SafeAreaView style={{...stylesTheme.containerTheme,...styles.container}}>
      <StatusBar backgroundColor={'#060007'} hidden={true} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{width: '100%'}}>
        <Icon name='arrow-back' style={{...stylesTheme.textColor,...styles.arrow}} />
      </TouchableOpacity>
      <View style={styles.viewBody}>
        <View style={styles.viewTitulo}>
          <Text style={{...stylesTheme.grande, ...styles.tituloAcessibilidade }}>
            Acessibilidade
          </Text>
        </View>
        <View style={styles.elementos}>
          <View style={styles.viewModosAcessibilidade}>
            <Text style={{...stylesTheme.pequeno, ...styles.textoModosAcessibilidade}}>
              Modo Claro / Protanopia / Deuteranopia
            </Text>
            <Switch
              trackColor={{ true: '#FF933E', false: '#888' }}
              thumbColor={isEnabledProta ? '#FF013E' : '#ff0000'}
              value={isEnabledProta}
              disabled={isEnabledTrita ? true : false}
              onValueChange={changeValueProta}
            />
          </View>
          <View style={{width: '100%', borderWidth: 1,borderColor: 'gray'}}></View>
          <View style={styles.viewModosAcessibilidade}>
            <Text style={{...stylesTheme.pequeno,  ...styles.textoModosAcessibilidade}}>
              Modo Claro / Tritanopia
            </Text>
            <Switch
              trackColor={{ true: '#FFA1AA', false: '#888' }}
              thumbColor={isEnabledTrita ? '#FF01AA' : '#ff0000'}
              value={isEnabledTrita}
              disabled={isEnabledProta ? true : false}
              onValueChange={changeValueTrita}
            />
          </View>
          <View style={{width: '100%', borderWidth: 1,borderColor: 'gray'}}></View>
          <View style={{...styles.viewModosAcessibilidade, justifyContent: 'space-between'}}>
            <Text style={{...stylesTheme.pequeno, width: '50%'}}>
              Tamanho da fonte
            </Text>
            <TouchableOpacity style={{...styles.botoesTamanho, borderColor: backgroundColorComponentsEntrar}} onPress={() => changeFontSize("p")}>
              <Text style={{...stylesTheme.textColor, fontSize: 18}}>
                P
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.botoesTamanho, borderColor: backgroundColorComponentsEntrar}} onPress={() => changeFontSize("m")}>
              <Text style={{...stylesTheme.textColor, fontSize: 23}}>
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.botoesTamanho, borderColor: backgroundColorComponentsEntrar}} onPress={() => changeFontSize("g")}>
              <Text style={{...stylesTheme.textColor, fontSize: 28}}>
                G
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    gap: 40,
  },
  arrow: {
    fontSize: 30,
  },
  viewBody:{
    width: '85%',
    gap: 70, 
    flex: 1,
  },
  elementos: {
    gap: 20,
  },
  tituloAcessibilidade:{
    textAlign: 'center',
  },
  viewModosAcessibilidade:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textoModosAcessibilidade:{
    width: '90%'
  },
  botoesTamanho:{
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor:'#fff'
  }
})