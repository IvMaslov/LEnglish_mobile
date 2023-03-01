import React, { useContext, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { AuthContext, ProfileContext } from "../../api/contexts";
import TopBar from "../../styles/topBar";
import Header from "../../templates/headerTemplate";
import clients from "../../api/clients"
import { Formik } from "formik";
import * as Yup from "yup";

const UserView = () => {
    const { authContext } = useContext(AuthContext);
    const { profileInfo } = useContext(ProfileContext);
    const [userExists, setUserExists] = useState(false);


    const validationScheme = Yup.object({
        username: Yup.string().max(150, "username must be less than 150 characters").min(3, "must be greater than 3 characters"),
        email: Yup.string().email(),
        firstName: Yup.string(),
        lastName: Yup.string(),
    });

    const clickOnSubmit = ( values ) => {
        const data = {}
        data["username"] = values.username;
        data["email"] = values.email;
        data["first_name"] = values.firstName;
        data["last_name"] = values.lastName;

        clients.patch("/profile/update", data)
        .then((response) => {
            setUserExists(false);
        })
        .catch((error) => {
            if (error.response.status === 409)
            {
                setUserExists(true);
            }
        });
    };

    return (
        <SafeAreaView className="h-full bg-backcolor">
            <TopBar />
            <ScrollView 
                contentContainerStyle={{
                    height:"100%",
                    display:"flex",
                    justifyContent:"center"
                }}
            >
                <Formik 
                    initialValues={{username:profileInfo.username, email:profileInfo.email, firstName:profileInfo.first_name, lastName:profileInfo.last_name}}
                    onSubmit={clickOnSubmit}
                    validationSchema={validationScheme}
                >
                    {({handleChange, handleSubmit, values, errors}) => (
                        <View className="flex h-full items-center justify-center" >
                            <View className="w-full">
                                <Text className="text-white text-2xl mx-auto mb-16">Settings</Text>
                                <TextInput 
                                    className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white"
                                    value={values.username}
                                    type="text"
                                    placeholder="Username"
                                    placeholderTextColor="#9a9c9e"
                                    onChangeText={handleChange("username")}
                                />
                                <Text className="text-error mx-auto">{errors.username}</Text>
                                <TextInput
                                    className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white" 
                                    value={values.email}
                                    placeholder="Email"
                                    placeholderTextColor="#9a9c9e"
                                    onChangeText={handleChange("email")}
                                />
                                <Text className="text-error mx-auto">{errors.email}</Text>
                                <TextInput
                                    className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white" 
                                    value={values.firstName}
                                    placeholder="First name"
                                    placeholderTextColor="#9a9c9e"
                                    onChangeText={handleChange("firstName")}
                                />
                                <Text className="text-error mx-auto">{errors.firstName}</Text>
                                <TextInput
                                    className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white" 
                                    value={values.lastName}
                                    placeholder="Last name"
                                    placeholderTextColor="#9a9c9e"
                                    onChangeText={handleChange("lastName")}
                                />
                                <Text className="text-error mx-auto">{errors.lastName}</Text>
                                {userExists ? <Text className="text-error mb-2 mx-auto">User Already Exist</Text> : <></>}
                                <View className="mt-2 mx-auto">
                                    <TouchableOpacity className="bg-light-blue px-10 py-2 mx-auto my-2 rounded-full" onPress={handleSubmit}>
                                        <Text>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => authContext.logOut()} className="mx-auto mt-1 px-10 py-2 bg-error rounded-full">
                                <Text className="text-white">Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};


export default UserView;