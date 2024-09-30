import { TouchableOpacity, StatusBar, StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStylesTheme } from '../../../../style/styles';
import { Inputs } from '../../../../components/textInputs';
import { Dropdown } from '../../../../components/dropDown';
import { useState, useRef, useEffect } from 'react';
import { useEmergencialContext } from '../../../../hook/useEmergencialContext';
import { Check } from '../../../../components/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export function Editar({ navigation }) {
    const stylesTheme = useStylesTheme();
    const cpfRef = useRef(null);
    const { backgroundColor } = useEmergencialContext();

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState(['...', 'M', 'F']);
    const [sexoSelecionado, setSexoSelecionado] = useState(sexo[0]); 
    const [nascimento, setNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefonePessoal, setTelefonePessoal] = useState('');
    const [telefoneEmergencia, setTelefoneEmergencia] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [selectedDoencas, setSelectedDoencas] = useState([]);
    const [doencas, setDoencas] = useState(['AIDS', 'Alergia', 'Alzheimer', 'Ansiedade', 'Asma', 'AVC', 'Câncer', 'Cardíaco',
        'Depressão', 'Diabetes', 'Enxaqueca', 'Epilepsia', 'Gastrite Crônica', 'Hipertensão',
        'Neurológico', 'Obesidade', 'Osteoporose', 'Tireóide']);
    const [medicamentos, setMedicamentos] = useState('');
    const [alergias, setAlergias] = useState('');
    const [cancer, setCancer] = useState('');
    const [comorbidades, setComorbidades] = useState('');
    const [observacao, setObservacao] = useState('');
    const [tiposSanguineo, setTiposSanguineo] = useState(['...', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
    const [tiposSanguineoSelecionado, setTiposSanguineoSelecionado] = useState(null);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [usuario, setUsuario] = useState({})
    const [loading, setLoading] = useState()


    const verificarCPF = () => {
        const cpfValid = cpfRef.current.isValid();

        if (!cpfValid) {
            Alert.alert('Atenção', 'Por favor, coloque um CPF válido');
            setCpf('');
        }
    };

    useEffect(() => {
        async function loadUserData() {
            const usuarioIdString = await AsyncStorage.getItem('UsuarioId');
            const usuarioId = parseInt(usuarioIdString);

            if (!usuarioId) {
                setError("ID do usuário não encontrado.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post('https://ccdd-2804-14c-b385-8302-b55c-d800-af93-e30f.ngrok-free.app/pegarInfo/', { id: usuarioId }); // Update URL as needed
                const userData = response.data;
                setUsuario(userData);
                setNome(userData.nome);
                setSexoSelecionado(userData.sexo);
                setNascimento(userData.nascimento);
                setCpf(userData.CPF);
                setTelefonePessoal(userData.telefonePessoal);
                setTelefoneEmergencia(userData.telefoneEmergencia);
                setCep(userData.CEP);
                setEndereco(userData.endereco);
                setBairro(userData.bairro);
                setNumero(userData.numero);
                setCidade(userData.cidade);
                setEstado(userData.estado);
                setMedicamentos(userData.FichaMedica.medicamentos);
                setAlergias(userData.FichaMedica.alergias);
                setCancer(userData.FichaMedica.cancer);
                setComorbidades(userData.FichaMedica.comorbidades);
                setObservacao(userData.FichaMedica.obs);
                setTiposSanguineoSelecionado(userData.FichaMedica.tipoSanguineo);
            } catch (error) {
                console.error(error);
                setError("Erro ao buscar as informações do usuário.");
            } finally {
                setLoading(false);
            }
        }

        loadUserData();
    }, []);

    const handleToggle = (index, _isSelected, selecionou) => {
        setSelectedDoencas((prevSelected) => {
            if (selecionou) {
                return [...prevSelected, index];
            } else {
                return prevSelected.filter((i) => i !== index);
            }
        });
    };

    return (
        <SafeAreaView style={{ ...stylesTheme.containerTheme, ...styles.container }}>
            <StatusBar backgroundColor={'#060007'} hidden={true} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%' }}>
                <Icon name='arrow-back' style={{ ...stylesTheme.textColor, ...styles.arrow }} />
            </TouchableOpacity>
            <View style={styles.viewBody}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View>
                        <Text style={{ ...stylesTheme.medio }}>
                            Para começar, faremos sua ficha:
                        </Text>
                    </View>
                    <View style={styles.elementos}>
                        <View style={{ gap: 10 }}>
                            <Inputs
                                label="Nome Completo: "
                                placeholder="Digite aqui..."
                                maxLength={50}
                                valor={nome}
                                onChangeText={(text) => setNome(text)}
                            />
                            <View style={styles.linha}>
                                <Inputs
                                    label='Nascimento: '
                                    placeholder='Digite aqui...'
                                    maxLength={10}
                                    style={{ width: '65%' }}
                                    typeMask='datetime'
                                    valor={nascimento}
                                    onChangeText={(text) => setNascimento(text)}
                                    typeKeyboard={'numeric'}
                                />
                                <Dropdown
                                    mode='dropdown'
                                    label='Sexo'
                                    options={sexo}
                                    onValueChange={setSexoSelecionado}
                                    style={{ flex: 1 }}
                                    value={sexoSelecionado}
                                />
                            </View>
                            <Inputs
                                label='CPF '
                                placeholder='Digite aqui...'
                                maxLength={30}
                                typeKeyboard={'numeric'}
                                typeMask='cpf'
                                valor={cpf}
                                onChangeText={(text) => setCpf(text)}
                                ref={cpfRef}
                                onBlur={() => verificarCPF()}
                            />
                            <Inputs
                                label="Telefone Pessoal: "
                                placeholder="Digite aqui..."
                                maxLength={30}
                                typeKeyboard={'numeric'}
                                typeMask='cel-phone'
                                valor={telefonePessoal}
                                onChangeText={(text) => setTelefonePessoal(text)}
                            />
                            <Inputs
                                label="Telefone Emergencia: "
                                placeholder="Digite aqui..."
                                maxLength={30}
                                typeKeyboard={'numeric'}
                                typeMask='cel-phone'
                                valor={telefoneEmergencia}
                                onChangeText={(text) => setTelefoneEmergencia(text)}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...stylesTheme.medio }}>
                            Agora informe seu endereço:
                        </Text>
                    </View>
                    <View style={styles.elementos}>
                        <View style={{ gap: 10 }}>
                            <Inputs
                                label="CEP "
                                placeholder="Digite aqui..."
                                maxLength={9}
                                valor={cep}
                                onChangeText={(text) => setCep(text)}
                                typeMask='zip-code'
                            />
                            <Inputs
                                label='Endereço Comum '
                                placeholder='Digite aqui...'
                                valor={endereco}
                                onChangeText={(text) => setEndereco(text)}
                            />
                            <View style={styles.linha}>
                                <Inputs
                                    label='Bairro: '
                                    placeholder='Digite aqui...'
                                    style={{ flex: 1 }}
                                    valor={bairro}
                                    onChangeText={(text) => setBairro(text)}
                                />
                                <Inputs
                                    label='Número: '
                                    placeholder='Digite aqui...'
                                    maxLength={4}
                                    style={{ width: 100 }}
                                    valor={numero}
                                    onChangeText={(text) => setNumero(text)}
                                    typeMask='only-numbers'
                                    typeKeyboard='numeric'
                                />
                            </View>
                            <Inputs
                                label="Cidade: "
                                placeholder="Digite aqui..."
                                valor={cidade}
                                onChangeText={(text) => setCidade(text)}
                            />
                            <Inputs
                                label="Estado: "
                                placeholder="Ex: SP, RJ, AC, BH... "
                                maxLength={2}
                                valor={estado}
                                onChangeText={(text) => setEstado(text)}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...stylesTheme.medio }}>
                            Assinale conforme o que tiver:
                        </Text>
                    </View>
                    <View style={styles.elementos}>
                        <View style={{ gap: 10 }}>
                            {doencas.map((doenca, index) => (
                                <Check key={index} title={doenca} onToggle={(isSelected, selecionou) => handleToggle(index + 1, isSelected, selecionou)} />
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text style={{ ...stylesTheme.medio }}>
                            Adicione algumas observações a sua ficha:
                        </Text>
                    </View>
                    <View style={styles.elementos}>
                        <View style={{ gap: 10 }}>
                            <Inputs
                                label="Quais medicamentos você usa: "
                                placeholder="Digite aqui..."
                                maxLength={900}
                                valor={medicamentos}
                                onChangeText={(text) => setMedicamentos(text)}
                            />
                            <Inputs
                                label='Quais alergias você tem: '
                                placeholder='Digite aqui...'
                                valor={alergias}
                                onChangeText={(text) => setAlergias(text)}
                            />
                            <Inputs
                                label='Câncer: '
                                placeholder='Digite aqui...'
                                valor={cancer}
                                onChangeText={(text) => setCancer(text)}
                            />
                            <Inputs
                                label='Comorbidades: '
                                placeholder='Digite aqui...'
                                maxLength={400}
                                valor={comorbidades}

                                onChangeText={(text) => setComorbidades(text)}
                            />
                            <Inputs
                                label="Observação: "
                                placeholder="Digite aqui..."
                                valor={observacao}
                                onChangeText={(text) => setObservacao(text)}
                            />
                            <Dropdown
                                label="Tipo Sanguíneo"
                                mode="dialog"
                                value={tiposSanguineoSelecionado}
                                options={tiposSanguineo}
                                style={{ flex: 1 }}
                                onValueChange={setTiposSanguineoSelecionado}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.viewAreaBotao}>
                    <TouchableOpacity style={styles.areaBotao} onPress={() => navigation.navigate('Edicao')}>
                        <Text style={styles.textoAreaBotao}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 40,
        alignItems: 'center',
    },
    arrow: {
        fontSize: 30,
    },
    viewBody: {
        flex: 1,
        width: '95%',
        alignItems: 'center', // Center the ScrollView
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20, // Add some padding to the bottom
        gap: 30,
    },
    elementos: {
        gap: 10,
    },
    linha: {
        flexDirection: 'row',
        gap: 10,
    },
    viewAreaBotao: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
        alignItems: 'center',
    },
    areaBotao: {
        backgroundColor: '#DE2335',
        padding: 10,
        borderRadius: 10,
        width: '35%',
    },
    textoAreaBotao: {
        color: '#FFFFFF',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '300',
    },
});
