/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {MAIN_COLOR, ORANGE_COLOR} from './config/Constants'
import {store, persistor} from './store'
import NavigationService from './components/NavigationService'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MainScreen from './screens/MainScreen'
import AdScreen from './screens/AdScreen'
import AddAdvScreen from './screens/AddAdvScreen'

const MainStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen,
    Ad: AdScreen,
    AddAdv: AddAdvScreen,
  },
  {
    initialRouteName: 'Login',
  }
)

const DrawerNav = createDrawerNavigator(
  {
    Main: MainStack,
  },
  {
    initialRouteName: 'Main',
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: MAIN_COLOR,
      items: ['Main', 'Ad'],
    },
    overlayColor: 'rgba(0,0,0,0)',
    drawerType: 'front',
    // drawerLockMode: 'locked-open',
  }
)

const AppContainer = createAppContainer(DrawerNav)

class App extends Component {
  // state = {
  //   container: false,
  //   route: '',
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.container !== this.state.container ||
  //     // nextState.container._navigation.router.getPathAndParamsForState(
  //     //   nextState.container._navigation.state
  //     // ).path !== this.getCurrentRoute() ||
  //     nextState.route !== this.state.route
  //   )
  // }

  // getCurrentRoute = () => {
  //   this.setState({
  //     route: this.state.container._navigation.router.getPathAndParamsForState(
  //       this.state.container._navigation.state
  //     ).path,
  //   })
  //   return this.state.container._navigation.router.getPathAndParamsForState(
  //     this.state.container._navigation.state
  //   ).path
  // }

  render() {
    // console.log(this.state.container._navigation)
    // if (this.state.container._navigation) {
    //   console.log(
    //     this.state.container._navigation.router.getPathAndParamsForState(
    //       this.state.container._navigation.state
    //     )
    //   )
    // }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            {/* {this.state.container &&
              (this.getCurrentRoute() !== 'Login' && this.getCurrentRoute() !== 'Register') && (
                <Navbar
                  routeName={this.state.route}
                  closeDrawer={() => NavigationService.closeDrawer()}
                  openDrawer={() => NavigationService.openDrawer()}
                  goBack={() => NavigationService.goBack()}
                  navigate={routeName => {
                    NavigationService.navigate({routeName})
                  }}
                />
              )} */}
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
