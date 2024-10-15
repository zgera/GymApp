import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const CrearRutina = () => {
    const [ejercicio, setEjercicio] = useState("");
    const [repeticiones, setRepeticiones] = useState("");
    const [series, setSeries] = useState("");
    const [rutinas, setRutinas] = useState([]);
    const [rutinasCompletadas, setRutinasCompletadas] = useState([]);

    const agregarRutina = () => {
        if (ejercicio && repeticiones && series) {
            const nuevaRutina = {
                id: Date.now().toString(),
                ejercicio,
                repeticiones,
                series,
                completada: false
            };
            setRutinas([...rutinas, nuevaRutina]);
            setEjercicio("");
            setRepeticiones("");
            setSeries("");
        }
    };

    const completarRutina = (id) => {
        const rutinaCompletada = rutinas.find(rutina => rutina.id === id);
        if (rutinaCompletada) {
            setRutinas(rutinas.filter(rutina => rutina.id !== id)); // Eliminar de la lista principal
            setRutinasCompletadas([...rutinasCompletadas, { ...rutinaCompletada, completada: true }]);
            Alert.alert("¡Felicidades!", "Has completado una rutina.");
        }
    };

    const cancelarRutina = (id) => {
        const actualizadas = rutinas.filter(rutina => rutina.id !== id);
        setRutinas(actualizadas);
    };

    const modificarRutina = (id) => {
        const rutinaAModificar = rutinas.find(rutina => rutina.id === id);
        if (rutinaAModificar) {
            setEjercicio(rutinaAModificar.ejercicio);
            setRepeticiones(rutinaAModificar.repeticiones);
            setSeries(rutinaAModificar.series);
            cancelarRutina(id); // Elimina la rutina original al modificar
        }
    };

    const renderRutina = ({ item }) => (
        <View style={style.botonRutina}>
            <Text style={[style.textoRutinas, item.completada && style.completada]}>
                {item.ejercicio} - {item.repeticiones} repeticiones, {item.series} series
            </Text>
            <View style={style.botonContainer}>
                <TouchableOpacity style={style.boton} onPress={() => completarRutina(item.id)}>
                    <Text style={style.textoBoton}>Completar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.boton} onPress={() => modificarRutina(item.id)}>
                    <Text style={style.textoBoton}>Modificar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.boton} onPress={() => cancelarRutina(item.id)}>
                    <Text style={style.textoBoton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderRutinasCompletadas = ({ item }) => (
        <Text style={style.textoRutinas}>
            {item.ejercicio} - {item.repeticiones} repeticiones, {item.series} series (Completada)
        </Text>
    );

    return (
        <View style={style.container}>
            <Text style={style.textoPrincipal}>Rutinas</Text>

            <TextInput
                style={style.input}
                placeholder="Ingresa ejercicio"
                placeholderTextColor="#6AD1FA"
                value={ejercicio}
                onChangeText={setEjercicio}
            />

            <TextInput
                style={style.input}
                placeholder="Ingresa repeticiones"
                placeholderTextColor="#6AD1FA"
                value={repeticiones}
                onChangeText={setRepeticiones}
                keyboardType="numeric"
            />

            <TextInput
                style={style.input}
                placeholder="Ingresa series"
                placeholderTextColor="#6AD1FA"
                value={series}
                onChangeText={setSeries}
                keyboardType="numeric"
            />

            <TouchableOpacity style={style.boton} onPress={agregarRutina}>
                <Text style={style.textoBoton}>Crear</Text>
            </TouchableOpacity>

            <FlatList
                data={rutinas}
                renderItem={renderRutina}
                keyExtractor={item => item.id}
                style={style.listaRutinas}
            />

            <Text style={style.textoPrincipal}>Rutinas Completadas</Text>
            <View style={style.fondoCompletadas}>
                <FlatList
                    data={rutinasCompletadas}
                    renderItem={renderRutinasCompletadas}
                    keyExtractor={item => item.id}
                    style={style.listaRutinas}
                />
            </View>
        </View>
    );
};

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
    input: {
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
    boton: {
        padding: 10,
        marginTop: 12,
        width: 100,
        borderRadius: 10,
        borderColor: '#6AD1FA',
        borderWidth: 2,
        backgroundColor: '#242425',
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    textoBoton: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 15,
        color: '#6AD1FA'
    },
    textoRutinas: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#242425',
    },
    completada: {
        textDecorationLine: 'line-through',
        color: 'green'
    },
    botonRutina: {
        padding: 10,
        marginTop: 12,
        borderRadius: 10,
        borderColor: '#6AD1FA',
        borderWidth: 2,
        backgroundColor: '#6AD1FA',
        width: '90%',
        alignSelf: 'center',
    },
    botonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    listaRutinas: {
        marginTop: 20,
        width: '100%',
    },
    fondoCompletadas: {
        backgroundColor: '#e0f7fa', // Fondo de la lista de rutinas completadas
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
    },
});

export default CrearRutina;
