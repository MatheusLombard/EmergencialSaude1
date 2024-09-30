// import Geolocation from 'react-native-geolocation-service';
// import { PermissionsAndroid, Platform, Alert } from 'react-native';

// // Função para pedir permissão e obter localização
// export async function obterLocalizacaoAtual() {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Permissão de Localização',
//         message: 'Precisamos acessar sua localização para chamadas de emergência.',
//         buttonPositive: 'OK'
//       }
//     );
    
//     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//       Alert.alert('Permissão negada', 'Não conseguimos acessar sua localização.');
//       return;
//     }
//   }

//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         resolve({ latitude, longitude });
//       },
//       (error) => {
//         console.log('Erro ao obter localização:', error);
//         reject(error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   });
// }
