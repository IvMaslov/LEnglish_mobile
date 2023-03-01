import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '../../styles/topBar'
import * as ImagePicker from 'expo-image-picker'
import { CameraIcon } from 'react-native-heroicons/mini'
import { Formik } from "formik";
import * as Yup from "yup";
import clients from "../../api/clients"

const GroupsView = () => {
  const [photo, setPhoto] = useState();
  const [addError, setAddError] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationScheme = Yup.object({
    name: Yup.string().max(25, "must be less than 25 characters").required(""),
    description: Yup.string().max(255, "must be less than 255 characters"),
  });

  const handleSubmit = (values) => {
    const data = {};
    data["name"] = values.name;
    data["description"] = values.description;

    clients.post("/api/testauth", data)
    .then(function (response) {
        setAddError(false);
        setSuccessful(true);
    })
    .catch(function (errors) {
        setSuccessful(false);
        setAddError(true);
    });
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status != "granted") {
      alert("Enable Camera roll permissions");
    }
  }

  const selectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) setPhoto(result.assets[0].uri);
    } catch (error) {
      alert("Try agaig!");
    }
  }

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-backcolor">
        <TopBar />
        <TouchableOpacity className="flex justify-center items-center w-44 h-44 bg-dark-gray rounded-3xl" onPress={selectPhoto}>
            { photo ? 
            <Image source={{uri: photo}} className="w-44 h-44 rounded-3xl"/>
                : 
            <CameraIcon size={50} color="#ffffff"/>
            }
        </TouchableOpacity>

        <ScrollView>
            <Formik 
                initialValues={{name:"", description:""}}
                onSubmit={handleSubmit}
                validationSchema={validationScheme}
            >
                {({handleChange, handleSubmit, values, errors}) => (
                        <View className="mt-14">
                            <TextInput
                                className="rounded-full border-yellow border-2 px-4 py-2 mt-6 w-52 text-white"
                                type="text"
                                placeholder="Name"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("name")}
                            />
                            <Text className="text-error mx-auto">{errors.name}</Text>
                            <TextInput
                                className="rounded-full border-yellow border-2 px-4 py-2 mt-6 w-52 text-white"
                                type="text"
                                placeholder="Description"
                                placeholderTextColor="#9a9c9e"
                                onChangeText={handleChange("description")}
                            />
                            <Text className="text-error mx-auto">{errors.description}</Text>
                            {addError ? <Text className="text-error mx-auto mb-3">Can't add word</Text> : <></>}
                            {successful ? <Text className="text-green mx-auto mb-3">Successfully add word</Text> : <></>}
                            <TouchableOpacity onPress={handleSubmit} className="bg-light-blue text-center px-10 py-2 mx-auto my-2 rounded-full">
                                <Text>Add Word</Text>
                            </TouchableOpacity>
                        </View>
                )}
            </Formik>
        </ScrollView>
    </View>
  )
}


export default GroupsView;