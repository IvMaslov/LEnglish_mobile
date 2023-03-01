import { View, Text, Modal, Animated, Switch } from 'react-native'
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { windowHeight } from "../../constants/parameters";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuizCarousel from '../components/quizCarousel';

export default class QuizSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            reverseTranslate: false,
            defaultWords: false
        };
    }
    
    show = () => {
        this.setState({show: true});      
    };

    close = () => {
        this.setState({show: false});
    };

    reverseTranslateOnValueChange = async (value) => {
        this.setState({reverseTranslate: value});
        await AsyncStorage.setItem("reverseTranslate", value.toString());
        this.props.onchangeReverseTranslateUrl();
    };

    defaultWordsOnValueChange = async (value) => {
        this.setState({defaultWords: value});
        await AsyncStorage.setItem("defaultWords", value.toString());
        this.props.onchangeDefaultWordsUrl();
    };

    renderOutsideTouchable(onTouch) {
        const view = <View className="flex-1 w-full"></View>;
        if (!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} className="flex-1 w-full">
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const { title } = this.props;
        return (
            <View>
                <Text className="text-white text-xl text-center">{title}</Text>
            </View>
        )
    }

    renderContent = () => {
        return (
            <View className="px-4 mt-2">
                <View className="flex-row justify-between">
                    <Text className="mt-4 pl-4 text-white">Reverse translate</Text>
                    <Switch
                        value={this.state.reverseTranslate}
                        onValueChange={this.reverseTranslateOnValueChange}
                        trackColor={{false:"#000000", true:"#836903"}}
                        thumbColor={this.state.reverseTranslate ? "#facc15" : "#ffffff"}
                        ios_backgroundColor={"#000000"}
                    />
                </View>
                <View className="flex-row justify-between">
                    <Text className="mt-4 pl-4 text-white">Default words</Text>
                    <Switch
                        value={this.state.defaultWords}
                        onValueChange={this.defaultWordsOnValueChange}
                        trackColor={{false:"#000000", true:"#836903"}}
                        thumbColor={this.state.defaultWords ? "#facc15" : "#ffffff"}
                        ios_backgroundColor={"#000000"}
                    />
                </View>
                {this.state.defaultWords ? <View className="flex-row justify-between mt-4 pl-4">
                    <Text className="text-white">Choose words level type</Text>
                    <QuizCarousel onchangeDefaultWordsUrl={this.props.onchangeDefaultWordsUrl}/>
                </View> : <></>}
            </View>
        )
    }

    render() {
        let { show } = this.state;
        const { onTouchOutside} = this.props;
        
        return (
            <Modal 
                animationType={"fade"}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <Animated.View className="flex-auto justify-end" style={{backgroundColor:"#000000AA"}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View className="bg-backcolor w-full rounded-t-2xl px-4 py-4" style={{maxHeight: windowHeight * 0.4}}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </Animated.View>
            </Modal>
        )
    }
}