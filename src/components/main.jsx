import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import EstadisticaLista from './statistics.jsx';
import Timer from './timer.jsx';
import RoutineImage from './routine.jsx';
//import Entrenamientos from './entrenamientos.jsx'
import Exercises from './exercises.jsx';
import SubirEstadistica from './subirEstadistica.jsx'
import RutinaDetalle from './rutinaDetalle.jsx'
import CreacionRutinas from './agregarRutina.jsx';

class Usuario {
    #nombre
    #edad
    #peso
    #rutinas

    constructor(nombre, edad, peso){
        this.#nombre = nombre;
        this.#edad = edad;
        this.#peso = peso;
        this.#rutinas = [];
    }

    crearRutina(nombre){
        this.#rutinas.push(new Rutina(nombre));
    }

    darRutina(indice){
        return this.#rutinas[indice];
    }

    get getNombre(){
        return this.#nombre;
    }

    get getEdad(){
        return this.#edad;
    }
    
    get getPeso(){
        return this.#peso;
    }

    get getRutinas(){
        return this.#rutinas;
    }
    
    get getCantidadDeRutinas(){
        return this.#rutinas.length;
    }
}

class Rutina {
    #nombre
    #dias

    constructor(){
        this.#nombre;
        this.#dias = [];
    }

    crearDia(musculos, frecuencia){
        this.#dias.push(new Dia(musculos, frecuencia));
    }

    agregarEjercicioADia(dia_nombre, ejercicio_nombre, ejercicio_descanso, ejercicio_series){
        for (let i = 0; i < this.#dias.length; i++){
            if (this.#dias[i].getMusculos === dia_nombre){
                this.#dias[i].agregarEjercicio(ejercicio_nombre,ejercicio_descanso,ejercicio_series)
            }
        }
    }

    set_nombre(nombre){
        this.#nombre = nombre
    }

    get getDias(){
        return this.#dias
    }

    get getNombre(){
        return this.#nombre
    }

    get get_dia_tupla(){
        let lista_dia = []
        for (let i = 0; i < this.#dias.length; i++) {
            lista_dia.push(this.#dias[i].tupla_dia)
        }
        return lista_dia 
    }
}

class Dia {
    #musculos
    #frecuencia
    #ejercicios
    #entrenamientos

    constructor(musculos, frecuencia){
        this.#musculos = musculos;
        this.#frecuencia = frecuencia;
        this.#ejercicios = [];
        this.#entrenamientos = [];
    }

    agregarEjercicio(ejercicio, descanso, series){
        this.#ejercicios.push(new Ejercicio(ejercicio, descanso, series));
    }

    darEjercicio(indice){   
        return this.#ejercicios[indice];
    }

    agregarEntrenamiento(fecha){
        this.#entrenamientos.push(new Entrenamiento(this, fecha));
    }

    darEntrenamiento(indice){
        return this.#entrenamientos[indice];
    }

    get tupla_dia(){
        return [this.#musculos, this.#frecuencia]
    }

    get darCantidadDeEjercicios(){
        return this.#ejercicios.length;
    }

    get getMusculos(){
        return this.#musculos;
    }

    get getEjercicios(){
        return this.#ejercicios;
    }

    get getEntrenamientos(){
        return this.#entrenamientos
    }

    get getFrecuencia(){
        return this.#frecuencia
    }
}

class Entrenamiento {
    #dia
    #fecha
    #estadisticas

    constructor(dia, fecha){
        this.#dia = dia;
        this.#fecha = fecha;
        this.#estadisticas = [];
    }

    darEstadistica(indice){
        return this.#estadisticas[indice];
    }

    agregarEstadistica(peso, repeticiones, indice){
        let ejercicio = this.#dia.darEjercicio(indice);
        this.#estadisticas.push(new Estadistica(ejercicio.getNombre, ejercicio.getDescanso, ejercicio.getSeries,
             peso, repeticiones));
    }

    get getFecha(){
        return this.#fecha;
    }

    get getEstadisticas(){
        return this.#estadisticas;
    }

    get getDia(){
        return this.#dia;
    }
}

class Ejercicio {
    #nombre
    #descanso
    #series

    constructor(nombre, descanso, series){
        this.#nombre = nombre;
        this.#descanso = descanso;
        this.#series = series;
    }

    get getNombre(){
        return this.#nombre;
    }

    get getDescanso(){
        return this.#descanso;
    }
    
    get getSeries(){
        return this.#series;
    }
}

class Estadistica extends Ejercicio{
    #peso
    #repeticiones

    constructor(nombre, descanso, series, peso, repeticiones){
        super(nombre, descanso, series)
        this.#peso = peso;
        this.#repeticiones = repeticiones;
    }

    get getRepeticion(){
        return this.#repeticiones;
    }

    get getPeso(){
        return this.#peso;
    }
}

/*let Usuario1 = new Usuario("Valentin", 17, 74)
Usuario1.crearRutina("Push Pull Leg", 3)
let Rutina1 = Usuario1.darRutina(0)
Rutina1.crearDia("Pecho Hombro Tricep", 2)
Rutina1.crearDia("Espalda Bicep", 2)
Rutina1.crearDia("Pierna", 2)
let Dia1 = Rutina1.darDia(0)
Dia1.agregarEjercicio("Press Banca", 120, 4, 1, Dia1)
Dia1.agregarEjercicio("Pecho Inclinado", 90, 3, 2, Dia1)
Dia1.agregarEntrenamiento("5/6/2024")*/

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreacionRutinas">
        <Stack.Screen
          name="CreacionRutinas"
          component={CreacionRutinas}
          initialParams={{ rutina: new Rutina() }} // Asegúrate de que Rutina esté definida
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetalleRutina"
          component={RutinaDetalle}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*<Text style={styles.textoPrincipal}>{Dia1.darEntrenamiento(0).getDia.getMusculos}</Text>
<Text style={styles.textoSecundario}>{Dia1.darEntrenamiento(0).getFecha}</Text>
<EstadisticaLista prop={Dia1.darEntrenamiento(0).getEstadisticas} />*/

/*<RutinaDetalle rutina = {Rutina1} />*/

/*<SubirEstadistica  entrenamiento = {Dia1.darEntrenamiento(0)} indice = {0}/>*/

/*<CreacionRutinas rutina = {new Rutina()}/>*/
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