import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        marginBottom: 16
    },
    textBox: {
        marginTop: 20,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        paadingLeft: 10
    },
    buttonSubmit: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    errors: {
        color: "red",
        marginLeft: 10,
        fontSize: 18
    },
    content: {
        backgroundColor: "#000",
        height: "100%",
        width: "100%"
    }
});

export default styles;