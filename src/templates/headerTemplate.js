import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Header = ({ title, image, onPress }) => {
  return (
    <View>
      <View className="flex flex-row justify-between my-2">
            <Text className="text-white text-xl ml-3 p-1">{title}</Text>
            <TouchableOpacity className="mt-1 mr-3 p-1" onPress={onPress}>
                {image}
            </TouchableOpacity>
        </View>
    </View>
  )
};

export default Header;