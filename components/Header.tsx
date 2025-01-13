import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// type HeaderProps
interface HeaderProps {
    name: string;
}

export default function Header({name}: HeaderProps) {
  return (
    <View>
      <Text>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})