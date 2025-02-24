import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

// type HeaderProps
interface HeaderProps {
    name: string;
}

export default function Header({name}: HeaderProps) {
  const {width, height} = useWindowDimensions();

  return (
    <View>
      <Text style={[styles.header, {padding: height < 415 ? 0 : 10}]}>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: '#9900cc',
    borderWidth: 2,
    borderColor: '#9900cc',
  }
})