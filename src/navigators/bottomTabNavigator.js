import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserView from "../screens/components/userView.js";
import clients from "../api/clients"
import { Bars3Icon, UserIcon, PuzzlePieceIcon, Squares2X2Icon } from "react-native-heroicons/mini";
import DictNav from "./dictionaryNavigator";
import { ProfileContext } from "../api/contexts";
import QuizView from "../screens/components/quizView";
import GroupsView from "../screens/components/groupsView.js";


const Tab = createBottomTabNavigator();

const BottomTabs = ({}) => {
    const [profileInfo, setProfileInfo] = useState();
    const [quizData, setQuizData] = useState();

    const getProfileInfo = () => {
        clients.get("profile")
        .then((response) => {
            setProfileInfo(response.data)
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
    };

    const getQuizData = () => {
        clients.get("quiz")
        .then((response) => {
            setQuizData(validateData(response.data))
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
    };

    useEffect(() => {
        getProfileInfo();
        getQuizData();
    }, []);

    const validateData = (input_data) => {
        for (let i = 0; i < input_data.length; i++) {
            input_data[i].word = input_data[i].word.split(",")[0];
            input_data[i].translate = input_data[i].translate.split(",")[0];
        }
        return input_data;
    };

    return (
        <ProfileContext.Provider value={{profileInfo, quizData, validateData}}>
            <Tab.Navigator className="bg-backcolor text-white" screenOptions={{
                tabBarActiveBackgroundColor:"#212529",
                tabBarInactiveBackgroundColor:"#212529",
                tabBarActiveTintColor:"#ffffff",
                tabBarShowLabel:false,
                headerStyle:{
                    backgroundColor:"#212529",
                    borderBottomWidth: 0
                },
                headerTintColor:"#212529",
                headerTitleAlign:"center",
                tabBarStyle:{
                    borderTopWidth: 0
                },
                
            }}>
                <Tab.Screen name="Dictionary" component={DictNav} options={{tabBarIcon:({size, color})=>(<Bars3Icon size={size} color={color}/>), headerShown: false}}/>

                <Tab.Screen name="Quiz" component={QuizView} options={{tabBarIcon:({size, color})=>(<PuzzlePieceIcon size={size} color={color}/>), headerShown:false}}/>

                {/* <Tab.Screen name="Groups" component={GroupsView} options={{tabBarIcon:({size, color})=>(<Squares2X2Icon size={size} color={color}/>), headerShown: false}}/> */}

                <Tab.Screen name="User" component={UserView} options={{tabBarIcon:({size, color})=>(<UserIcon size={size} color={color}/>), headerShown: false}} />
            </Tab.Navigator>
        </ProfileContext.Provider>
    );
};

export default BottomTabs;