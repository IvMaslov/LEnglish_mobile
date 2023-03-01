import React, { useContext } from "react";
import { SafeAreaView, TouchableOpacity, TextInput, Text, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/mini";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../api/contexts";
import TopBar from "../../styles/topBar"


const RegForm = () => {
    const navigation = useNavigation();
    const { authContext } = useContext(AuthContext);
    const validationScheme = Yup.object({
        username: Yup.string().max(150, "must be less than 150 characters").min(3, "must be greater than 3 characters").required(""),
        email: Yup.string().email().required(""),
        password: Yup.string().max(128, "must be less than 128 characters").min(3, "must be greater than 4 characters").required(""),
    });
    
    return (
        <SafeAreaView className="bg-backcolor">
            <TopBar />
            <Formik 
                initialValues={{username:"", email:"", password:""}}
                onSubmit={(values) => authContext.singUp(values).then(navigation.goBack())}
                validationSchema={validationScheme}
            >
                {({handleChange, handleSubmit, values, errors}) => (
                    <View className="h-full flex justify-center">
                        <View className="w-full">
                            <Text className="text-white text-2xl mx-auto mb-16">Sing Up</Text>
                            <TextInput 
                                className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white"
                                value={values.email}
                                type="text"
                                placeholder="Email"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("email")}
                            />
                            <Text className="text-error mx-auto">{errors.email}</Text>
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
                                placeholder="Password"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("password")}
                                secureTextEntry={true}
                            />
                            <Text className="text-error mx-auto">{errors.password}</Text>
                            <View className="mt-3 mx-auto">
                                <TouchableOpacity className="bg-light-blue px-10 py-2 mx-auto my-2 rounded-full" onPress={handleSubmit}>
                                    <Text>Sing Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="absolute left-4 top-4">
                            <TouchableOpacity onPress={navigation.goBack}>
                                <ArrowLeftIcon size={20} color="#ffffff"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default RegForm;