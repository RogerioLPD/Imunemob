import React, { useEffect, useState } from "react";
import { ScrollView, View, Linking } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Section,
  SectionContent,
  Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ route, navigation }) {
  const { isDarkmode } = useTheme();
  const vacina = route?.params?.vacina;
  const [vacinaPage, setVaceinaPage] = useState(vacina)

  useEffect(() => {
    setVaceinaPage(vacina);
  }, [vacina])

  return (
    <Layout>
      <TopNav
        middleContent={!vacinaPage ? "Vacinas" : vacinaPage.nome}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : "#191921"}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollView>
          <Section style={{
            marginBottom: 10,

          }}>
            <SectionContent>

              {vacinaPage.aplicacoes.map((elemento, i) =>
                <Text fontWeight="bold" key={i} style={{ textAlign: "center" }}>
                  {elemento.descricao}
                </Text>
              )}
              {vacinaPage.aplicacoes.map(elemento => {
                return Object.values(elemento).map((e, i) => (
                  <Text key={i} style={{ textAlign: "left", marginTop: 10 }}>
                    {Object.keys(elemento)[i] + ': ' + e}
                  </Text>
                ))

              })}
            </SectionContent>
          </Section>
        </ScrollView>
      </View>
    </Layout>
  );
}