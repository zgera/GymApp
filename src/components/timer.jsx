import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const radius = 45;
const circumference = radius * Math.PI * 2;

const Timer = ({ totalDuration }) => {
    const [currentTime, setCurrentTime] = useState(totalDuration);
    const countdownInterval = useRef(null);
    const strokeOffset = useSharedValue(circumference);

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: strokeOffset.value,
        };
    });

    const formatTime = (seconds) => {
        const absSeconds = Math.abs(seconds);
        const minutes = Math.floor(absSeconds / 60);
        const remainingSeconds = absSeconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
        const sign = seconds < 0 ? '-' : '';
        return `${sign}${paddedMinutes}:${paddedSeconds}`;
    };

    const formattedTime = formatTime(currentTime);

    const resetTimer = () => {
        clearInterval(countdownInterval.current);
        setCurrentTime(totalDuration);
        strokeOffset.value = 0;
        strokeOffset.value = withTiming(circumference, {
            duration: totalDuration * 1000,
            easing: Easing.linear,
        });
        countdownInterval.current = setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1);
        }, 1000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearInterval(countdownInterval.current);
    }, [totalDuration]);

    useEffect(() => {
        resetTimer();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.countdownContainer}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" transform="rotate(-90 0 0)">
                    {currentTime <= 0 && (
                        <Circle
                            cx="50"
                            cy="50"
                            r={radius}
                            strokeDasharray={circumference}
                            strokeWidth="7"
                            fill="transparent"
                            stroke="#e0222b"
                        />
                    )}
                    <AnimatedCircle
                        animatedProps={animatedCircleProps}
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeWidth="7"
                        fill="transparent"
                        stroke="#4287f5"
                    />
                </Svg>
                <Text style={styles.countdownText}>{formattedTime}</Text>
            </View>
            <View style={styles.controls}>
                <Pressable onPress={resetTimer} style={styles.button}>
                    <Text>Reset</Text>
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
    countdownContainer: {
        position: 'relative',
        width: 128,
        height: 128,
    },
    countdownText: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        width: '100%',
        top: '40%',
    },
    controls: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default Timer;