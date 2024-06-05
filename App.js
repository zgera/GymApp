import React from 'react'
import Main from './src/components/main.jsx'

class Usuario {
  constructor(nombre, edad, peso){
      this.nombre = nombre
      this.edad = edad 
      this.peso = peso
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

  get getMusculos(){
      return this.musculos
  }

  get getEjercicios(){
      return this.ejercicios
  }

  agregarEjercicio(ejercicio, descanso, series, orden){
      this.ejercicios.push(new Ejercicio(ejercicio, descanso, series, orden)) 
  }

  darEjercicio(indice){
      return this.ejercicios[indice]
  }

  get darCantidadDeEjercicios(){
      return this.ejercicios.length
  }

  crearEntrenamiento(fecha){
      this.entrenamientos.push(new Entrenamiento(this, fecha))
  }

  darEntrenamiento(indice){
    return this.entrenamientos[indice]
  }

}

class Entrenamiento{
  constructor(dia, fecha){
      this.dia = dia
      this.fecha = fecha
      this.estadisticas = []
  }

  get getFecha(){
      return this.fecha
  }

  darEstadistica(indice){
      return this.estadisticas[indice]
  }

  get getEstadisticas(){
    return this.estadisticas
  }

  /*El indice hace referencia al numero de ejercicio del dia al que pertenece el entrenamiento.
   Si se quiere acceder el primer ejercicio que es press banca, el indice sera 0
   Si se quiere acceder el primer ejercicio que es pecho inclinado, el indice sera 2*/
  crearEstadistica(peso, repeticiones, indice){
      let ejercicio = this.dia.darEjercicio(indice)
      this.estadisticas.push(new Estadistica(ejercicio, peso, repeticiones))
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
  constructor(ejercicio, peso, repeticiones){
      this.ejercicio = ejercicio
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
Dia1.agregarEjercicio("Press Banca", 120, 4, 1, Dia1)
Dia1.agregarEjercicio("Pecho Inclinado", 90, 3, 2, Dia1)
Dia1.crearEntrenamiento("31/05/2024")
Dia1.darEntrenamiento(0).crearEstadistica(65, 8, 0)
Dia1.darEntrenamiento(0).crearEstadistica(60, 8, 0)
Dia1.darEntrenamiento(0).crearEstadistica(60, 6, 0)
Dia1.darEntrenamiento(0).crearEstadistica(55, 8, 0)
Dia1.darEntrenamiento(0).crearEstadistica(15, 8, 1)
Dia1.darEntrenamiento(0).crearEstadistica(15, 8, 1)
Dia1.darEntrenamiento(0).crearEstadistica(15, 6, 1)

export default function App() {
  return (
    <Main />
  );
}