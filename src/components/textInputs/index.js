import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useStylesTheme } from '../../style/styles';
import { TextInputMask } from 'react-native-masked-text';
import { useEffect, useState, useRef, forwardRef } from 'react';



export const Inputs = forwardRef(({ label, placeholder, maxLength, style, typeKeyboard, typeMask = 'custom', valor, onChangeText, onBlur, secureTextEntry}, ref) => {
  const styleTheme = useStylesTheme();
  const [teste, setTeste] = useState();

  const customMask = typeMask === 'custom' 
  ? { mask: '*'.repeat(100) } 
  : {}
// useEffect(() => {
//   console.log(typeMask)
// })
  return (
    <View style={style}>
      <Text style={{ ...styleTheme.pequeno, ...styles.labelInput }}>{label}</Text>
      <TextInputMask
        type={typeMask}
        options={customMask}
        style={{ ...styleTheme.backgroundColorComponents, ...styleTheme.pequeno, ...styles.input, color: '#000' }}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType=''
        value={valor}
        onChangeText={onChangeText}
        onBlur={onBlur}
        ref={ref}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  labelInput: {
    marginBottom: 3,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    height: 55,
  },
});
