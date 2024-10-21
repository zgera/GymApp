import React, { useState } from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

const subirEstadistica = ({dia, indice}) => {
    const [peso, setPeso] = useState("")
    const [repeticiones, setRepeticiones] = useState("")
    const handlePress = () => {
        entrenamiento.agregarEstadistica(parseInt(peso), parseInt(repeticiones), indice)
        console.log(entrenamiento.getEstadisticas)
    }

    return (
        <View style = {style.container}>
            <Text style={style.textoPrincipal}>
                {entrenamiento.getDia.darEjercicio(indice).getNombre}
            </Text>
            <TextInput
                style = {style.input}
                placeholder='Ingrese peso'
                placeholderTextColor= '#888'
                value = {peso}
                onChangeText = {setPeso}
            />
            <TextInput
                style = {style.input}
                placeholder = 'Ingrese repeticiones'
                placeholderTextColor= '#888'
                value = {repeticiones}
                onChangeText = {setRepeticiones}
                keyboardType='numeric'
            />
            <TouchableOpacity style = {style.boton} onPress = {handlePress}>
                <Text style = {style.textoBoton}>Subir</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textoPrincipal: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#6AD1FA',
    },
    input:{
        padding: 10,
        margin: 12,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#6AD1FA',
        backgroundColor: '#242425',
        color: '#6AD1FA',
        fontSize: 15,
        fontWeight: 'bold'
    },
    boton:{
        padding: 10,
        marginTop: 12,
        width: 100,
        borderRadius: 10,
        borderColor: '#6AD1FA',
        borderWidth: 2,
        backgroundColor: '#242425',
        overflow: 'hidden'
    },
    textoBoton:{
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6AD1FA'
    }
})

export default subirEstadistica