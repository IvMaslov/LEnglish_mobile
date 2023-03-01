import { SaveAreaView, Text } from 'react-native'
import React from 'react'

export default function ConnectionProblem() {
  return (
    <SaveAreaView className="flex-1 justify-center">
      <Text className="text-error text-3xl">Error:(</Text>
      <Text>Check your internet connection</Text>
      <Text>and try to restart app</Text>
      <Text>or just wait</Text>
    </SaveAreaView>
  )
}