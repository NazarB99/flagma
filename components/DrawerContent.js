/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {View} from 'react-native'
import {DrawerItems, NavigationActions} from 'react-navigation'
import {Button, Text} from '@shoutem/ui'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {logout} from '../actions/userActions'
import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

class DrawerContent extends React.Component {
  render() {
    console.log(this.props)
    return (
      <View style={{flex: 1}}>
        <Button
          onPress={() => this.props.navigation.navigate('Account')}
          style={{
            backgroundColor: ORANGE_COLOR,
            height: 120,
          }}>
          <View
            style={{
              flexDirection: 'row',
              margin: 0,
              padding: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="user-circle" size={34} color={MAIN_COLOR} />
            <Text numberOfLines={1} style={{fontSize: 18, color: MAIN_COLOR, marginLeft: 15}}>
              {this.props.user.user.company_name
                ? this.props.user.user.company_name
                : this.props.user.user.email}
            </Text>
          </View>
        </Button>
        <DrawerItems {...this.props} />
        {this.props.user.user.id ? (
          <View>
            <Button
              onPress={() => {
                this.props.logout()
                this.props.navigation.replace(
                  'Drawer',
                  {},
                  NavigationActions.navigate({routeName: 'Login'})
                )
              }}
              style={{
                backgroundColor: 'transparent',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // margin: 0,
                  // padding: 0,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Icon name="sign-out-alt" size={34} color={MAIN_COLOR} /> */}
                <Text numberOfLines={1} style={{fontSize: 18, color: MAIN_COLOR}}>
                  Logout
                </Text>
              </View>
            </Button>
          </View>
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  {logout}
)(DrawerContent)
