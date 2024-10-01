import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useStylesTheme } from '../../style/styles';

export function Buttons({text, gt, lt, action, style} ) {
    const stylesTheme = useStylesTheme();
    return (
    <View>
        <TouchableOpacity style={[{...stylesTheme.backgroundColorButton,...styles.buttonPressEntrar}, style]} onPress={action}>
            <Text style={{...stylesTheme.medio, ...stylesTheme.colorTextButton}}>{text}</Text>
        </TouchableOpacity>
    </View>
  );
} 


const styles = StyleSheet.create({
    buttonPressEntrar: {
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 50
    },
})