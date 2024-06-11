import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Estadistica from './estadistica';

class entrenamiento {
    constructor(dia, fecha) {
        this.dia = dia;
        this.fecha = fecha;
        this.estadisticas = [];
    }

    get getEstadisticas() {
        return this.estadisticas;
    }

    generarEstadistica(ejercicio, peso, repeticiones, indice) {
        this.estadisticas.push(new estadistica(ejercicio, peso, repeticiones, indice));
    }
}

class estadistica {
    constructor(ejercicio, peso, repeticiones, indice) {
        this.ejercicio = ejercicio;
        this.peso = peso;
        this.repeticiones = repeticiones;
        this.indice = indice;
    }
}

let E1 = new entrenamiento("Pecho Hombro Tricep", "2/6/2024");
E1.generarEstadistica("Press banca", 65, 8, 1);
E1.generarEstadistica("Press banca", 60, 8, 2);
E1.generarEstadistica("Press banca", 60, 6, 3);
E1.generarEstadistica("Press banca", 55, 8, 3);
E1.generarEstadistica("Press Inclinado", 15, 9, 3);
E1.generarEstadistica("Press Inclinado", 15, 9, 3);
E1.generarEstadistica("Press Inclinado", 15, 9, 3);

console.log(E1.estadisticas);

const Main = ({ Dia1 }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>{Dia1.darEntrenamiento(0).dia.getMusculos}</Text>
            <Text style={styles.textoSecundario}>{Dia1.darEntrenamiento(0).getFecha}</Text>
            <Estadistica prop={Dia1.darEntrenamiento(0).getEstadisticas} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'black',
    },
    textoPrincipal: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#6AD1FA',
    },
    textoSecundario: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
});

export default Main;
