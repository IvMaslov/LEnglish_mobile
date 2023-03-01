import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import LoginForm from "../screens/components/loginForm"
import RegForm from "../screens/components/regForm"
import BottomTabs from "./bottomTabNavigator";
import ConnectionProblem from "../screens/components/connectionProblem";
import { config, closeConfig } from "../constants/animationConfig";

Stack = createStackNavigator();


const AuthNavigator = () => {

    return (
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen name="Login" component={LoginForm} options={{headerShown:false}} />
                <Stack.Screen name="Registration" component={RegForm} options={{
                    headerShown:false,
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}} />
                <Stack.Screen name="Connection Problem" component={ConnectionProblem} options={{headerShown:false}} />
            </Stack.Navigator>
    );
};

export default AuthNavigator;