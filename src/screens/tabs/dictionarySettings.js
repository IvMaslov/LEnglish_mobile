import { View, Text, Modal, Animated } from 'react-native'
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { windowHeight } from "../../constants/parameters";
import DictionaryCarousel from "../components/dictionaryCarousel";

export default class DictionarySettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    
    show = () => {
        this.setState({show: true});      
    };

    close = () => {
        this.setState({show: false});
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
            <View className="px-4 mt-4">
                <View className="flex-row justify-between">
                    <Text className="text-white">Choose type of words</Text>
                    <DictionaryCarousel onChangedDictLevelType={this.props.onChangedDictLevelType}/>
                </View>
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