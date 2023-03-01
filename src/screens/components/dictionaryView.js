import React, { useState, useEffect, useContext, useCallback, createRef, useRef } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import clients from "../../api/clients";
import { PlusIcon } from "react-native-heroicons/mini";
import { EllipsisVerticalIcon } from "react-native-heroicons/mini";
import { DictionaryContext, UpdateContext } from "../../api/contexts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TopBar from "../../styles/topBar";
import Header from "../../templates/headerTemplate";
import DictionarySettings from "../tabs/dictionarySettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "../tabs/bottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { windowHeight } from '../../constants/parameters';
import AddWord from "../tabs/addWord";
import DetailView from "../tabs/detailView";

const DictionaryView = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState("words?page=");
    const { updateContext, updateState, keyboardState } = useContext(UpdateContext);
    let settingsRef = createRef();
    const addWordRef = useRef(null);
    const detailRef = useRef(null);
    const [detailObj, setDetailObj] = useState(null);
    const navigation = useNavigation();

    const onShowSettings = () => {
        settingsRef.show();
    };

    const onCloseSettings = () => {
        settingsRef.close();
    };

    const changeUrl = async () => {
        const newLevelType = await AsyncStorage.getItem("DictionaryLevelType")
        if (newLevelType !== "my") {
            setPage(1);
            setData([]);
            setIsEnd(false);
            setUrl(`words/${newLevelType}?page=`);
        }
        else if (newLevelType === "my" && url !== "words?page=") {
            setPage(1);
            setData([]);
            setIsEnd(false);
            setUrl("words?page=");
        }
    };

    const getList = async () => {
        if (!isEnd & !isLoading) {
            setIsLoading(true);
            try {
                console.log(url);
                response = await clients.get(url + page)
                if (response.data.length > 0) {
                        setData([...data, ...response.data]);
                        setIsLoading(false);
                        setPage(page + 1);
                        console.log(data.length);
                }
                else {
                    setIsEnd(true);
                    setIsLoading(false);
                }
            }
            catch (error) { navigation.navigate("Connection Problem") };
        }
    };

    const renderFooter = () => {
        return (
            isLoading ? 
            <View className="items-center">
                <ActivityIndicator size="large" color="#facc15"/>
            </View> : null
        )
    };

    const refresh = async () => {
        setPage(1);
        setIsEnd(false);
        response = await clients.get(url + "1")
        if (response.data.length > 0) {
            setData(response.data);
            setPage(page => page + 1);
        }
        else {
            setData([]);
            setIsEnd(true);
        }
    };

    useEffect(() => {
        getList();
    }, [url]);

    useFocusEffect(
        useCallback(() => {
            if (updateState) {
                getList();
                updateContext.disableUpdate();
            }
        }, [updateState])
    );

    const openAddWord = useCallback(() => {
        addWordRef.current.expand();
    }, []);

    const closeAddWord = useCallback(() => {
        addWordRef.current.close();
    }, []);

    const openDetail = useCallback(() => {
        detailRef.current.expand();
    }, []);

    const closeDetail = useCallback(() => {
        detailRef.current.close();
    }, []);

    return (
        <GestureHandlerRootView className="flex-1">
            <SafeAreaView className="bg-backcolor h-full">
                <TopBar/>
                <Header title="Dictionary" image={<EllipsisVerticalIcon size={24} color="#ffffff"/>} onPress={onShowSettings}/>
                <View className="px-2 pt-2 flex-auto justify-center"> 
                    <FlatList 
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={dataEmpty}
                        ListFooterComponent={renderFooter}
                        onEndReached={getList}
                        onEndReachedThreshold={0}
                        onRefresh={refresh}
                        refreshing={isRefreshing}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setDetailObj(item);
                                    openDetail();
                                }}
                                    className="flex flex-row bg-backcolor justify-between rounded-2xl border-2 border-yellow py-4 my-2"    
                                >
                                    <Text className="text-white text-base pl-3">{item.word.split(",")[0]}</Text>
                                    <Text className="text-white text-base pr-3">{item.translate.split(",")[0]}</Text>
                                </TouchableOpacity>                                    
                        );}}
                        />
                </View>
                <View className="absolute bottom-4 right-4 bg-dark-gray rounded-full p-3" >
                    <TouchableOpacity onPress={openAddWord}>
                        <PlusIcon size={28} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <DictionaryContext.Provider value={{closeAddWord, closeDetail}}>
                    <BottomSheet activeHeight={windowHeight * 0.4} ref={addWordRef} child={<AddWord />} keyboardState={keyboardState} />
                    <BottomSheet activeHeight={windowHeight * 0.4} ref={detailRef} child={<DetailView obj={detailObj} />} keyboardState={keyboardState} />
                </DictionaryContext.Provider>
                <DictionarySettings 
                    ref={(target) => settingsRef = target}
                    onTouchOutside={onCloseSettings}
                    title={"Dictionary Settings"}
                    onChangedDictLevelType={changeUrl}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const dataEmpty = () => {
    return (
        <View className="h-screen justify-center">
            <Text className="text-white text-2xl text-center">Dictionary is Empty</Text>
        </View>
    );
}


export default DictionaryView;