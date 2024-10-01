import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, ScrollView, StatusBar, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Emergencias } from '../../../components/emergencias';
import { useStylesTheme } from '../../../style/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export function TelaEscolha({ navigation }) {
    const stylesTheme = useStylesTheme();
    const [emergencias, setEmergencias] = useState([
        'AIDS', 'Alergia', 'Alzheimer', 'Ansiedade', 'Asma', 'AVC', 'Câncer', 'Cardíaco',
        'Depressão', 'Diabetes', 'Enxaqueca', 'Epilepsia', 'Gastrite Crônica', 'Hipertensão',
        'Neurológico', 'Obesidade', 'Osteoporose', 'Tireóide'
    ]);

    const [doencasSelecionadas, setDoencasSelecionadas] = useState([]);

    const [usuario, setUsuario] = useState([]);

    function calcularIdade(dataNascimento) {
        if (!dataNascimento) {
            console.log("Data de nascimento não fornecida ou está indefinida");
            return;
        }

        const hoje = new Date(); // Data atual
        const nascimento = new Date(dataNascimento); // Converte a string de nascimento em um objeto de data

        // Verifica se a data de nascimento é válida
        if (isNaN(nascimento)) {
            console.log("Data de nascimento inválida");
            return;
        }

        // Calcula a diferença entre os anos
        let idade = hoje.getFullYear() - nascimento.getFullYear();

        // Ajusta a idade se o aniversário ainda não ocorreu neste ano
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade;
    }

    useEffect(() => {
        async function pegarInfo() {
            const usuarioId = await AsyncStorage.getItem('UsuarioId')
            console.log(usuarioId)

            const response = await axios.post('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/pegarInfo/', {
                id: usuarioId
            })
            const dadosUsuario = response.data;

            setUsuario(dadosUsuario)
            const listarDoencas = () => {
                if (dadosUsuario.Doencas && dadosUsuario.Doencas.length > 0) {
                    return dadosUsuario.Doencas.map((doenca) => doenca.doenca);
                }
                return 'Nenhuma doença registrada.';
            };
            setDoencasSelecionadas(listarDoencas())
            console.log(doencasSelecionadas)
        }
        pegarInfo()
    }, [])

    async function iniciarChamada(emergencia) {
        const identificacao = usuario.nome;
        const age = usuario.nascimento;
        const rua = usuario.endereco;
        const numero = usuario.numero;
        const bairro = usuario.bairro;
        const medicamentos = usuario.FichaMedica.medicamentos;
        const alergia = usuario.FichaMedica.alergias;
        const nascimento = calcularIdade(age);
        const obs = usuario.FichaMedica.obs;
        console.log(emergencia)

        // Faz a requisição para iniciar a chamada
        const chamadaResponse = await fetch('https://9084-2804-14c-b385-8302-f545-573d-4e45-a75c.ngrok-free.app/iniciar-chamada', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identificacao,
                age: nascimento,
                rua,
                numero,
                bairro,
                saude: doencasSelecionadas,
                alergia,
                medicamentos,
                motivo: emergencia,
                obs
            }),
        });

        if (!chamadaResponse.ok) {
            throw new Error('Erro ao iniciar chamada: ' + chamadaResponse.statusText);
        }

        const data = await chamadaResponse.json();
        Alert.alert('Sucesso', `Chamada iniciada com SID: ${data.sid}`);
        navigation.navigate('VideoDoenca', { doenca: emergencia, video: 'aaa' })
    }

    const emergenciasSelecionadas = emergencias.filter(emergencia => doencasSelecionadas.includes(emergencia));
    const emergenciasNaoSelecionadas = emergencias.filter(emergencia => !doencasSelecionadas.includes(emergencia));

    console.log(emergenciasSelecionadas, emergenciasNaoSelecionadas)

    return (
        <SafeAreaView style={{ ...stylesTheme.containerTheme, ...styles.container }}>
            <StatusBar backgroundColor={'#060007'} hidden={true} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%' }}>
                <Icon name='arrow-back' style={{ ...stylesTheme.textColorBlack, ...styles.arrow }} />
            </TouchableOpacity>
            <View style={styles.areaEmergencias}>
                <Text style={{ ...stylesTheme.grande,...stylesTheme.textColorBlack, ...styles.textoAreaEmergencias, fontWeight: 500 }}>
                    Escolha sua Emergencia:
                </Text>
                <ScrollView>

                
                {emergenciasSelecionadas.length > 0 && (
                    <View style={{ gap: 10 }}>
                        {emergenciasSelecionadas.map((emergencia, index) => (
                            <Emergencias
                                emergencia={emergencia}
                                key={index}
                                emergenciaSelecionada={() => iniciarChamada(emergencia)} // Use a função de toggle
                                isSelected={true}
                            />
                        ))}
                    </View>
                )}
                {/* Renderizar doenças não selecionadas */}
                {emergenciasNaoSelecionadas.length > 0 && (
                    <View style={{ gap: 10 }}>
                        <View>
                            {emergenciasNaoSelecionadas.map((emergencia, index) => (
                                <Emergencias
                                    emergencia={emergencia}
                                    key={index}
                                    emergenciaSelecionada={() => iniciarChamada(emergencia)} // Use a função de toggle
                                    isSelected={false}
                                />
                            ))}
                        </View>
                    </View>
                )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 40
    },
    areaEmergencias: {
        flex: 1,
    },
    textoAreaEmergencias: {
        marginBottom: 50,
        textAlign: "center",
    },
    arrow: {
        fontSize: 32
    }
});