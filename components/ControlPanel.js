import React, {Component} from 'react'
import {View, Text, Dimensions, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

const styles = StyleSheet.create({
  panel: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
})

const ControlPanel = () => {
  return (
    <View style={styles.panel}>
      <Text>Drawer</Text>
    </View>
  )
}

export default ControlPanel
