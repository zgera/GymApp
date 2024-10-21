import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants'; 

const CreacionRutinas = () => {
  const [nombreRutina, setNombreRutina] = useState('');
  const [nombreDia, setNombreDia] = useState('');
  const [frecuenciaDia, setFrecuenciaDia] = useState('');
  const [dias, setDias] = useState([]);
  const [nombreEjercicio, setNombreEjercicio] = useState('');
  const [descansoEjercicio, setDescansoEjercicio] = useState('');
  const [seriesEjercicio, setSeriesEjercicio] = useState('');
  const [ejerciciosPorDia, setEjerciciosPorDia] = useState({});
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { rutina } = route.params;

  // Función para agregar un nuevo día
  const agregarDia = () => {
    if (nombreDia.trim() !== '' && frecuenciaDia.trim() !== ''){
            rutina.crearDia(nombreDia, frecuenciaDia)
            setDias([...rutina.get_dia_tupla]); // Actualizar el estado con los días actualizados
            setEjerciciosPorDia({ ...ejerciciosPorDia, [nombreDia]: [] });
            setNombreDia(''); // Limpiar el input
            setFrecuenciaDia('');
        }
  };

  const agregarEjercicio = (diaNombre) => {
    if (nombreEjercicio.trim() !== '' && descansoEjercicio.trim() !== '' && seriesEjercicio.trim !== '') {
      // Actualizar el objeto rutina
      rutina.agregarEjercicioADia(diaNombre,
        nombreEjercicio,descansoEjercicio,seriesEjercicio);

      // Actualizar el estado de ejerciciosPorDia
      setEjerciciosPorDia({
        ...ejerciciosPorDia,
        [diaNombre]: [...ejerciciosPorDia[diaNombre], {nombre: nombreEjercicio, descanso: descansoEjercicio, series: seriesEjercicio}],
      });

      setNombreEjercicio('');
      setDescansoEjercicio('');
      setSeriesEjercicio(''); // Limpiar el input de ejercicios
      
      setDiaSeleccionado(null)
    }
  };

  // Función para finalizar la creación de la rutina
  const finalizarRutina = () => {
    if (nombreRutina.trim() !== ''){
        rutina.set_nombre(nombreRutina)
        navigation.navigate('DetalleRutina', { rutina: rutina });
    }
    // Aquí puedes hacer lo que necesites con la rutina, como guardarla en un estado global o enviarla a un backend
  };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input_titulo}
            value={nombreRutina}
            onChangeText={setNombreRutina}
            placeholder="Ingrese nombre"
        />

        {/* Lista de días agregados */}
        <View style = {styles.containerGrupoDias}>
            <FlatList
                keyExtractor={(dia, index) => index.toString()} // Si no tienes un ID, usa el índice
                data={dias} // Accediendo al getter sin paréntesis
                renderItem={({ item: dia }) => (
                <View style={styles.diaContainer}>
                    <Text style={styles.diaNombre}>{dia[0]}</Text> {/* getMusculos como getter */}
                    <Text style={styles.diaRepeticion}>Frecuencia: {dia[1]}</Text> {/* getFrecuencia como getter */}

                    <FlatList
                        data={ejerciciosPorDia[dia[0]]} // Mostrar ejercicios del día actual
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.ejercicioContainer}>
                            <Text style={styles.ejercicioNombre}>{item.nombre}</Text>
                            <Text style={styles.ejercicioItem}>Descanso: {item.descanso} segundos</Text>
                            <Text style={styles.ejercicioItem}>Series: {item.series}</Text>
                        </View>
                        )}
                    />

                    {diaSeleccionado !== dia[0] && (
                        <TouchableOpacity style={styles.boton} onPress={() => setDiaSeleccionado(dia[0])}>
                            <Text style={styles.textoBoton}>Agregar Ejercicio</Text>
                        </TouchableOpacity>
                    )}
                    
                    {diaSeleccionado === dia[0] && (
                        <View style = {styles.container_input_ejercicio}>
                            <TextInput
                                style={styles.input_nombre_ejercicio}
                                value={nombreEjercicio}
                                onChangeText={setNombreEjercicio}
                                placeholder="Ingresa Nombre"
                            />
                            <TextInput
                                style={styles.input_item_ejercicio}
                                value={descansoEjercicio}
                                onChangeText={setDescansoEjercicio}
                                placeholder="Ingresa Descanso"
                            />
                            <TextInput
                                style={styles.input_item_ejercicio}
                                value={seriesEjercicio}
                                onChangeText={setSeriesEjercicio}
                                placeholder="Ingresa Series"
                            />
                            <TouchableOpacity style = {styles.botonEjercicio} onPress={() => agregarEjercicio(dia[0])}>
                                <Text style = {styles.textoBotonEjercicio}>Agregar Ejercicio</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                )}
            />
            <View style = {styles.container_input_dia}>
                <TextInput
                    style={styles.input_nombre_dia}
                    value={nombreDia}
                    onChangeText={setNombreDia}
                    placeholder="Ingresa Nombre"
                />
                <TextInput
                    style={styles.input_frecuencia_dia}
                    value={frecuenciaDia}
                    onChangeText={setFrecuenciaDia}
                    placeholder="Ingresa frecuencia"
                />
                <TouchableOpacity style = {styles.botonDia} onPress = {agregarDia}>
                    <Text style = {styles.textoBotonDia}>Agregar Dia</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style = {styles.botonFinalizar} onPress = {finalizarRutina}>
            <Text style = {styles.textoBotonFinalizar}>Finalizar Rutina</Text>
        </TouchableOpacity>
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
    input_titulo:{
        textAlign: 'center',
        width: "100%",
        paddingVertical: 15,
        marginVertical: 12,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#6AD1FA',
        backgroundColor: 'black',
        color: '#6AD1FA',
        fontSize: 40,
        fontWeight: 'bold'
    },
    containerGrupoDias: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: '#242425',
        margin: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        overflow: 'hidden'
    },
    diaContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        width: 300,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        overflow: 'hidden'
    },
    ejercicioContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#242425',
        width: 150,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        overflow: 'hidden'
    },
    containerGrupoEjercicio:{
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: '#242425',
        margin: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        overflow: 'hidden'
    },
    diaNombre: {
        textAlign: "center",
        margin: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6AD1FA'
    },
    ejercicioNombre: {
        textAlign: "center",
        margin: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6AD1FA'
    },
    diaRepeticion:{
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    },
    ejercicioItem:{
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 10,
        color: "white"
    },
    container_input_dia:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    input_nombre_dia:{
        textAlign: 'center',
        paddingVertical: 10,
        width: '100%',
        borderTopWidth: 2,
        borderColor: '#6AD1FA',
        backgroundColor: '#242425',
        color: '#6AD1FA',
        fontSize: 15,
        fontWeight: 'bold'
    },
    input_frecuencia_dia:{
        textAlign: 'center',
        paddingVertical: 10,
        width: '100%',
        borderColor: '#6AD1FA',
        backgroundColor: '#242425',
        color: '#6AD1FA',
        fontSize: 15,
        fontWeight: 'bold'
    },
    container_input_ejercicio:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_nombre_ejercicio:{
        textAlign: 'center',
        paddingVertical: 5,
        width: '100%',
        borderTopWidth: 2,
        borderColor: '#6AD1FA',
        backgroundColor: '#242425',
        color: '#6AD1FA',
        fontSize: 10,
        fontWeight: 'bold'
    },
    input_item_ejercicio:{
        textAlign: 'center',
        paddingVertical: 5,
        width: '100%',
        borderColor: '#6AD1FA',
        backgroundColor: '#242425',
        color: '#6AD1FA',
        fontSize: 10,
        fontWeight: 'bold'
    },
    botonDia:{
        width: '100%',
        paddingVertical: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#6AD1FA',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonEjercicio:{
        width: '100%',
        paddingVertical: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#6AD1FA',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotonDia:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 15,
        color: '#242425'
    },
    textoBotonEjercicio:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 10,
        color: '#242425'
    },
    boton:{
        paddingVertical: 10,
        marginVertical: 4,
        width: "40%",
        borderRadius: 10,
        borderColor: '#6AD1FA',
        borderWidth: 2,
        backgroundColor: '#242425',
        overflow: 'hidden'
    },
    textoBoton:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 10,
        color: '#6AD1FA'
    },
    botonFinalizar:{
        paddingVertical: 10,
        marginVertical: 4,
        width: "50%",
        borderRadius: 10,
        borderColor: '#6AD1FA',
        borderWidth: 2,
        backgroundColor: '#242425',
        overflow: 'hidden'
    },
    textoBotonFinalizar:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6AD1FA'
    }
});

export default CreacionRutinas;