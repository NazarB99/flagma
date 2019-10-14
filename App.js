/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createAppContainer, createDrawerNavigator} from 'react-navigation'

import NavigationService from './components/NavigationService'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MainScreen from './screens/MainScreen'

const DrawerNav = createDrawerNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen,
  },
  {
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    overlayColor: 'rgba(0,0,0,0)',
    drawerType: 'slide',
  }
)

const AppContainer = createAppContainer(DrawerNav)

class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}
export default App
