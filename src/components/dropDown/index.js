import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStylesTheme } from '../../style/styles';

export function Dropdown({label, mode, options = [], style, onValueChange}) {
  const styleTheme = useStylesTheme();
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
      <View style={{...styleTheme.backgroundColorComponents,...styles.areaDropDown}}>
        <Picker
          mode={mode}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
        >
          {options.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    textDropDown: {
        marginLeft: 10,
        marginBottom: 3,
    },
    areaDropDown:{
        marginBottom: 10,
        borderRadius: 15,
        height: 55,
        alignItems: "stretch",
    },
});