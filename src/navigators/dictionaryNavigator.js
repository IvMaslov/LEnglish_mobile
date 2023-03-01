import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React, { useState, useMemo, useEffect } from "react";
import DetailView from "../screens/tabs/detailView";
import DictionaryView from "../screens/components/dictionaryView";
import AddWord from "../screens/tabs/addWord"
import { UpdateContext } from "../api/contexts";
import { config, closeConfig } from "../constants/animationConfig";
import { Keyboard } from "react-native";

const Stack = createStackNavigator();

const DictNav = () => {
    const [updateState, setUpdateState] = useState(false);
    const [keyboardState, setKeyboardState] = useState(false);

    const updateContext = useMemo(() => ({
        update: () => {
            setUpdateState(true);
        },
        disableUpdate: () => {
            setUpdateState(false);
        },
        keyboardOn: () => {
            setKeyboardState(true);
        },
        keyboardOff: () => {
            setKeyboardState(false);
        }
    }), []);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => { setKeyboardState(true);console.log("up"); });
        Keyboard.addListener("keyboardDidHide", () => { setKeyboardState(false);console.log("down"); });
        

        return function cleanUp() {
            Keyboard.removeAllListeners("keyboardDidShow");
            Keyboard.removeAllListeners("keyboardDidHide");
        }
    });

    return (
        <UpdateContext.Provider value={{updateContext, updateState, keyboardState}}>
            <Stack.Navigator initialRouteName="List View" screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}>
                <Stack.Screen name="List View" component={DictionaryView} options={{headerShown:false}}/>
                {/* <Stack.Screen name="Add Word" component={AddWord} options={{
                    presentation:"modal", 
                    headerShown:false,
                    gestureDirection: "vertical",
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    cardOverlayEnabled:true
                }}/> */}
                {/* <Stack.Screen name="Detail View" component={DetailView} options={{
                    presentation:"modal", 
                    headerShown:false,
                    gestureDirection: "vertical",
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    cardOverlayEnabled:true,
                }}/> */}
            </Stack.Navigator>
        </UpdateContext.Provider>
    );
};

export default DictNav;