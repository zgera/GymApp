import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import EstadisticaLista from './src/components/estadistica';
import Main from './src/components/main';
import Timer from './src/components/timer';

const App = () => {
    return (
        <View style={styles.appContainer}>
            <Main />
            <Timer />
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default App;