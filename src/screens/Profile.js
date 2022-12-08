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

export default function ({ navigation }) {

  const [email, onChangeTextEmail] = useState('usuarioTeste')
  const [senha, onChangeTextSenha] = useState('4E7E1FB2E39F41CE8FA')
  const [selecionarEmpresa, setEmpresa] = useState(false)
  const [logado, setLogado] = useState(false)
  const [dadosPaciente, setDadosPaciente] = useState(false)
  const [dataInicial, setDataInicial] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [empresas, setEmpresas] = useState([{}])

  async function consultaEmpresa() {

    let url_endpoint = 'empresa/listar?usuario=' + email + '&token=' + senha
    let res = await api.get(url_endpoint)
    let dadosEmpresa = res.data.dados
    // console.log(res.data);
    // console.log(dadosEmpresa);
    dadosEmpresa.forEach((index) => {
      setEmpresas(arr => [...arr, { empresa: index.empresa, id: index.id }])
    });
    // console.log(empresas)
  }

  function mascaraData(campo) {
    var data = campo;
    console.log(data.length);
    if (data.length == 2) {
      campo = data += '-';
    }
    else if (data.length == 5) {
      campo = data += '-';
    }
    else campo = data;

    console.log(campo);

    return campo
  }


  function telaEmpresa() {
    return (
      <View style={styles.container} >
        <Animatable.View animation="fadeInLeft" delay={50} >
          <Text style={styles.loginTitle}>
            Área do Cliente Login
          </Text>
        </Animatable.View>
        <Animatable.View style={styles.containerForm} animation="fadeInLeft" delay={50}>
          <Text style={styles.inputTitle} >Empresa</Text>
          <SelectDropdown
            data={empresas}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.empresa
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              console.log(item);
              return item.empresa
            }}
          />
          <TextInput placeholder="Data Inicial" keyboardType="numeric" onChangeText={value => setDataInicial(mascaraData(value))} />
          <TextInput placeholder="Data Fim" keyboardType="numeric" onChangeText={value => setDataFim(mascaraData(value))} />
        </Animatable.View>
      </View>
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
  async function consultaLogin() {
    let url_endpoint = '/vacinasaplicadas/listar?usuario=' + email + '&token=' + senha + '&dataInicial=01/01/2021&dataFinal=04/02/2022&empresaId=1'
    res = await api.get(url_endpoint)
    // alert(res.data.status)
    if (res.data.status == 'sucesso') {
      // alert(JSON.stringify(res.data.dados.pacinete))
      // alert(res.data.dados)
      // console.log(res.data.dados.pacinete[0].nome)
      setDadosPaciente({ nome: res.data.dados.pacinete[0].nome })
      setEmpresa(true);

      return res.data.dados.pacinete[0].nome
    }
    else alert(url_endpoint)
    // alert(res.data.dados.pacinete)
    // return retorno_html;
  }
  function telaLogado() {
    let dadosVacina = consultaLogin()
    // console.log(dadosVacina)
    return (
      <Layout>
        <TopNav

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
            <Section style={{
              marginBottom: 20,

            }}>
              <SectionContent>
                <Text fontWeight="bold" style={{ textAlign: "center" }}>
                  {dadosPaciente.nome}
                </Text>

                <Button
                  style={{ marginTop: 20 }}
                  text="Clique para ver detalhes das vacinas"
                  status="primary"
                  onPress={() => {
                    navigation.navigate("Prematuro");
                  }}
                />

              </SectionContent>
            </Section>
          </ScrollView>
        </View>
      </Layout>
    )

    // alert(dadosVacina.status)

  }

  onPress = () => {
    api.get('/aplicadores/listar?usuario=' + email + '&token=' + senha)
      .then((res) => {
        //  let resLogin = JSON.parse(res.data)
        if (res.data.status == 'sucesso') { setLogado(true); consultaEmpresa(); setEmpresas([{ empresa: 'Selecione', id: 0 }]) }
        else setLogado(false)
      })
  };

  const styles = StyleSheet.create({
    inputTitle: {
      marginTop: 28,
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
    }
  });



  return (
    <Layout>
      {!logado && telaLogin()}
      {logado && !selecionarEmpresa && telaEmpresa()}
      {/* {logado && selecionarEmpresa && telaLogado()} */}
    </Layout>
  );
}
