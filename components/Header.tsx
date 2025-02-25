import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect } from 'react'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// type HeaderProps
interface HeaderProps {
    name: string;
}

export default function Header({name}: HeaderProps) {
  const {width, height} = useWindowDimensions();
  const paddingVerticalDynamic = height < 415 ? 0 : 10;

  return (
    <View>
      <Text style={[styles.header, {padding: paddingVerticalDynamic}]}>
        Welcome to {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // fontSize: 26,
    fontSize: windowWidth < 380 ? 20 : 26,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    color: '#9900cc',
    borderWidth: 2,
    borderColor: 'purple',
  }
})