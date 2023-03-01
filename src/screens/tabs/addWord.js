import React, { useContext, useState } from "react";
import { SafeAreaView, TextInput, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import clients from "../../api/clients"
import { DictionaryContext, UpdateContext } from "../../api/contexts";
import { ScrollView } from "react-native-gesture-handler";

const AddWord = () => {
    const [addError, setAddError] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { updateContext } = useContext(UpdateContext);
    const { closeAddWord } = useContext(DictionaryContext);

    const validationScheme = Yup.object({
        word: Yup.string().max(70, "must be less than 70 characters").required(""),
        translate: Yup.string().max(70, "must be less than 70 characters").required(""),
    });

    const handleSubmit = async (values) => {
        const data = {};
        data["word"] = values.word;
        data["translate"] = values.translate;
        data["user_level"] = "";

        clients.post("/words/create", data)
        .then(function (response) {
            updateContext.update();
            setAddError(false);
            setSuccessful(true);
            closeAddWord();
        })
        .catch(function (errors) {
            setSuccessful(false);
            setAddError(true);
        });
    };
    
    return (
        <SafeAreaView className="bg-backcolor h-full">
            <ScrollView>
            <Formik 
                initialValues={{word:"", translate:""}}
                onSubmit={handleSubmit}
                validationSchema={validationScheme}
            >
                {({handleChange, handleSubmit, values, errors}) => (
                        <View className="mt-14">
                            <TextInput
                                className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white"
                                value={values.word}
                                type="text"
                                placeholder="word"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("word")}
                            />
                            <Text className="text-error mx-auto">{errors.word}</Text>
                            <TextInput
                                className="rounded-full border-yellow border-2 px-4 py-2 mx-16 text-white"
                                value={values.translate}
                                placeholder="translate"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("translate")}
                            />
                            <Text className="text-error mx-auto">{errors.translate}</Text>
                            {addError ? <Text className="text-error mx-auto mb-3">Can't add word</Text> : <></>}
                            {successful ? <Text className="text-green mx-auto mb-3">Successfully add word</Text> : <></>}
                            <View>
                                <TouchableOpacity onPress={handleSubmit} className="bg-light-blue text-center px-10 py-2 mx-auto my-2 rounded-full">
                                    <Text>Add Word</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                )}
            </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddWord;