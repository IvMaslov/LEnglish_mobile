import { View, StyleSheet, TouchableWithoutFeedback, } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle, useState, useEffect } from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { windowHeight } from '../../constants/parameters';


const BottomSheet = forwardRef(({ activeHeight, child, keyboardState }, ref) => {
    const topAnimation = useSharedValue(windowHeight);
    const newActiveHeight = windowHeight - activeHeight;
    const [visible, setVisible] = useState(false);

    const backDropAnimationStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [windowHeight, newActiveHeight],
            [0, 0.7]
        )
        const display = opacity === 0 ? "none" : "flex";
        return {
            opacity,
            display,
        }
    });

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
            top,
        }
    });

    useEffect(() => {
        'worklet'
        if (keyboardState) {
            topAnimation.value = withTiming(100, {
                duration: 100
            });
        } else {
            topAnimation.value = withTiming(newActiveHeight, {
                duration: 100
            });
        }
    }, [keyboardState]);

    const expand = useCallback(() => {
        'worklet'
        topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
        });
        setVisible(true);
    }, []);

    const close = useCallback(() => {
        'worklet'
        topAnimation.value = withTiming(windowHeight, {
            duration:100
        }, () => {
            runOnJS(setVisible)(false);
        });
    }, []);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = topAnimation.value;
        },
        onActive: (event, ctx) => {
            if (event.translationY < 0) {
                topAnimation.value = withSpring(newActiveHeight, {
                    damping: 10,
                    stiffness: 200,
                    mass:0.5,
                });
            } else {
                topAnimation.value = withSpring(ctx.startY + event.translationY, {
                    damping: 10,
                    stiffness: 200,
                    mass: 0.5
                });
            }
        },
        onEnd: () => {
            if (topAnimation.value > newActiveHeight + 100) {
                topAnimation.value = withTiming(windowHeight, {
                    duration: 100
                }, () => {
                    runOnJS(setVisible)(false);
                });
            } else {
                topAnimation.value = withSpring(newActiveHeight, {
                    damping: 100,
                    stiffness: 400,
                    mass: 0.5
                });
            }
        },
    });

    useImperativeHandle(ref, () => ({
        expand, close
    }), [expand, close]);

    return (
        visible ?
        <>
            <TouchableWithoutFeedback onPress={close}>
                <Animated.View style={[styles.backDrop, backDropAnimationStyle]}/>
            </TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.container, animationStyle]} className="bg-backcolor">
                    <View className="h-1 w-6 bg-gray rounded-full self-center my-4"/>
                        {child}
                </Animated.View>
            </PanGestureHandler>
        </> : null
    )
});

const styles = StyleSheet.create({
    container: {
        width:"100%",
        position:"absolute",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    backDrop: {
        backgroundColor: "black",
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
});

export default BottomSheet;