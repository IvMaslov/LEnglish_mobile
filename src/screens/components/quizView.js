import { SafeAreaView, View } from "react-native";
import Quiz from "./quizUser";
import TopBar from "../../styles/topBar";
import { EllipsisVerticalIcon } from "react-native-heroicons/mini";
import QuizSettings from "../tabs/quizSettings";
import { createRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../templates/headerTemplate";

const QuizView = () => {
    let settingsRef = createRef()
    const [url, setUrl] = useState("quiz");

    const onShowSettings = () => {
        settingsRef.show();
    };

    const onCloseSettings = () => {
        settingsRef.close();
    };

    const changeReverseTranslateUrl = async () => {
        const reverseTranslate = await AsyncStorage.getItem("reverseTranslate") === "false" ? false : true;
        if (reverseTranslate) {
            setUrl(url + "?reverse=True");
        }
        else {
            const newUrl = url.split("?")[0];
            setUrl(newUrl);
        }
    };

    const changeDefaultWordsUrl = async () => {
        const defaultWords = await AsyncStorage.getItem("defaultWords") === "false" ? false : true;
        let newUrl
        if (defaultWords) {
            newUrl = url.split("?");
            newUrl[0] = "levels/" + await AsyncStorage.getItem("QuizLevelType")
        }
        else {
            newUrl = url.split("?");
            newUrl[0] = "quiz";
        }
        const reverseTranslate = await AsyncStorage.getItem("reverseTranslate") === "false" ? false : true;
        if (reverseTranslate) setUrl(newUrl.join("?")) + "?reverse=True";
        else setUrl(newUrl.join("?"));
    };


    return (
            <SafeAreaView className="bg-backcolor">
                <TopBar/>
                <View>
                    <Header title="Quiz" image={<EllipsisVerticalIcon size={24} color="#ffffff"/>} onPress={onShowSettings}/>
                    <Quiz url={url} />
                    <QuizSettings
                        ref={(target) => { settingsRef = target }}
                        onTouchOutside={onCloseSettings}
                        title={"Quiz Settings"}
                        onchangeReverseTranslateUrl={changeReverseTranslateUrl}
                        onchangeDefaultWordsUrl={changeDefaultWordsUrl}
                    />
                </View>
            </SafeAreaView>
    );
}

export default QuizView;