import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Exercises = ({ navigation }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const ejercicios = [
        { nombre: 'Press Banca', descanso: 180 },
        { nombre: 'Press Inclinado', descanso: 120 },
        { nombre: 'Curl de Biceps', descanso: 120 },
        { nombre: 'Vuelos Laterales', descanso: 60 },
        { nombre: 'Press Militar', descanso: 60 },
        { nombre: 'Cruce de Poleas', descanso: 90 },
    ];

    const navigateToTimer = (exercise) => {
        navigation.navigate('Timer', { duration: exercise.descanso });
    };

    const goToNextExercise = () => {
        const nextIndex = (currentExerciseIndex + 1) % ejercicios.length;
        setCurrentExerciseIndex(nextIndex);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCurrentExerciseIndex(0);
        });
        return unsubscribe;
    }, [navigation]);

    const currentExercise = ejercicios[currentExerciseIndex];

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.exerciseText}>{currentExercise.nombre}</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigateToTimer(currentExercise);
                        goToNextExercise();
                    }}
                >
                    <Text>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
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
    exerciseText: {
        fontSize: 18,
        color: '#000',
    },
});

export default Exercises;