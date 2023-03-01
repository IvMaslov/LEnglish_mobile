import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { windowWidth } from "../../constants/parameters"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

export default function DictionaryCarousel({ onChangedDictLevelType }) {
    const SIZE = windowWidth * 0.1;
    const [scrollEnd, setScrollEnd] = useState(false);

    const viewabilityConfig = useRef({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 95
    });

    const handleVieweableItemsChanged = useCallback(({ changed }) => {

        changed
            .filter(({ isViewable }) => isViewable)
            .map(async ({ item }) => {
                console.log(item.title);
                await AsyncStorage.setItem("DictionaryLevelType", item.title);
                onChangedDictLevelType();
            });

    }, []);

    useState(async () => {
        console.log("my");
        await AsyncStorage.setItem("DictionaryLevelType", "my");
        onChangedDictLevelType();
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
        title: "my",
    },
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