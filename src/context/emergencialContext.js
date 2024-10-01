import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EmergenciaContext = createContext({});

export const EmergenciaProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#fff5f5');
  const [backgroundColorButton, setBackgroundColorButton] = useState('#fff')
  const [backgroundColorVermelho, setBackgroundColorVermelho] = useState('#fff')
  const [textColor, setTextColor] = useState('#fff')
  const [colorTextButton,  setColorTextButton] = useState('#9b1717')
  const [textColorBlack,  setTextColorBlack] = useState('#000')

  const [tamanhoFonte, setTamanhoFonte] = useState(0);

  const [usuarioId, setUsuarioId] = useState('null')

  function setDefaultColors() {
    setBackgroundColor('#fff5f5');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#fff')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#840d0d')
  }
  function setColorProta() {
    setBackgroundColor('#fff5f4');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#fff')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#840d0d')
  }
  function setColorTrita() {
    setBackgroundColor('#fff5f6');
    setBackgroundColorButton('#fff')
    setColorTextButton('#9b1717')
    setTextColor('#fff')
    setTextColorBlack('#000')
    setBackgroundColorVermelho('#840d0d')
  }

  useEffect(() => {
    async function getStorage() {
      try {
        const storageTamanhoFonte = await AsyncStorage.getItem('tamanhoFonte');
        const storageBackgroundColor = await AsyncStorage.getItem('background');

        if (storageTamanhoFonte) {
          switch (storageTamanhoFonte) {
            case 'p':
              setTamanhoFonte(0);
              break;
            case 'm':
              setTamanhoFonte(3);
              break;
            case 'g':
              setTamanhoFonte(6);
              break;
            default:
              console.log('Valor de tamanhoFonte não reconhecido');
          }
        }

        if (storageBackgroundColor) {
          if (storageBackgroundColor === '#fff5f4') {
            setColorProta();

          } else if (storageBackgroundColor === '#fff5f6') {
            setColorTrita();
          } else {
            console.log('Cor armazenada não encontrada, usando cor padrão.');
            setDefaultColors();
          }
        } else {
          setDefaultColors();
        }
      } catch (error) {
        console.error('Erro ao buscar dados do AsyncStorage:', error);
      }
    }

    getStorage();

    return () => {
    };
  }, []);



  return (
    <EmergenciaContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,
        backgroundColorButton,
        setBackgroundColorButton,
        colorTextButton,
        setColorTextButton,
        textColor,
        setTextColor,
        textColorBlack,
        setTextColorBlack,
        backgroundColorVermelho,
        setBackgroundColorVermelho,

        tamanhoFonte,
        setTamanhoFonte,

        usuarioId,
        setUsuarioId
      }}
    >
      {children}
    </EmergenciaContext.Provider>
  );
};
