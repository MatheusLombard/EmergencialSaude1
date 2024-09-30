import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useEmergencialContext } from '../../hook/useEmergencialContext';
import { useStylesTheme } from '../../style/styles';

export function Emergencias({ emergencia, emergenciaSelecionada, isSelected }) {
  const stylesTheme = useStylesTheme();
  const { backgroundColor, colorComponentsChoose, setColorComponentsChoose, colorTextCadastrar } = useEmergencialContext();

  useEffect(() => {
      if (backgroundColor === '#6D050F' || backgroundColor === '#FFF') {
        setColorComponentsChoose('#FFA1AA');
      } else if (backgroundColor === '#FFFFFE') {
        setColorComponentsChoose('#FF933E');
      }
    }, [backgroundColor])


  const buttonColor = !isSelected ? '#FF3333' : colorComponentsChoose; 
  const textButtonColor = !isSelected ? '#fff' : colorTextCadastrar

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
        
    },
});