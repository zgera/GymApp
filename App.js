import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, TimerPage, RoutinePage } from './src/components/main';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Timer" component={TimerPage} />                                        
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
