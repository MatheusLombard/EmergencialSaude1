import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStylesTheme } from '../../style/styles';

export function Check({ title, onToggle }) {
  const styleTheme = useStylesTheme();
  const [isSelected, setSelection] = useState(false);

  const toggleSelection = () => {
    const newSelection = !isSelected;
    setSelection(newSelection);
    onToggle(title, newSelection); // Chama a função de callback passando o título e o estado
  };

  return (
    <View style={[styles.checkBoxContainer]}>
      <TouchableOpacity
        onPress={toggleSelection}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Icon 
          name={isSelected ? "check-square" : "square-o"} 
          size={27} 
          style={styleTheme.textColor}
        />
        <Text style={{ ...styleTheme.pequeno, ...styles.checkBoxText }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkBoxText: {
    marginLeft: 10,
    lineHeight: 23,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    height: 40,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent', // Remove a cor de fundo do CheckBox
    borderWidth: 0, // Remove a borda do CheckBox
  },
});
