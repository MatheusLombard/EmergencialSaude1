// import axios from 'axios';

// export async function converterParaEnderecoNominatim(latitude, longitude) {
//   try {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data && data.display_name) {
//       const endereco = data.display_name;
//       console.log('Endereço:', endereco);
//       return endereco;  // Retorna o endereço formatado
//     } else {
//       console.error('Geocodificação falhou');
//       return 'Endereço não encontrado';
//     }
//   } catch (error) {
//     console.error('Erro ao converter coordenadas para endereço:', error);
//     return 'Erro ao converter para endereço';
//   }
// }