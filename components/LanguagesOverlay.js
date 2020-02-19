/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {Button, Text, View, Image} from '@shoutem/ui'
import {Overlay} from 'react-native-elements'
import {connect} from 'react-redux'

import {changeLocale, overlayVisible} from '../actions/userActions'
import Languages from '../config/Languages'

class LanguageOverlay extends React.Component {
  render() {
    return (
      <Overlay
        width="auto"
        height="auto"
        isVisible={this.props.overlay}
        onBackdropPress={this.props.overlayVisible}>
        <TouchableWithoutFeedback onPress={this.props.overlayVisible}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, alignSelf: 'center', marginBottom: 10}}>
              {Languages[this.props.locale].Language}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Button
                onPress={() => {
                  this.props.overlayVisible()
                  this.props.changeLocale('ru')
                  this.props.navigation.setParams({
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
                  this.props.overlayVisible()
                  this.props.changeLocale('tm')
                  this.props.navigation.setParams({
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
                  this.props.overlayVisible()
                  this.props.changeLocale('en')
                  this.props.navigation.setParams({
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
  }
}

const mapStateToProps = state => ({
  overlay: state.user.overlayVisible,
})

export default connect(
  mapStateToProps,
  {changeLocale, overlayVisible}
)(LanguageOverlay)
