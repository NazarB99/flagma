import React from 'react'
import {View, ActivityIndicator} from 'react-native'

import {MAIN_COLOR} from '../config/Constants'

const Loading = () => (
  <View
    style={{
      flex: 1,
      // paddingLeft: 10,
      // paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <ActivityIndicator color={MAIN_COLOR} size="large" />
  </View>
)

export default Loading
