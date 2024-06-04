import { createErrorHandler } from 'expo/build/errors/ExpoErrorManager'
import React from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'

const Estadistica = ({props}) => {
    return (
        <FlatList
            data={props}
            renderItem={({item: repo}) => (
                <View key={repo.indice} style={Style.container}>
                    <Text style={Style.textoPrincipal} >{repo.ejercicio}</Text>
                    <Text style={Style.dato} >Peso: {repo.peso}</Text>
                    <Text style={Style.dato}>Repeticiones: {repo.repeticiones}</Text>
                </View>
            )}
        />
    )
}

const Style = StyleSheet.create({
    container:{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#242425',
        borderRadius: 10,
        margin: 10,
        padding: 20,
        width: 200,
    },
    textoPrincipal: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6AD1FA',
    },
    dato: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    }
})

export default Estadistica