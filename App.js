import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/components/main.jsx';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <Main />
        /*<NavigationContainer>
            <Stack.Navigator initialRouteName='Routine'>                
                <Stack.Screen name="Routine" component={RoutinePage} />
                <Stack.Screen name="Timer" component={TimerPage} />
                <Stack.Screen name="Exercises" component={ExercisesPage} />                                                        
            </Stack.Navigator>
        </NavigationContainer>*/
    );
}

//<Stack.Screen name="Home" component={HomePage} />

export default App;
