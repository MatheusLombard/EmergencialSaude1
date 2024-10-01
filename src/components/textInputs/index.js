import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { useStylesTheme } from '../../style/styles';
import { TextInputMask } from 'react-native-masked-text';
import { useEffect, useState, forwardRef, useRef } from 'react';
import { useEmergencialContext } from '../../hook/useEmergencialContext';

export const Styles = () => {
  const { backgroundColorButton } = useEmergencialContext();
  return StyleSheet.create({
    labelInput: {
      marginBottom: 3,
      top: 45,
      color: '#fff'
    },
    input: {
      width: '100%',
      marginBottom: 10,
      height: 55,
      borderBottomWidth: 1,
      borderBottomColor: backgroundColorButton,
    },
  });
}

export const Inputs = forwardRef(({ 
  label, 
  placeholder, 
  maxLength, 
  style, 
  typeKeyboard, 
  typeMask = 'custom', 
  valor, 
  onChangeText, 
  onBlur, 
  secureTextEntry 
}, ref) => {
  
  const styleTheme = useStylesTheme();
  const styles = Styles();
  
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(valor || ''); // Track input value
  const labelAnimation = useRef(new Animated.Value(inputValue ? -40 : 0)).current; // Initialize based on input value

  const customMask = typeMask === 'custom' ? { mask: '*'.repeat(100) } : {};

  useEffect(() => {
    // Animate label position based on focus state and input value
    Animated.timing(labelAnimation, {
      toValue: (isFocused || valor) ? -40 : 0, // Move up when focused or has value
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, valor]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={style}>
      <Animated.Text style={{
        ...styleTheme.pequeno,
        ...styles.labelInput,
        transform: [{ translateY: labelAnimation }],
      }}>
        {label}
      </Animated.Text>
      <TextInputMask
        type={typeMask}
        options={customMask}
        style={{ ...styleTheme.pequeno, ...styles.input }}
        maxLength={maxLength}
        keyboardType={typeKeyboard} // Ensure keyboardType is set correctly
        value={valor} // Bind input value to state
        onChangeText={(text) => {
          setInputValue(text); // Update state with new text
          if (onChangeText) onChangeText(text); // Call parent's onChangeText if provided
        }}
        onBlur={() => {
          handleBlur();
          if (onBlur) onBlur(); // Call parent's onBlur if provided
        }}
        onFocus={handleFocus}
        ref={ref}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
});