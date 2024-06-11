import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Easing } from 'react-native';

const Timer = () => {
    const [totalDuration, setTotalDuration] = useState(60);
    const [currentTime, setCurrentTime] = useState(60);
    const [inputTime, setInputTime] = useState('00:00');
    const [timerExpired, setTimerExpired] = useState(false);
    const countdownInterval = useRef(null);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        resetTimer();
        return () => clearInterval(countdownInterval.current);
    }, [totalDuration]);

    useEffect(() => {
        if (currentTime === 0) {
            setTimerExpired(true);
        }
    }, [currentTime]);

    const formatTime = (seconds) => {
        const absSeconds = Math.abs(seconds);
        const minutes = Math.floor(absSeconds / 60).toString().padStart(2, '0');
        const secs = (absSeconds % 60).toString().padStart(2, '0');
        const prefix = seconds < 0 ? '-' : ''; // Add a prefix for negative time
        return prefix + `${minutes}:${secs}`;
    };    

    const parseTime = (timeString) => {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return (minutes * 60) + seconds;
    };

    const isValidTimeFormat = (timeString) => {
        // Regular expression to match the format mm:ss
        const timeRegex = /^[0-5][0-9]:[0-5][0-9]$/;
        return timeRegex.test(timeString);
    };

    const resetTimer = () => {
        clearInterval(countdownInterval.current);
        setCurrentTime(totalDuration);
        setTimerExpired(false);
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: totalDuration * 1000,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
        countdownInterval.current = setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);
    };

    const setTimer = () => {
        if (isValidTimeFormat(inputTime)) {
            const newDuration = parseTime(inputTime);
            setTotalDuration(newDuration);
        } else {
            // Display an error message or handle invalid input
            console.log("Invalid time format. Please enter time in mm:ss format.");
            setInputTime('00:00'); // Reset input to '00:00'
        }
    };

    const circumference = 56 * 2 * Math.PI;
    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference],
    });

    return (
        <View style={styles.container}>
            <View style={styles.countdownContainer}>
                <View style={styles.circle}>
                    <Animated.View
                        style={[
                            styles.countdownCircle,
                            {
                                strokeDashoffset,
                                strokeDasharray: circumference,
                                borderColor: timerExpired ? 'red' : '#3498db', // Change border color when timer expired
                            },
                        ]}
                    />
                    <Text style={styles.countdownText}>{formatTime(currentTime)}</Text>
                </View>
            </View>
            <View style={styles.controls}>
                <TextInput
                    style={styles.input}
                    value={inputTime}
                    onChangeText={(text) => {
                        
                        if (text.length <= 5) {
                            setInputTime(text);
                        }
                    }}
                    placeholder="mm:ss"
                    maxLength={5} 
                />
                <Button title="✅" onPress={setTimer} />
                <Button title="🔁" onPress={resetTimer} />
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
    countdownContainer: {
        position: 'relative',
        width: 128,
        height: 128,
    },
    circle: {
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 8,
        borderColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownCircle: {
        position: 'absolute',
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 8,
        transform: [{ rotate: '-90deg' }],
        transformOrigin: 'center center',
    },
    countdownText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    controls: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        padding: 8,
        fontSize: 16,
        backgroundColor: '#a7a7a7',
        width: 60,
        textAlign: 'center',
        marginRight: 10,
    },
});

export default Timer;
