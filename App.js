import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEmergencialContext } from './src/hook/useEmergencialContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { EmergenciaProvider } from './src/context/emergencialContext';

import { Welcome } from './src/telas/welcome/index'
import { Cadastro } from './src/telas/cadastro'
import { Login } from './src/telas/login'
import { Acessibilidade } from './src/telas/acessibilidade'


import { Home } from './src/telas/appMain/home';
import { Sair } from './src/funcoes/sair';
import { FichaEditavel } from './src/telas/appMain/fichaEditavel';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Editar } from './src/telas/appMain/fichaEditavel/editar';
import {TelaEscolha} from './src/telas/appMain/telaEscolha';
import { VideoDoenca } from './src/telas/appMain/primeiroSocorros';

const Drawer = createDrawerNavigator();


// Impede que a splash screen seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

// function DrawerNavigator() {
//   const {colorComponentsChamarDrawer, colorText, tamanhoFonte} = useEmergencialContext();

//   return (
// <Drawer.Navigator
//   initialRouteName="Home"
//   screenOptions={{
//     headerShown: false,
//     drawerStyle: {
//       backgroundColor: colorComponentsChamarDrawer,
//       padding: 10,
//     },
//     drawerLabelStyle: {
//       color: colorText,
//       fontSize: 18 + tamanhoFonte, // Ajusta a distância entre ícone e texto
//     },
//   }}
// >
//       <Drawer.Screen name="Home" component={Home} options={{drawerIcon: () => (
//             <Icon 
//               name="  "
//               size={32} 
//               color={colorText} 
//               style={{width: 35}}
//             />),

//             title: 'Home'}}/>
//       <Drawer.Screen name="FichaEditavel" component={FichaEditavel} options={{drawerIcon: ({ color, size }) => (
//             <Icon 
//               name="user"
//               size={32} 
//               color={colorText} 
//               style={{width: 35}}
//             />),
//             title: 'Perfil'}}/>
//       {/* <Drawer.Screen name="TelaEscolha" component={TelaEscolha} options={{title: `Escolha a Emergência`}}/> */}
//       <Drawer.Screen name="Acessibilidade" component={Acessibilidade} options={{drawerIcon: ({ color, size }) => (
//             <Icon 
//               name="low-vision"
//               size={32} 
//               color={colorText} 
//               style={{width: 35}}
//             />),
//             title: 'Acessibilidade'}}/>
//       <Drawer.Screen name="Sair" component={Sair} options={{drawerIcon: ({ color, size }) => (
//             <Icon 
//               name="sign-out"
//               size={32} 
//               color={colorText} 
//               style={{width: 35}}
//             />),
//             title: 'Sair'}}/> 
//     </Drawer.Navigator>
//   );
// }

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState('')


  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);

    async function estaLogado(){
     const logado = await AsyncStorage.getItem('UsuarioId')
     console.log(logado)
     if(logado){
      setInitialRouteName('Home')
     }else{
      setInitialRouteName('Welcome')
     }
    }
    estaLogado()
  }, []);
  return (
    <SafeAreaProvider>
      <EmergenciaProvider>
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName  }
          screenOptions={{ headerShown: false }}
        >
          {

          }
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="FichaEditavel" component={FichaEditavel}/>
          <Stack.Screen name="Sair" component={Sair}/>
          <Stack.Screen name="Acessibilidade" component={Acessibilidade} />
          <Stack.Screen name="Editar" component={Editar} />
          <Stack.Screen name="TelaEscolha" component={TelaEscolha} />
          <Stack.Screen name="VideoDoenca" component={VideoDoenca} />
        </Stack.Navigator>
      </NavigationContainer>
    </EmergenciaProvider>
  </SafeAreaProvider>
  );
}
