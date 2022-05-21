import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShrimpPrice from "../../Layouts/ShrimpPrice";
import ShrimpNews from "../../Layouts/ShrimpNews";
import ShrimpDisease from "../../Layouts/ShrimpDisease";
import DetailScreen from "../DetailScreen";
import ModalNewsScreen from "../ModalScreen/ModalNews";
import ModalDiseaseScreen from "../ModalScreen/ModalDisease";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function NavigationScreen () {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Jala Media'
                    component = {tabs}
                    options={{
                        headerTintColor: 'white',
                        headerStyle:{
                            backgroundColor: '#1B77DF'
                        }
                    }}
                />
                 <Stack.Screen
                    name = 'KabarUdangScreen'
                    component = {ShrimpNews}
                />
                 <Stack.Screen
                    name = 'PenyakitScreen'
                    component = {ShrimpDisease}
                />
                <Stack.Screen
                    name= 'DetailScreen'
                    component = {DetailScreen}
                    options={{
                        headerTintColor: 'white',
                        headerBackTitle: 'Harga Udang',
                        headerTitle: '',
                        headerStyle:{
                            backgroundColor: '#1B77DF',
                        }
                    }}
                />
                <Stack.Screen
                    name = 'Berita'
                    component = {ModalNewsScreen}
                    options={{
                        headerTintColor: 'white',
                        headerStyle:{
                            backgroundColor: '#1B77DF'
                        }
                    }}
                />
                <Stack.Screen
                    name = 'Detail Penyakit'
                    component = {ModalDiseaseScreen}
                    options={{
                        headerTintColor: 'white',
                        headerStyle:{
                            backgroundColor: '#1B77DF'
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function tabs () {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#1B77DF',
                tabBarInactiveTintColor: '#737373',
            }}
        >
            <Tab.Screen
                name = "Harga Udang"
                component={ShrimpPrice}
            />
             <Tab.Screen
                name = "Kabar Udang"
                component={ShrimpNews}
            />
             <Tab.Screen
                name = "Penyakit"
                component={ShrimpDisease}
            />
        </Tab.Navigator>
    )
}

export default NavigationScreen;