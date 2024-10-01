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
  const { setBackgroundColor, backgroundColor, setBackgroundColorButton, 
     setTamanhoFonte, setColorTextButton, setTextColor, setTextColorBlack, setBackgroundColorVermelho} = useEmergencialContext();

  useEffect(() => {
    console.log(backgroundColor)
    if(backgroundColor === '#fff5f4'){
      setIsEnabledProta(true)
    }
    if(backgroundColor === '#fff5f6'){
      setIsEnabledTrita(true)
    }
  }, [])

  function colorPadrao(){
    setBackgroundColor('#fff5f5');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#fff')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#840d0d')
  }
  function colorProta(){
    setBackgroundColor('#fff5f4');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#fff')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#FF933E')
  }
  function colorTrita(){
    setBackgroundColor('#fff5f6');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#000')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#FFA1AA');
  }
  const changeValueProta = async () => {
    setIsEnabledProta(previousState => !previousState);
    if (isEnabledProta !== false) {
      console.log('desativado')
      colorPadrao();

      await AsyncStorage.setItem('background', '#fff5f5')

    } else {
      console.log('ativado')
      colorProta();
      
      // GUARDANDO INFORMAÇÕES 

      await AsyncStorage.setItem('background', '#fff5f4')
    }
  }
  const changeValueTrita = async () => {
    setIsEnabledTrita(previousState => !previousState);
    if (isEnabledTrita !== false) {
      console.log('desativado')
      colorPadrao();

      // GUARDANDO INFORMAÇÕES 

      await AsyncStorage.setItem('background', '#fff5f5')
      
      } else {
        console.log('ativado')
        colorTrita();
        
        // GUARDANDO INFORMAÇÕES 

        await AsyncStorage.setItem('background', '#fff5f6')
        

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
        <Icon name='arrow-back' style={{...styles.arrow, ...stylesTheme.textColorBlack}}/>
      </TouchableOpacity>
      <View style={styles.viewBody}>
        <View style={styles.viewTitulo}>
          <Text style={{...stylesTheme.grande, ...styles.tituloAcessibilidade, ...stylesTheme.textColorBlack }}>
            Acessibilidade
          </Text>
        </View>
        <View style={styles.elementos}>
          <View style={styles.viewModosAcessibilidade}>
            <Text style={{...stylesTheme.pequeno, ...styles.textoModosAcessibilidade, ...stylesTheme.textColorBlack}}>
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
            <Text style={{...stylesTheme.pequeno,  ...styles.textoModosAcessibilidade, ...stylesTheme.textColorBlack}}>
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
            <Text style={{...stylesTheme.pequeno, width: '50%', ...stylesTheme.textColorBlack}}>
              Tamanho da fonte
            </Text>
            <TouchableOpacity style={{...styles.botoesTamanho}} onPress={() => changeFontSize("p")}>
              <Text style={{...stylesTheme.textColor, fontSize: 18, ...stylesTheme.textColorBlack}}>
                P
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.botoesTamanho}} onPress={() => changeFontSize("m")}>
              <Text style={{...stylesTheme.textColor, fontSize: 23, ...stylesTheme.textColorBlack}}>
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.botoesTamanho}} onPress={() => changeFontSize("g")}>
              <Text style={{...stylesTheme.textColor, fontSize: 28, ...stylesTheme.textColorBlack}}>
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
  }
})