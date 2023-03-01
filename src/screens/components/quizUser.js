import { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";
import clients from "../../api/clients";
import { ProfileContext } from "../../api/contexts";


// const QuizUser = () => {
//     const flipAnimation = useRef(new Animated.Value(0)).current;
    

//     let flipRotation = 0;
//     flipAnimation.addListener(({ value }) => flipRotation = value);

//     const flipToBackStyle = {
//         transform: [
//             {
//                 rotateY: flipAnimation.interpolate({
//                     inputRange: [0, 180],
//                     outputRange: ["180deg", "0deg"]
//                 })
//             }
//         ]
//     };

//     const flipToFrontStyle = {
//         transform: [
//             {
//                 rotateY: flipAnimation.interpolate({
//                     inputRange: [0, 180],
//                     outputRange: ["0deg", "180deg"]
//                 })
//             }
//         ]
//     };

//     const flipToFront = () => {
//         console.log("front", flipAnimation, !!flipRotation);
//         Animated.timing(flipAnimation, {
//             toValue: 180,
//             duration: 350,
//             useNativeDriver: true
//         }).start();
//     };

//     const flipToBack = () => {
//         console.log("back", flipAnimation, !!flipRotation);
//         Animated.timing(flipAnimation, {
//             toValue: 0,
//             duration: 350,
//             useNativeDriver: true
//         }).start();
//     };


//     return (
//         <View className="bg-backcolor">
//             <Pressable className="w-full h-full flex items-center justify-center" onPress={() => !!flipRotation ? flipToBack() : flipToFront()}>
//                 <Animated.View style={{...styles.front, ...flipToFrontStyle}}>
//                     <Text className="text-white">Front</Text>
//                 </Animated.View>
//                 <Animated.View style={{...styles.back, ...flipToBackStyle}}>
//                     <Text className="text-white">Back</Text>
//                 </Animated.View>
//             </Pressable>
//         </View>
//     );
// };

//____________________________________________________________________________________
// const QuizUser = () => {
//     const flipRotation = useSharedValue(0);
//     const [data, setData] = useState(null);
//     const [futureData, setFutureData] = useState(null);

//     const getData = () => {
//         clients.get("/quiz")
//         .then((response) => {
//             setFutureData(response.data);
//         })
//         .catch((error) => { console.log(error) });
//     };

//     const frontStyles = useAnimatedStyle(() => {
//         console.log("front", flipRotation.value);
//         const spinVal = interpolate(flipRotation.value, [0, 1], [0, 180]);
//         return {
//         transform: [
//             {
//             rotateY: withTiming(`${spinVal}deg`, { duration: 300 }),
//             },
//         ],
//         };
//     }, []);

//     const backStyles = useAnimatedStyle(() => {
//         console.log("back", flipRotation.value);
//         const spinVal = interpolate(flipRotation.value, [0, 1], [180, 0]);
//         return {
//         transform: [
//             {
//             rotateY: withTiming(`${spinVal}deg`, { duration: 300 }),
//             },
//         ],
//         };
//     }, []);


//     const clickButton = () => {
//         setData(futureData);
//         getData();
//         flipRotation.value = flipRotation.value ? 0 : 1;
//         // console.log(data);
//     };

//     useEffect(() => {
//         if (!data) {
//             clients.get("/quiz")
//             .then((response) => {
//                 setData(response.data);
//             })
//             .catch((error) => { console.log(error) });

//             getData();
//         } 
//     });

//     const getWordData = (( number ) => {
//         if (data) return data[number].word;
//         else return "";
//     });

//     return (
//         <View className="bg-backcolor w-full h-full flex items-center justify-center">
//             <Animated.View style={[styles.front, frontStyles]}>
//                 <Text className="text-white text-center mt-4">Front</Text>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full hover:opacity-25">
//                     <Text className="text-white text-2xl">{getWordData(0)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(1)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(2)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(3)}</Text>
//                 </Pressable>
//             </Animated.View>
//             <Animated.View style={[styles.back, backStyles]}>
//                 <Text className="text-white text-center mt-4">Back</Text>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full hover:opacity-25">
//                     <Text className="text-white text-2xl">{getWordData(0)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(1)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(2)}</Text>
//                 </Pressable>
//                 <Pressable onPress={clickButton} className="bg-gray mx-auto my-4 px-8 py-4 rounded-full">
//                     <Text className="text-white text-2xl">{getWordData(3)}</Text>
//                 </Pressable>
//             </Animated.View>
//         </View>
//     );
// };

const Quiz = ({ url }) => {
    const { quizData, validateData } = useContext(ProfileContext);
    const flipAnimation = useSharedValue(0);
    
    const [data, setData] = useState(false);
    const [futureData, setFutureData] = useState(false);
    const [trueId, setTrueId] = useState(0);

    const getData = () => {
        clients.get(url)
        .then((response) => {
            setFutureData(validateData(response.data));
        })
        .catch((error) => { console.log(error) });
    };

    const chooseTrueId = () => {
        setTrueId(Math.floor(Math.random() * (5 - 1) + 1));
    };

    const frontStyles = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        rotateY: withTiming(`${flipAnimation.value}deg`, { duration: 150,easing: Easing.out(Easing.cubic) }, (finished) => {
                            if (finished) {
                                flipAnimation.value = 0;
                            }
                        }),
                    }
                ]
            };
    }, []);

    const clickButton = ( number ) => {
        if (number === trueId) {
            setData(futureData);
            getData();
            chooseTrueId();

            flipAnimation.value = 180;
        }

    };

    useEffect(() => {
        if (!data) {
            setData(quizData);

            chooseTrueId();
            getData();
        }
    });

    useEffect(() => {
        if (data) {
            clients.get(url)
            .then((response) => {
                setData(validateData(response.data));
                chooseTrueId();
                getData();
            })
        }
    }, [url]);

    const getWordData = (( number ) => {
        if (data) return data[number].word;
        else return "";
    });

    const getTranslateData = (( number ) => {
        if (data) return data[number-1].translate;
        else return "";
    });

    return (
        <>
        {data.length > 0 ?
            <View className="bg-backcolor w-full">
                <Animated.View style={[styles.singleFront, frontStyles]}>
                    <Text className="text-white text-center text-4xl mb-8 mt-4">{trueId ? getTranslateData(trueId) : "Front"}</Text>
                    <TouchableOpacity onPress={() => (clickButton(1))} className="mx-auto my-4 px-8 py-4 rounded-full border-yellow border-2 max-w-3xl">
                        <Text className="text-white text-2xl text-center">{getWordData(0)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (clickButton(2))} className="mx-auto my-4 px-8 py-4 rounded-full border-yellow border-2 max-w-3xl">
                        <Text className="text-white text-2xl text-center">{getWordData(1)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (clickButton(3))} className="mx-auto my-4 px-8 py-4 rounded-full border-yellow border-2 max-w-3xl">
                        <Text className="text-white text-2xl text-center">{getWordData(2)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (clickButton(4))} className="mx-auto my-4 px-8 py-4 rounded-full border-yellow border-2 max-w-3xl">
                        <Text className="text-white text-2xl text-center">{getWordData(3)}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        :
        <View className="h-screen w-full bg-backcolor justify-center">
            <Text className="text-white text-2xl text-center">Too few words</Text>
        </View>}
        </>
    );
};

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    front: {
        width: "100%",
        height: "100%",
        backgroundColor: "#212529",
        // position: "absolute",
        backfaceVisibility: "hidden",
    },
    back: {
        width: "100%",
        height: "100%",
        backgroundColor: "#212529",
        backfaceVisibility: "hidden",
    },
    singleFront: {
        width: "100%",
        height: "100%",
        backgroundColor: "#212529",
        marginVertical: "20%",
    }
});

export default Quiz;