import React, { useContext } from "react";
import { SafeAreaView, TextInput, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../api/contexts";

const LoginFrom = () => {
    const navigation = useNavigation();
    const { authContext, userNotFound } = useContext(AuthContext);

    const validationScheme = Yup.object({
        username: Yup.string().required(""),
        password: Yup.string().required(""),
    });
    
    return (
        <SafeAreaView className="bg-backcolor">
            <Formik 
                initialValues={{username:"", password:""}}
                onSubmit={(values) => authContext.singIn(values)}
                validationSchema={validationScheme}
            >
                {({handleChange, handleSubmit, values, errors}) => (
                    <View className="flex h-full items-center justify-center" >
                        <View className="w-full">
                            <Text className="text-white text-2xl mx-auto mb-16">Sing In</Text>
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
                                value={values.password}
                                secureTextEntry={true}
                                placeholder="Password"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("password")}
                            />
                            <Text className="text-error mx-auto">{errors.password}</Text>
                            {userNotFound ? <Text className="text-error mx-auto">User not found</Text> : <></>}
                            <View className="mt-3 mx-auto">
                                <TouchableOpacity className="bg-light-blue px-10 py-2 mx-auto my-2 rounded-full" onPress={handleSubmit}>
                                    <Text>Sing In</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="mt-1 mx-auto">
                                <TouchableOpacity className="bg-light-blue px-10 py-2 mx-auto my-2 rounded-full" onPress={() => {navigation.navigate("Registration")}}>
                                    <Text>Sing Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default LoginFrom;