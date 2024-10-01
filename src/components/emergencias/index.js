import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useEmergencialContext } from '../../hook/useEmergencialContext';
import { useStylesTheme } from '../../style/styles';

export function Emergencias({ emergencia, emergenciaSelecionada, isSelected }) {
  const stylesTheme = useStylesTheme();
  const { backgroundColor, backgroundColorVermelho, setBackgroundColorVermelho, colorTextCadastrar } = useEmergencialContext();

  useEffect(() => {
      if (backgroundColor === '#fff5f5'){

      }else if(
        
        backgroundColor === '#fff5f4') {
          setBackgroundColorVermelho('#FF933E');
        } else if (backgroundColor === '#fff5f6') {
        setBackgroundColorVermelho('#FFA1AA');
      }
    }, [backgroundColor])


  const buttonColor = !isSelected ? backgroundColorVermelho : '#ff0000' 
  const textButtonColor = !isSelected ? colorTextCadastrar :  '#fff'

  return (
    <View style={styles.areaEscolher}>
      <TouchableOpacity
        style={{ ...stylesTheme.backgroundColorComponents, ...styles.botaoAreaEscolher, backgroundColor: buttonColor }}
        onPress={emergenciaSelecionada} // Verifique se a função está sendo chamada corretamente
      >
        <Text style={{...stylesTheme.grande, fontWeight: '900', color: textButtonColor}}>{emergencia}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    areaEscolher: {
        width: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10, 
    },
    absolute:{ 
        height: 120,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        backgroundColor: "black",
        borderRadius: 20,
    },
    botaoAreaEscolher: {
        width: "90%",
        height: 100,
        borderRadius: 10,
        marginBottom: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
});