import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Splash from "../screens/splash";
import Vacinas from "../screens/Vacinas";
import Prematuro from "../screens/Prematuro";
import Criancas from "../screens/Criancas";
import Adolescentes from "../screens/Adolescentes";
import Adulto from "../screens/Adulto";
import Gestante from "../screens/Gestante";
import Idoso from "../screens/Idoso";
import Ocupacional from "../screens/Ocupacional"
import VacinasEmpresa from "../screens/VacinasEmpresa";



const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Prematuro" component={Prematuro} />
      <MainStack.Screen name="Criancas" component={Criancas} />
      <MainStack.Screen name="Adolescentes" component={Adolescentes} />
      <MainStack.Screen name="Adulto" component={Adulto} />
      <MainStack.Screen name="Gestante" component={Gestante} />
      <MainStack.Screen name="Idoso" component={Idoso} />
      <MainStack.Screen name="Ocupacional" component={Ocupacional} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="VacinasEmpresa" component={VacinasEmpresa} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Vacinas"
        component={Vacinas}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Vacinas" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-eyedrop-sharp"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Perfil" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Configurações" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-settings-outline"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};