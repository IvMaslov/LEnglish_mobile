import React, { useContext, useState } from "react";
import { SafeAreaView, TextInput, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import clients from "../../api/clients"
import { DictionaryContext, UpdateContext } from "../../api/contexts";


const DetailView = ({ obj }) => {
    const [updateError, setUpdateError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const { updateContext } = useContext(UpdateContext);
    const { closeDetail } = useContext(DictionaryContext);
    const [ successful, setSuccessful ] = useState(false);

    const validationScheme = Yup.object({
        word: Yup.string().max(70, "must be less than 70 characters").required(""),
        translate: Yup.string().max(70, "must be less than 70 characters").required(""),
    });

    const updateSubmit = async (values) => {
        const data = {};
        data["word"] = values.word;
        data["translate"] = values.translate;
        data["user_level"] = "";

        clients.patch("/words/update/" + obj.id, data)
        .then(function (response) {
            updateContext.update();
            setSuccessful(true);
            setUpdateError(false);
            setTimeout(() => { setSuccessful(false); }, 2000);
        })
        .catch(function (errors) {
            console.log(errors);
            setUpdateError(true);
        });
    };

    const deleteSubmit = async () => {
        clients.get("/words/delete/" + obj.id)
        .then(function (response) {
            updateContext.update();
            closeDetail();
        })
        .catch(function (errors) {
            setDeleteError(true);
        });
    };

    return (
        <SafeAreaView className="bg-backcolor h-full">
            <ScrollView>
                <Formik 
                    initialValues={{word:obj.word, translate:obj.translate}}
                    onSubmit={updateSubmit}
                    validationSchema={validationScheme}
                >
                    {({handleChange, handleSubmit, values, errors}) => (
                        <View className="mt-8">
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
                            {updateError ? <Text className="text-error mx-auto mb-1">Can't Update word</Text> : <></>}
                            {successful ? <Text className="text-green mx-auto mb-1">Successfully update word</Text> : <></>}
                            <View>
                                <TouchableOpacity onPress={handleSubmit} className="bg-green text-center px-10 py-2 mx-auto my-2 rounded-full">
                                    <Text>Update</Text>
                                </TouchableOpacity>
                            </View>
                            {deleteError ? <Text className="text-error mx-auto mb-1">Can't Delete word</Text> : <></>}
                            <View>
                                <TouchableOpacity onPress={deleteSubmit} className="bg-red text-center px-10 py-2 mx-auto my-2 rounded-full">
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}


export default DetailView;