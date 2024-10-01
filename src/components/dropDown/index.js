import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStylesTheme } from '../../style/styles';
import { useEmergencialContext } from '../../hook/useEmergencialContext';

export const Styles = () => {
  const { backgroundColorButton } = useEmergencialContext();
  return StyleSheet.create({
    textDropDown: {
      marginLeft: 10,
      marginBottom: 3,
  },
  areaDropDown:{
      marginBottom: 10,
      borderRadius: 15,
      height: 55,
      alignItems: "stretch",
      borderWidth: 1,
      borderBottomColor: backgroundColorButton,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
  },
  });
}

export function Dropdown({label, mode, options = [], style, onValueChange}) {
  const styleTheme = useStylesTheme();
  const styles = Styles()
  const [selectedValue, setSelectedValue] = useState('Escolha aqui');

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    if (onValueChange) {
      onValueChange(itemValue); // Chama a função para notificar a mudança
    }
  };

  return (
    <View style={style}>
      <Text style={{...styleTheme.pequeno,...styles.textDropDown}}>{label}</Text>
      <View style={{...styles.areaDropDown}}>
        <Picker
          mode={mode}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={{...styleTheme.textColor}}
          dropdownIconColor={'#fff'}
        >
          {options.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} style={{...styleTheme.pequeno, ...styleTheme.textColorBlack}} />
          ))}
        </Picker>
      </View>
    </View>
  );
}