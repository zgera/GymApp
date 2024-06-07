import React from 'react'
import Main from './src/components/main.jsx'

class Usuario {
    constructor(nombre, edad, peso){
        this.edad = edad 
        this.peso = peso
        this.nombre = nombre
        this.rutinas = []
  }

    crearRutina(nombre){
        this.rutinas.push(new Rutina(nombre))
    }

     darRutina(indice){
        return this.rutinas[indice]
    }

    get getNombre(){
        return this.nombre
    }

     get getEdad(){
        return this.edad
    }
  
    get getPeso(){
        return this.peso
    }

    get getRutinas(){
        return this.rutinas
    }
    
    get getCantidadDeRutinas(){
        return this.rutinas.length
    }

}

class Rutina {
    constructor(nombre){
        this.nombre = nombre
        this.dias = []
    }

    crearDia(musculos, frecuencia){
        this.dias.push(new Dia(musculos, frecuencia))
    }

    darDia(indice){
        return this.dias[indice]
    }

    get getNombre(){
        return this.nombre
    }

    get getDias(){
        return this.dias
    }

    get getCantidadDeDias(){
        return this.dias.length
    }
}

class Dia {
    constructor(musculos, frecuencia){
        this.musculos = musculos
        this.frecuencia = frecuencia
        this.ejercicios = []
        this.entrenamientos = []
    }

    agregarEjercicio(ejercicio, descanso, series, orden){
        this.ejercicios.push(new Ejercicio(ejercicio, descanso, series, orden)) 
    }

    darEjercicio(indice){
        return this.ejercicios[indice]
    }

    crearEntrenamiento(fecha){
        this.entrenamientos.push(new Entrenamiento(this, fecha))
    }

    get getMusculos(){
        return this.musculos
    }

    get getEjercicios(){
        return this.ejercicios
    }

    get getCantidadDeEjercicios(){
        return this.ejercicios.length
    }
}

class Entrenamiento extends Dia{
    constructor(musculos, frecuencia, ejercicios, fecha){
        super(musculos, frecuencia)
        this.ejercicios = ejercicios
        this.fecha = fecha
        this.estadisticas = []
    }

    darEstadistica(indice){
        return this.estadisticas[indice]
    }

    crearEstadistica(peso, repeticiones, indice){
        let ejercicio = this.darEjercicio(indice)
        this.estadisticas.push(new Estadistica(ejercicio.nombre, ejercicio.descanso, ejercicio.series, ejercicio.orden, peso, repeticiones))
    }
    
    get getFecha(){
        return this.fecha
    }
}

class Ejercicio{
    constructor(nombre, descanso, series, orden){
        this.nombre = nombre
        this.descanso = descanso
        this.series = series
        this.orden = orden
    }

    get getNombre(){
        return this.nombre
    }

    get getDescanso(){
        return this.descanso
    }
    
    
    get getSeries(){
        return this.series 
    }
}

class Estadistica extends Ejercicio{
    constructor(nombre, descanso, series, orden, peso, repeticiones){
        super(nombre, descanso, series, orden)
        this.peso = peso
        this.repeticiones = repeticiones
    }

    get getRepeticion(){
        return this.repeticiones
    }
}


    let Usuario1 = new Usuario("Valentin", 17, 74)
    Usuario1.crearRutina("Push Pull Leg", 3)
    let Rutina1 = Usuario1.darRutina(0)
    Rutina1.crearDia("Pecho Hombro Tricep", 2)
    let Dia1 = Rutina1.darDia(0)
    Dia1.agregarEjercicio("Pecho plano", 120, 4, 1, Dia1)
    Dia1.agregarEjercicio("Pecho Inclinado", 90, 3, 2, Dia1)
    let Entrenamiento1 = Dia1.crearEntrenamiento("31/05/2024")
    console.log(Entrenamiento1.getMusculos)
    console.log(Entrenamiento1.getFecha)
    Entrenamiento1.crearEstadistica(65, 9, 0)
    Entrenamiento1.crearEstadistica(65, 6, 0)
    Entrenamiento1.crearEstadistica(60, 6, 0)
    Entrenamiento1.crearEstadistica(55, 8, 0)
    for(let i = 0; i < Dia1.darEjercicio(0).getSeries; i++){
    console.log(Entrenamiento1.darEstadistica(i).getNombre)
    console.log(Entrenamiento1.darEstadistica(i).getRepeticion)
}

export default function App() {
  return (
    <Main />
  );
}