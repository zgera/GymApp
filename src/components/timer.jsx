import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const radius = 45;
const circumference = radius * Math.PI * 2;

const Timer = () => {
    const [totalDuration, setTotalDuration] = useState(60);
    const [currentTime, setCurrentTime] = useState(60);
    const countdownInterval = useRef(null);
    const strokeOffset = useSharedValue(circumference);

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: strokeOffset.value,
        };
    });

    useEffect(() => {
        resetTimer();
        return () => clearInterval(countdownInterval.current);
    }, [totalDuration]);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(countdownInterval.current);
        }
    }, [currentTime]);

    const resetTimer = () => {
        clearInterval(countdownInterval.current);
        setCurrentTime(totalDuration);
        strokeOffset.value = withTiming(0, { duration: 0 });
        strokeOffset.value = withTiming(circumference, { duration: totalDuration * 1000 });
        countdownInterval.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime > 0) {
                    strokeOffset.value = withTiming(prevTime / totalDuration * circumference, { duration: 1000 });
                    return prevTime - 1;
                } else {
                    clearInterval(countdownInterval.current);
                    return 0;
                }
            });
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdownContainer}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" style={{ transform: [{ scaleX: -1 }] }}>
                    <Svg height="100%" width="100%" viewBox="0 0 100 100" rotate="-90">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#66347F"
                            strokeWidth="10"
                            fill="transparent"
                        />
                        <AnimatedCircle
                            animatedProps={animatedCircleProps}
                            cx="50"
                            cy="50"
                            r="45"
                            strokeDasharray={circumference}
                            strokeWidth="10"
                            fill="transparent"
                            stroke="#E7E7E7"
                        />
                    </Svg>
                </Svg>
                <Text style={styles.countdownText}>{currentTime}</Text>
            </View>
            <View style={styles.controls}>
                <Button title="Reset" onPress={resetTimer} />
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
});

export default Timer;