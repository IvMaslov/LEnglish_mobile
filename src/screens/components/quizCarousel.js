
import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { windowWidth } from "../../constants/parameters"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuizCarousel({ onchangeDefaultWordsUrl }) {
    const SIZE = windowWidth * 0.1;

    const viewabilityConfig = useRef({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    });

    // const [viewedItems, setViewedItems] = useState([]);

    const handleVieweableItemsChanged = useCallback(({ changed }) => {
        // setViewedItems((oldViewedItems) => {

        //     changed
        //     .filter(({ isViewable }) => isViewable)
        //     .map(async ({ item }) => {
        //         console.log(item.title);
        //         await AsyncStorage.setItem("levelType", item.title);
        //     })

        // let newViewedItems = null;

        // changed.forEach(({ index, isViewable }) => {
        //     if (index != null && isViewable && !oldViewedItems.includes(index)) {
        //     if (newViewedItems == null) {
        //         newViewedItems = [...oldViewedItems];
        //     }
        //     newViewedItems.push(index);
        //     }
        // });

        // return newViewedItems == null ? oldViewedItems : newViewedItems;
        // });

        changed
            .filter(({ isViewable }) => isViewable)
            .map(async ({ item }) => {
                console.log(item.title);
                await AsyncStorage.setItem("QuizLevelType", item.title);
                onchangeDefaultWordsUrl();
            })

    }, []);

    useState(async () => {
        console.log("a1");
        await AsyncStorage.setItem("QuizLevelType", "a1");
        onchangeDefaultWordsUrl();
    });


    return (
        <FlatList 
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={24}
            snapToInterval={SIZE}
            pagingEnabled={true}
            decelerationRate="fast"
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={handleVieweableItemsChanged}

            style={{maxWidth: SIZE}}
            renderItem={({item, index}) => {
                return (
                    <View style={{width: SIZE}} key={index}>
                        <Text className="text-white text-center" style={{aspectRatio: 1, width: "100%"}}>{item.title}</Text>
                    </View>
                )
            }}
        />
    )
}


const data = [
    {
        title: "a1",
    },
    {
        title: "a2",
    },
    {
        title: "b1",
    },
    {
        title: "b2",
    },
    {
        title: "c1",
    }
]