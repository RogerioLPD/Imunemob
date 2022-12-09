import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Layout,
  Text,
  TextInput,
  TopNav,
  Section,
  SectionContent,
  Button
} from "react-native-rapi-ui";
import api from '../services/Api';
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as Animatable from 'react-native-animatable';
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function ({ navigation }) {

  const [email, onChangeTextEmail] = useState('usuarioTeste')
  const [senha, onChangeTextSenha] = useState('4E7E1FB2E39F41CE8FA')
  const [selecionarEmpresa, setEmpresa] = useState(false)
  const [selecionadaEmpresa, setEmpresaSelecionada] = useState({})
  const [logado, setLogado] = useState(false)
  const [dadosPaciente, setDadosPaciente] = useState(false)
  const [dataInicial, setDataInicial] = useState({ data: new Date(), text: 'Selecione a data inicial', alterada: false })
  const [dataFim, setDataFim] = useState({ data: new Date(), text: 'Selecione a data fim', alterada: false })
  const [empresas, setEmpresas] = useState([{}])
  const [showDateInicial, setShowDateInicial] = useState(false)
  const [showDateFim, setShowDateFim] = useState(false)
  const [vacinas, setVacinas] = useState([])

  useEffect(() => {
    if (selecionadaEmpresa?.id && dataInicial?.alterada && dataFim?.alterada) {
      setEmpresa(true);
      consultaVacinas();
    }
  }, [dataInicial, dataFim, selecionadaEmpresa])

  async function consultaEmpresa() {
    let url_endpoint = 'empresa/listar?usuario=' + email + '&token=' + senha
    let res = await api.get(url_endpoint)
    let dadosEmpresa = res.data.dados
    dadosEmpresa.forEach((index) => {
      setEmpresas(arr => [...arr, { empresa: index.empresa, id: index.id }])
    });
  }

  const onChangeDate = (event, selectedDate) => {
    var data = selectedDate,
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    if (showDateInicial) { setDataInicial({ alterada: true, data: selectedDate, text: dia + "/" + mes + "/" + ano }); setShowDateInicial(false); }
    else if (showDateFim) { setDataFim({ alterada: true, data: selectedDate, text: dia + "/" + mes + "/" + ano }); setShowDateFim(false) }
  };

  function telaEmpresa() {
    return (
      <View style={styles.container} >
        <Animatable.View animation="fadeInLeft" delay={50} >
          <View style={styles.containerTopo}>
            <TouchableOpacity  onPress={() => setLogado(false)}>
              <Ionicons name="chevron-back" size={50} color="white" />
            </TouchableOpacity>
            <Text style={styles.loginTitleBuscar}>
              Buscar vacinas
            </Text>
          </View>
        </Animatable.View>
        <Animatable.View style={styles.containerForm} animation="fadeInLeft" delay={50}>
          <Text style={styles.inputTitle} >Empresa</Text>
          <SelectDropdown
            data={empresas}
            onSelect={(selectedItem, index) => {
              setEmpresaSelecionada(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.empresa
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.empresa
            }}
          />

          <View>
            <Text style={styles.inputTitle} >Data Inicial</Text>
            <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateInicial(true)}>
              <Text style={styles.inputDate}>{dataInicial.text}</Text>
              <Ionicons name="ios-calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.inputTitle} >Data Fim</Text>
            <TouchableOpacity style={styles.containerDate} onPress={() => setShowDateFim(true)}>
              <Text style={styles.inputDate}>{dataFim.text}</Text>
              <Ionicons name="ios-calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {
            showDateInicial ?
              < DateTimePicker
                testID="dateTimePicker"
                value={dataInicial.data}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
              /> : null
          }
          {
            showDateFim ?
              < DateTimePicker
                testID="dateTimePicker"
                value={dataFim.data}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
              /> : null
          }
        </Animatable.View>
      </View >
    )
  }

  function telaLogin() {
    return (
      <View style={styles.container} >
        <Animatable.View animation="fadeInLeft" delay={50} >
          <Text style={styles.loginTitle}>
            Área do Cliente Login
          </Text>
        </Animatable.View>
        <Animatable.View style={styles.containerForm} animation="fadeInLeft" delay={50}>
          <Text style={styles.inputTitle} >E-mail</Text>
          <TextInput style={styles.input} value={email} placeholder="E-mail" onChangeText={onChangeTextEmail} />
          <Text style={styles.inputTitle}>Senha</Text>
          <TextInput style={styles.input} value={senha} placeholder="Senha" onChangeText={onChangeTextSenha} />
          <TouchableOpacity style={styles.login} onPress={onPress}>
            <Text style={styles.loginTexto}>LOGIN</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    )
  }

  async function consultaVacinas() {
    let url_endpoint = 'vacinasaplicadas/listar/?usuario=' + email + '&token=' + senha + '&dataInicial=' + dataInicial.text + '&dataFinal=' + dataFim.text + '&empresaId=' + selecionadaEmpresa.id
    let res = await api.get(url_endpoint)
    if (res.data.status == 'sucesso') {
      setVacinas(res.data.dados.pacinete);
      return res.data.dados.pacinete[0].nome
    }
    else { alert(res.data.mensagem); setVacinas([]) }
  }


  function telaLogado() {
    return (
      <Layout>
        <TopNav
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={"#191921"}
            />
          }
          leftAction={() => {setEmpresa(false); setEmpresaSelecionada({});}}
          middleContent="Calendário de Vacinação" />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          <ScrollView>
            {vacinas.map((elemento, index) => (
              <Section key={index} style={{
                marginBottom: 20,
              }}>
                <SectionContent>
                  <Text fontWeight="bold" style={{ textAlign: "center" }}>
                    {elemento.nome}
                  </Text>

                  <Button
                    style={{ marginTop: 20 }}
                    text="Clique para ver detalhes das vacinas"
                    status="primary"
                    onPress={() => {
                      navigation.navigate("VacinasEmpresa", {
                        vacina: elemento,
                      });
                    }}
                  />

                </SectionContent>
              </Section>
            ))}
          </ScrollView>
        </View>
      </Layout>
    )

  }

  const onPress = async () => {
    await api.get('/aplicadores/listar?usuario=' + email + '&token=' + senha)
      .then((res) => {
        if (res.data.status == 'sucesso') { setLogado(true); setEmpresas([]); consultaEmpresa(); }
        else setLogado(false)
      })
  };

  return (
    <Layout>
      {!logado && telaLogin()}
      {logado && !selecionarEmpresa && telaEmpresa()}
      {logado && selecionarEmpresa && telaLogado()}
    </Layout>
  );
}


const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 28,
    fontSize: 20
  },

  inputData: {
    marginTop: 8,
    fontSize: 20
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginTop: 12,
    fontSize: 20
  },
  loginTitle: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
    fontSize: 30,
    fontWeight: "bold",
    color: '#FFF',
    paddingStart: '5%'
  },
  loginTitleBuscar: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(53,97,209)'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    marginTop: 28,
  },
  login: {
    backgroundColor: 'rgb(53,97,209)',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'

  },
  loginTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: "bold"
  },
  containerDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
});