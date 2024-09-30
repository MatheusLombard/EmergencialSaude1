import { StyleSheet } from "react-native";
import { useEmergencialContext } from "../hook/useEmergencialContext";

export const useStylesTheme = () => {
    const { backgroundColor, colorText, colorTextCadastrar, backgroundColorComponents, 
      colorComponentsText, backgroundColorComponentsEntrar, tamanhoFonte, colorComponentsChamarDrawer} = useEmergencialContext();
    return StyleSheet.create({
        containerTheme: {
            backgroundColor: backgroundColor,
            width: '100%',
            height: '100%',
            justifyContent: 'space-between', // Usado em muitos casos
          },
          grande: {
            fontSize: 32 + tamanhoFonte, 
            color: colorText,
          },
          medio: {
            fontSize: 23 + tamanhoFonte,
            color: colorText,
          },
          pequeno: {
            fontSize: 18 + tamanhoFonte,
            color: colorText,
          },
          backgroundColorComponents: {
            backgroundColor: backgroundColorComponents,
            alignItems: "center",
            justifyContent: "center",
          },
          botoes:{
            fontSize: 25 + tamanhoFonte,
            color: colorComponentsText // ou #000
          },
          backgroundColor: {
            backgroundColor: backgroundColor,
          },
          textColor:{
            color: colorText,
          },
          colorComponentsText:{
            color: colorComponentsText,
          },
          backgroundComponents:{
            backgroundColor: backgroundColorComponents,
          },
          backgroundColorComponentsEntrar:{
            backgroundColor: backgroundColorComponentsEntrar,
          },
          colorTextCadastrar: {
            color: colorTextCadastrar,
          },
          backgroundColorComponentsChamarDrawer: {
            backgroundColor: colorComponentsChamarDrawer,
          }
    });
}