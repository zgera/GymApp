import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import EstadisticaLista from './src/components/statistics';
import { Main, HomePage, TimerPage, RoutinePage } from './src/components/main';
import Timer from './src/components/timer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

    const Stack = createNativeStackNavigator();
    function App() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={HomePage} />
                    <Stack.Screen name="Routine" component={RoutinePage} />
                    <Stack.Screen name="Timer" component={TimerPage} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

export default App;