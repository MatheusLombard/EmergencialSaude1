import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EmergenciaContext = createContext({});

export const EmergenciaProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#060007');
    const [backgroundColorComponents, setBackgroundColorComponents] = useState('#fff');
    const [backgroundColorComponentsEntrar, setBackgroundColorComponentsEntrar] = useState('#ff3131');
    const [colorText, setColorText] = useState('#fff');
    const [colorTextCadastrar, setColorTextCadastrar] = useState('#ff3131');
    const [colorComponentsText, setColorComponentsText] = useState('#0f0f0f0');
    // const [colorComponentsDrawer, setColorComponentsDrawer] = useState('#fff');
    const [colorComponentsChamarDrawer, setColorComponentsChamarDrawer] = useState('#ff3131');
    const [colorComponentsBox, setColorComponentsBox] = useState('#fff');
    const [colorComponentsChoose, setColorComponentsChoose] = useState('#fff');
    const [tamanhoFonte, setTamanhoFonte] = useState(0);

    const [usuarioId, setUsuarioId] = useState('null')
    const [initialRouteName, setInitialRouteName] = useState(null)

    
    function setDefaultColors() {
        setBackgroundColor('#060007');
        setColorText('#fff');
        setColorTextCadastrar('#ff3131');
        setBackgroundColorComponents('#fff');
        setBackgroundColorComponentsEntrar('#ff3131');
        setColorComponentsChamarDrawer('#ff3131');
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
              if (storageBackgroundColor === '#FFFFFE') {
                setBackgroundColor('#FFFFFE');
                setColorText('#38070C');
                setColorTextCadastrar('#38070C');
                setBackgroundColorComponents('#FF933E');
                setBackgroundColorComponentsEntrar('#FF933E');
                setColorComponentsChamarDrawer('#FF933E')

              } else if (storageBackgroundColor === '#FFF') {
                setBackgroundColor('#FFF');
                setColorText('#38070C');
                setColorTextCadastrar('#38070C');
                setBackgroundColorComponents('#FFA1AA');
                setBackgroundColorComponentsEntrar('#FFA1AA');
                setColorComponentsChamarDrawer('#FFA1AA')
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
                backgroundColorComponents,
                setBackgroundColorComponents,
                backgroundColorComponentsEntrar,
                setBackgroundColorComponentsEntrar,
                colorText,
                setColorText,
                colorTextCadastrar,
                setColorTextCadastrar,
                colorComponentsText,
                setColorComponentsText,
                // colorComponentsDrawer,
                // setColorComponentsDrawer,
                colorComponentsChamarDrawer,
                setColorComponentsChamarDrawer,
                colorComponentsBox,
                setColorComponentsBox,
                colorComponentsChoose,
                setColorComponentsChoose,
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
