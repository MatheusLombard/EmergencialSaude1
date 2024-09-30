import { TouchableOpacity, StatusBar, StyleSheet, View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStylesTheme } from '../../style/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Inputs } from '../../components/textInputs';
import { Dropdown } from '../../components/dropDown';
import { useState, useRef, useEffect } from 'react';
import { Buttons } from '../../components/button';
import api from '../../services';
import { useEmergencialContext } from '../../hook/useEmergencialContext';
import { Check } from '../../components/checkbox';
import axios from 'axios';



export function Cadastro({ navigation }) {

  const [paginas, setPaginas] = useState(1);
  const stylesTheme = useStylesTheme();
  const cpfRef = useRef(null);
  const { backgroundColor } = useEmergencialContext();

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState(['...', 'M', 'F']);
  const [sexoSelecionado, setSexoSelecionado] = useState(['...', 'M', 'F']);
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
    'Neurológico', 'Obesidade', 'Osteoporose', 'Tireóide'])

  const [medicamentos, setMedicamentos] = useState('')
  const [alergias, setAlergias] = useState('')
  const [cancer, setCancer] = useState('')
  const [comorbidades, setComorbidades] = useState('')
  const [observacao, setObservacao] = useState('')
  const [tiposSanguineo, setTiposSanguineo] = useState(['...', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
  const [tiposSanguineoSelecionado, setTiposSanguineoSelecionado] = useState(null); // Estado para armazenar o valor do Dropdown

  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  function verificarCPF() {
    const cpfValid = cpfRef.current.isValid();

    if (cpfValid === false) {
      Alert.alert('Atenção', 'Por favor, coloque um CPF válido');
      setCpf('')
    }
    return cpfValid
  }

  function nextCadastro() {
    if (paginas === 1) {
      if (nome.trim() === '' || nascimento.trim() === '' || cpf.trim() === '' || telefonePessoal.trim() === '' || telefoneEmergencia.trim() === '') {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      } else {
        const valido = verificarCPF();
        if (valido === false) {
          Alert.alert('Atenção', 'Por favor, coloque um CPF válido');
          setCpf('')
        } else {
          setPaginas(indice => indice + 1)
        }
      }
    } else if (paginas === 2) {
      if (estado.trim() === '' || cep.trim() === '' || bairro.trim() === '' || numero.trim() === '' || cidade.trim() === '' || estado.trim() === '') {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      } else {
        setPaginas(indice => indice + 1)
      }
    } else if (paginas === 3) {
      setPaginas(indice => indice + 1)
    } else if (paginas === 4) {
      if (medicamentos.trim() === '' || alergias.trim() === '' || cancer.trim() === '' || comorbidades.trim() === '' || observacao.trim() === '') {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      } else {
        setPaginas(indice => indice + 1)
      }
    }
  }
  function previousCadastro() {
    setPaginas(indice => indice - 1)
  }
  async function buscarCep() {
    if (cep.trim() === '') {
      return null
    }
    try {
      const resposta = await api.get(`/${cep}/json/`)
      setBairro(resposta.data.bairro);
      setEndereco(resposta.data.logradouro);
      setCidade(resposta.data.localidade);
      setEstado(resposta.data.uf);
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = (index, _isSelected, selecionou) => {
    setSelectedDoencas((prevSelected) => {
      if (selecionou) {
        return [...prevSelected, index]; // Adiciona doença ao array
      } else {
        return prevSelected.filter((i) => i !== index); // Remove a doença do array
      }
    });
  };
  async function enviarCadastro() {
    try {
      console.log('ta aqui')
      const response = await axios.post('https://ccdd-2804-14c-b385-8302-b55c-d800-af93-e30f.ngrok-free.app/create/', {
        medicamentos,
        alergias,
        cancer,
        comorbidades,
        tiposSanguineo: tiposSanguineoSelecionado, // Use o valor apropriado
        observacao,

        nome,
        nascimento, // Formato YYYY-MM-DD
        sexo: sexoSelecionado,
        cpf,
        telefonePessoal,
        telefoneEmergencia,
        cep,
        endereco,
        bairro,
        numero,
        cidade,
        estado,
        senha,
        doencas: selectedDoencas

      });
      Alert.alert('Sucesso', 'Ficha foi criada com sucesso.');
      navigation.navigate('Login')

    } catch (error) {
      console.error('Erro ao criar a ficha médica:', error);
      Alert.alert('Erro', 'Não foi possível criar a ficha médica.');
    }
  }



  return (
    <SafeAreaView style={{ ...stylesTheme.containerTheme, ...styles.container }}>
      <StatusBar backgroundColor={'#060007'} hidden={true} />
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Pode ajustar para 'padding' no Android se necessário
      keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0} // Tente ajustar esse valor conforme necessário
      style={styles.keyboard}
    >
        {paginas === 1 && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '100%' }}>
            <Icon name='arrow-back' style={{ ...stylesTheme.textColor, ...styles.arrow }} />
          </TouchableOpacity>
        )}{paginas > 1 && (
          <View>
            <Icon name='arrow-back' style={styles.arrow} color={backgroundColor} />
          </View>
        )}

        <View style={styles.viewBody}>
          {paginas === 1 && (
            <>
              <View>
                <Text style={{ ...stylesTheme.medio }}>
                  Para começar, faremos sua ficha:
                </Text>
              </View>
              <ScrollView style={styles.elementos}>
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
              </ScrollView>
            </>
          )}{paginas === 2 && (
            <>
              <View>
                <Text style={{ ...stylesTheme.medio }}>
                  Agora informe seu endereço:
                </Text>
              </View>
              <ScrollView style={styles.elementos}>
                <View style={{ gap: 10 }}>
                  <Inputs
                    label="CEP "
                    placeholder="Digite aqui..."
                    maxLength={9}
                    valor={cep}
                    onChangeText={(text) => setCep(text)}
                    typeMask='zip-code'
                    onBlur={buscarCep}
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
              </ScrollView>
            </>

          )}{paginas === 3 && (
            <>
              <View>
                <Text style={{ ...stylesTheme.medio }}>
                  Assinale conforme o que tiver:
                </Text>
              </View>
              <ScrollView style={styles.elementos}>
                <View style={{ gap: 10 }}>
                  {doencas.map((doenca, index) => (
                    <Check key={index} title={doenca} onToggle={(isSelected, selecionou) => handleToggle(index + 1, isSelected, selecionou)} />
                  ))}
                </View>
              </ScrollView>
            </>
          )

          }{paginas === 4 && (
            <>
              <View>
                <Text style={{ ...stylesTheme.medio }}>
                  Adicione algumas observações a sua ficha:
                </Text>
              </View>
              <ScrollView style={styles.elementos}>
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
                    label="Tipo Sanguineo"
                    mode="dialog"
                    options={tiposSanguineo}
                    onValueChange={setTiposSanguineoSelecionado} // Função de callback passada como prop
                    style={{ flex: 1 }}
                  />
                </View>
              </ScrollView>
            </>

          )}{paginas === 5 && (
            <>
              <View>
                <Text style={{ ...stylesTheme.medio }}>
                  Coloque uma senha para a segurança de seus dados:
                </Text>
              </View>
              <View style={{ ...styles.elementos, justifyContent: 'center', flex: 1 }}>
                <View style={{ gap: 10 }}>
                  <Inputs
                    label="Digite sua Senha "
                    placeholder="Digite aqui..."
                    maxLength={900}
                    valor={senha}
                    onChangeText={(text) => setSenha(text)}
                    secureTextEntry={true}
                  />
                  <Inputs
                    label='Confirme sua Senha '
                    placeholder='Digite aqui...'
                    valor={confirmarSenha}
                    onChangeText={(text) => setConfirmarSenha(text)}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </>

          )}
        </View>
          </KeyboardAvoidingView>

        <View style={styles.viewRodape} >
          {paginas === 1 && (
            <View style={styles.viewBotao}>
              <Buttons
                text='Próximo'
                action={() => nextCadastro()}
                />
            </View>

)
}
          {paginas > 1 && paginas < 5 && (
            <View style={styles.viewBotoes}>
              <Buttons
                text='Anterior'
                action={() => previousCadastro()}
                />
              <Buttons
                text='Próximo'
                action={() => nextCadastro()}
                />
            </View>
          )
          
        }{paginas === 5 && (
          <View style={styles.viewBotoes}>
              <Buttons
                text='Anterior'
                action={() => previousCadastro()}
                style={{ flex: 1 }}
                />
              <Buttons
                text='Finalizar'
                action={enviarCadastro}
                style={{ backgroundColor: '#ff0000' }}
                />
            </View>
          )
          
        }
          <View style={styles.indice}>
            <Text style={{ ...stylesTheme.textColor, fontSize: 13 }}>
              {paginas}/5
            </Text>
          </View>
        </View>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  conteiner: {
    gap: 21 
  },
  keyboard: {
    flex: 1,
    alignItems: 'center',
    gap: 30
  },
  arrow: {
    fontSize: 30,
  },
  viewBody: {
    flex: 1,
    width: '95%',
    gap: 25,
  },
  elementos: {
    gap: 10,
  },
  linha: {
    flexDirection: 'row',
    gap: 10,
  },
  viewRodape: {
    width: '95%',
    gap: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  viewBotao: {
    alignItems: 'flex-end',
  },
  viewBotoes: {
    gap: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  indice: {
    alignItems: 'center',
    bottom: 5
  }

})