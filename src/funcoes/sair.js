import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Sair({ navigation }) {
  useEffect(() => {
    async function LogOut() {
      await AsyncStorage.removeItem('UsuarioId');
      const kaka = await AsyncStorage.getItem('UsuarioId')
      console.log(kaka)
      // Resetar o estado de navegação para que a tela de "Welcome" seja a única na pilha
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
    LogOut(); // Chama a função de logout
  }, [navigation]); // Adiciona `navigation` como dependência

  return (
    <View>
      <Text>Saindo...</Text>
    </View>
  );
}
