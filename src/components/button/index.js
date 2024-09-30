import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useStylesTheme } from '../../style/styles';

export function Buttons({text, gt, lt, action, style} ) {
    const stylesTheme = useStylesTheme();
    return (
    <View>
        <TouchableOpacity style={[{...stylesTheme.backgroundColorComponents,...styles.buttonPressEntrar}, style]} onPress={action}>
            <Text style={stylesTheme.botoes}>{text}</Text>
        </TouchableOpacity>
    </View>
  );
} 


const styles = StyleSheet.create({
    buttonPressEntrar: {
        borderRadius: 18,
        width: 160,
        height: 60, 
    },
})