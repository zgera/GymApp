import React from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'


const listaEstadisticas = ({prop}) => {
    return (
        <FlatList
            data={prop}
            renderItem={({item: repo}) => (
                <View key={repo.getNombre} style={Style.container}>
                    <Text style={Style.textoPrincipal} >{repo.getNombre}</Text>
                    <Text style={Style.dato} >Peso: {repo.getPeso}</Text>
                    <Text style={Style.dato}>Repeticiones: {repo.getRepeticion}</Text>
                </View>
            )}
        />
    )
}

const Style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#242425',
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6AD1FA',
        padding: 20,
        width: 200
    },
    textoPrincipal: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6AD1FA'
    },
    dato: {
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    }
})

export default listaEstadisticas
