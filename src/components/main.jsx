import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import EstadisticaLista from './statistics';
import Timer from './timer';
import RoutineImage from './routine';
//import Entrenamientos from './entrenamientos.jsx'
import Exercises from './exercises.jsx';
import SubirEstadistica from './subirEstadistica.jsx'
import RutinaDetalle from './rutinaDetalle.jsx'

class Usuario {
    constructor(nombre, edad, peso){
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.rutinas = [];
    }

    crearRutina(nombre){
        this.rutinas.push(new Rutina(nombre));
    }

    darRutina(indice){
        return this.rutinas[indice];
    }

    get getNombre(){
        return this.nombre;
    }

    get getEdad(){
        return this.edad;
    }
    
    get getPeso(){
        return this.peso;
    }

    get getRutinas(){
        return this.rutinas;
    }
    
    get getCantidadDeRutinas(){
        return this.rutinas.length;
    }
}

class Rutina {
    constructor(nombre){
        this.nombre = nombre;
        this.dias = [];
    }

    crearDia(musculos, frecuencia){
        this.dias.push(new Dia(musculos, frecuencia));
    }

    darDia(indice){
        return this.dias[indice];
    }

    get getNombre(){
        return this.nombre;
    }

    get getDias(){
        return this.dias;
    }

    get getCantidadDeDias(){
        return this.dias.length;
    }
}

class Dia {
    constructor(musculos, frecuencia){
        this.musculos = musculos;
        this.frecuencia = frecuencia;
        this.ejercicios = [];
        this.entrenamientos = [];
    }

    agregarEjercicio(ejercicio, descanso, series, orden){
        this.ejercicios.push(new Ejercicio(ejercicio, descanso, series, orden));
    }

    darEjercicio(indice){
        return this.ejercicios[indice];
    }

    agregarEntrenamiento(fecha){
        this.entrenamientos.push(new Entrenamiento(this, fecha));
    }

    darEntrenamiento(indice){
        return this.entrenamientos[indice];
    }

    get darCantidadDeEjercicios(){
        return this.ejercicios.length;
    }

    get getMusculos(){
        return this.musculos;
    }

    get getEjercicios(){
        return this.ejercicios;
    }
}

class Entrenamiento {
    constructor(dia, fecha){
        this.dia = dia;
        this.fecha = fecha;
        this.estadisticas = [];
    }

    darEstadistica(indice){
        return this.estadisticas[indice];
    }

    agregarEstadistica(peso, repeticiones, indice){
        let ejercicio = this.dia.darEjercicio(indice);
        this.estadisticas.push(new Estadistica(ejercicio, peso, repeticiones));
    }

    get getFecha(){
        return this.fecha;
    }

    get getEstadisticas(){
        return this.estadisticas;
    }
}

class Ejercicio {
    constructor(nombre, descanso, series, orden){
        this.nombre = nombre;
        this.descanso = descanso;
        this.series = series;
        this.orden = orden;
    }

    get getNombre(){
        return this.nombre;
    }

    get getDescanso(){
        return this.descanso;
    }
    
    get getSeries(){
        return this.series;
    }
}

class Estadistica {
    constructor(ejercicio, peso, repeticiones){
        this.ejercicio = ejercicio;
        this.peso = peso;
        this.repeticiones = repeticiones;
    }

    get getRepeticion(){
        return this.repeticiones;
    }
}

let Usuario1 = new Usuario("Valentin", 17, 74)
Usuario1.crearRutina("Push Pull Leg", 3)
let Rutina1 = Usuario1.darRutina(0)
Rutina1.crearDia("Pecho Hombro Tricep", 2)
Rutina1.crearDia("Espalda Bicep", 2)
Rutina1.crearDia("Pierna", 2)
let Dia1 = Rutina1.darDia(0)
Dia1.agregarEjercicio("Press Banca", 120, 4, 1, Dia1)
Dia1.agregarEjercicio("Pecho Inclinado", 90, 3, 2, Dia1)
Dia1.agregarEntrenamiento("5/6/2024")
Dia1.darEntrenamiento(0).agregarEstadistica(65, 8, 0)
Dia1.darEntrenamiento(0).agregarEstadistica(60, 8, 0)
Dia1.darEntrenamiento(0).agregarEstadistica(60, 6, 0)

export function HomePage({ navigation }) {
    return (
        <View style={styles.appContainer}>
            <Main />
            <Pressable onPress={() => navigation.navigate('Timer')} style={styles.button}> <Text>Timer</Text> </Pressable>
        </View>
    );
}

export function TimerPage({ navigation, duration }) {
    duration = 180
    return (
        <View style={styles.appContainer}>
            <Timer totalDuration={duration}/>
            <Pressable onPress={() => navigation.navigate('Exercises', { ejercicios: Dia1.getEjercicios })} style={styles.button}> <Text>Exercises</Text> </Pressable>
        </View>
    );
}

export function RoutinePage({ navigation, exercise }) {
    return (
        <View style={styles.appContainer}>
            <RoutineImage />
            <Pressable onPress={() => navigation.navigate('Exercises', { ejercicios: Dia1.getEjercicios })} style={styles.button}>Exercises</Pressable>
        </View>
    );
}

export function ExercisesPage({ navigation, route }) {
    const { ejercicios } = route.params;
    return (
        <View style={styles.appContainer}>
            <Exercises ejercicios={ejercicios} navigation={navigation} />
            {/*<Pressable onPress={() => navigation.navigate('Timer')} style={styles.button}>Timer</Pressable>*/}
        </View>
    );
}


export function RutinaDetallePage() {
    return (
        <View style={styles.appContainer}>
            <RutinaDetalle />
        </View>
    );
}

export function SubirEstadisticaPage(){
    return (
        <View style={styles.appContainer}>
            <SubirEstadistica />
        </View>
    );
}

const Main = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textoPrincipal}>{Dia1.darEntrenamiento(0).dia.getMusculos}</Text>
            <Text style={styles.textoSecundario}>{Dia1.darEntrenamiento(0).getFecha}</Text>
            <EstadisticaLista prop={Dia1.darEntrenamiento(0).getEstadisticas} />
        </View>
    );
}

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
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6CD4FA',
        height: 35,
        width: 100,
        margin: 25,
        borderRadius: 5,
    },
});

export default Main;