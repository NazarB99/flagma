/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createAppContainer, createDrawerNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from './store'
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
    initialRouteName: 'Login',
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    overlayColor: 'rgba(0,0,0,0)',
    drawerType: 'front',
  }
)

const AppContainer = createAppContainer(DrawerNav)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }}
            />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}
export default App
