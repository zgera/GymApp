import React, { useState } from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextComponent} from 'react-native'

const RutinaDetalle = ({rutina}) => {
    const[mostrarMas, setMostrarMas] = useState({})

    const handlePress = (nombre) => {
        setMostrarMas((prevState) => ({
            ...prevState,
            [nombre]: !prevState[nombre],
        })) 
    }

    return (
        <View style = {style.container}>
            <Text style = {style.textoPrincipal}>{rutina.getNombre}</Text>
            <View style = {style.containerDias}>
                <FlatList
                keyExtractor={(dia) => dia.getMusculos}
                data = {rutina.getDias}
                renderItem={({item: dia}) => (
                    <TouchableOpacity 
                        style = {style.diaContainer} 
                        onPress = {() => handlePress(dia.getMusculos)}
                    >
                        <Text style = {style.diaNombre}>{dia.getMusculos}</Text>
                        <Text style = {style.diaRepeticion}>Frecuencia: {dia.getFrecuencia}</Text>
                        {mostrarMas[dia.getMusculos] && (
                            <View style = {style.fondoAzul}>
                                <TouchableOpacity style = {style.botonPequeño} onPress={() => {console.log(dia)}}>
                                    <Text style = {style.textoBoton}> Empezar dia </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {style.botonPequeño}>
                                    <Text style = {style.textoBoton}> Ver ejercicios </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}/>
            </View> 
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    containerDias:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textoPrincipal: {
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#6AD1FA',
    },
    diaContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#242425',
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        paddingHorizontal: 20,
        width: 200,
        overflow: 'hidden'
    },
    diaNombre: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6AD1FA'
    },
    diaRepeticion:{
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    },
    fondoAzul:{
        backgroundColor: '#6AD1FA',
        width: 200,
        padding: 20,
    },
    botonPequeño:{
        backgroundColor: '#242425',
        borderColor: '#242425',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        padding: 5
    },
    textoBoton:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: '#6AD1FA'
    }
})

export default RutinaDetalle