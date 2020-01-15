/* eslint-disable react/prop-types */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {Button, Text, View, Image} from '@shoutem/ui'
import {Overlay} from 'react-native-elements'

import Languages from '../config/Languages'

const LanguageOverlay = props => (
  <Overlay
    width="auto"
    height="auto"
    isVisible={props.overlayVisible}
    onBackdropPress={props.closeLanguageOverlay}>
    <TouchableWithoutFeedback onPress={props.closeLanguageOverlay}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, alignSelf: 'center', marginBottom: 10}}>
          {Languages[props.locale].Language}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => {
              props.closeLanguageOverlay()
              props.changeLocale('ru')
              props.navigation.setParams({
                language: 'ru',
              })
            }}
            style={{backgroundColor: 'transparent'}}>
            <View style={{width: 80, height: 60}}>
              <Image
                style={{width: 80, height: 60}}
                source={require('../assets/images/russia.png')}
              />
            </View>
          </Button>
          <Button
            onPress={() => {
              props.closeLanguageOverlay()
              props.changeLocale('tm')
              props.navigation.setParams({
                language: 'tm',
              })
            }}
            style={{backgroundColor: 'transparent'}}>
            <View style={{width: 80, height: 60}}>
              <Image
                style={{width: 80, height: 60}}
                source={require('../assets/images/turkmenistan.png')}
              />
            </View>
          </Button>
          <Button
            onPress={() => {
              props.closeLanguageOverlay()
              props.changeLocale('en')
              props.navigation.setParams({
                language: 'en',
              })
            }}
            style={{backgroundColor: 'transparent'}}>
            <View style={{width: 80, height: 60}}>
              <Image
                style={{width: 80, height: 60}}
                source={require('../assets/images/united-kingdom.png')}
              />
            </View>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Overlay>
)

export default LanguageOverlay
