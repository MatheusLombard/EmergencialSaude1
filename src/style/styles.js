import { StyleSheet } from "react-native";
import { useEmergencialContext } from "../hook/useEmergencialContext";

export const useStylesTheme = () => {
    const { backgroundColor, backgroundColorButton, colorTextButton, tamanhoFonte, textColor, textColorBlack,
      backgroundColorVermelho
    } = useEmergencialContext();
    return StyleSheet.create({
        containerTheme: {
            backgroundColor: backgroundColor,
            width: '100%',
            height: '100%',
            justifyContent: 'space-between', // Usado em muitos casos
          },
          grande: {
            fontSize: 32 + tamanhoFonte, 
            color: textColor,
          },
          medio: {
            fontSize: 23 + tamanhoFonte,
            color: textColor,
          },
          pequeno: {
            fontSize: 18 + tamanhoFonte,
            color: textColor,
          },
          backgroundColor: {
            backgroundColor: backgroundColor,
          },
          backgroundColorButton: {
            backgroundColor: backgroundColorButton,
            alignItems: "center",
            justifyContent: "center",
          },
          textColor: {
            color: textColor
          },
          colorTextButton: {
            color: colorTextButton
          },
          textColorBlack: {
            color: textColorBlack
          },
          backgroundColorVermelho:{
            backgroundColor: backgroundColorVermelho
          }
          // botoes:{
          //   fontSize: 25 + tamanhoFonte,
          //   color: colorComponentsText // ou #000
          // },
          // textColor:{
          //   // color: colorText,
          // },
          // colorComponentsText:{
          //   color: colorComponentsText,
          // },
          // backgroundComponents:{
          //   backgroundColor: backgroundColorComponents,
          // },
          // backgroundColorComponentsEntrar:{
          //   backgroundColor: backgroundColorComponentsEntrar,
          // },
          // colorTextCadastrar: {
            // color: colorTextCadastrar,
          // },
          // backgroundColorComponentsChamarDrawer: {
          //   backgroundColor: colorComponentsChamarDrawer,
          // }
    });
}