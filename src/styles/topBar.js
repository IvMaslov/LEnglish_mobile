import { StyleSheet, View } from "react-native";
import { Platform } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    title:{
        height: Constants.statusBarHeight,
        backgroundColor: "#212529"
    }
});

const topBar = () => {
    const isAndroid = Platform.OS === "android";

    return (
        <View>
            {isAndroid ? <View style={styles.title}></View>: <></>}
        </View>
    );
};

export default topBar;