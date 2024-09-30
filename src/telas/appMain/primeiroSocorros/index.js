import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubeIframe from 'react-native-youtube-iframe';  

const videoHeight = 400

export function VideoDoenca({navigation}) {
  const route = useRoute();
  const {doenca, video} = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areaVideo}>
        <Text style={styles.tituloAreaVideo}>PRIMEIROS SOCORROS</Text>
        <Text style={styles.criseAreaVideo}> Crise de {doenca}</Text>
        <YoutubeIframe
          height={videoHeight}
          width={videoHeight}
          videoId='vgGi3DZTvWg'
        />
      </View>
      <View style={styles.areaVoltarInicio}>
        <Text style={styles.textAreaVoltarInicio} onPress={() => navigation.navigate('Home')}>Voltar ao início</Text>
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    areaVideo:{
        width: '90%',
        flex: 1,
        gap: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tituloAreaVideo:{
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 2,
        width: '90%',
    },
    criseAreaVideo:{
        fontSize: 28,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    areaVoltarInicio:{
        height: 40,
        alignItems: 'center',
    },
    textAreaVoltarInicio:{
        textDecorationLine: 'underline',
    }
})