/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {Button, Image, TextInput} from '@shoutem/ui'
import Hamburger from 'react-native-animated-hamburger'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {init} from './config/Socket'
import DrawerContent from './components/DrawerContent'
import {MAIN_COLOR, ORANGE_COLOR} from './config/Constants'
import {store, persistor} from './store'
import NavigationService from './components/NavigationService'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MainScreen from './screens/MainScreen'
import AdScreen from './screens/AdScreen'
import AddAdvScreen from './screens/AddAdvScreen'
import AdListPageScreen from './screens/AdListPageScreen'
import AccountScreen from './screens/AccountScreen'
import ChatScreen from './screens/ChatScreen'
import FilterScreen from './screens/FilterScreen'
import LanguageOverlay from './components/LanguagesOverlay'

const DrawerNav = createDrawerNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen,
    AddAdv: AddAdvScreen,
    AdListPage: AdListPageScreen,
    Account: AccountScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Login',
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    contentOptions: {
      items: ['Login', 'Main', 'AddAdv', 'AdListPage'],
      activeTintColor: '#fff',
      activeBackgroundColor: MAIN_COLOR,
    },
    contentComponent: props => <DrawerContent {...props} />,
    overlayColor: 'rgba(0,0,0,0)',
    drawerType: 'front',
    order: ['Login', 'Main', 'AddAdv', 'AdListPage', 'Register', 'Account', 'Chat'],
    paths: ['Login', 'Main', 'AddAdv', 'AdListPage', 'Register', 'Account', 'Chat'],
    // drawerLockMode: 'locked-open',
  }
)
// navigation.state.params && navigation.state.params.active
//                     ? navigation.state.params.active
//                     : false
const MainStack = createStackNavigator(
  {
    Drawer: {
      screen: DrawerNav,
      navigationOptions: ({navigation}) => {
        const {
          onFocus,
          onBlur,
          onType,
          onSubmitEditing,
          changeLocale,
          language,
        } = navigation.router.getPathAndParamsForState(navigation.state).params
        console.log(navigation.router.getPathAndParamsForState(navigation.state).params)
        return {
          headerStyle: {
            backgroundColor: MAIN_COLOR,
            height:
              navigation.router.getPathAndParamsForState(navigation.state).path === 'Login'
                ? 0
                : 55,
          },
          headerLeft:
            navigation.router.getPathAndParamsForState(navigation.state).path === 'Login' ||
            navigation.router.getPathAndParamsForState(navigation.state).path ===
              'Register' ? null : navigation.router.getPathAndParamsForState(navigation.state)
                .path !== 'Chat' ? (
              <Hamburger
                type="cross"
                active={navigation.state.isDrawerOpen}
                color="white"
                onPress={() => {
                  if (!navigation.state.params) {
                    navigation.openDrawer()
                    navigation.setParams({active: true})
                  } else if (navigation.state.params.active) {
                    navigation.closeDrawer()
                    navigation.setParams({active: false})
                  } else {
                    navigation.openDrawer()
                    navigation.setParams({active: true})
                  }
                }}
                underlayColor="transparent"
              />
            ) : (
              <Button
                style={{backgroundColor: 'transparent', borderWidth: 0}}
                onPress={() => navigation.replace('Drawer')}>
                <Icon name="arrow-left" size={26} color="white" />
              </Button>
            ),
          headerTitle:
            navigation.router.getPathAndParamsForState(navigation.state).path === 'Login' ||
            navigation.router.getPathAndParamsForState(navigation.state).path ===
              'Register' ? null : navigation.router.getPathAndParamsForState(navigation.state)
                .path !== 'Chat' ? (
              <TextInput
                placeholder="Search Flagma"
                onFocus={() => onFocus()}
                onBlur={() => onBlur()}
                onSubmitEditing={({nativeEvent}) => onSubmitEditing(nativeEvent.text)}
                onChangeText={text => {
                  if (text !== '') {
                    onType()
                  } else {
                    onFocus()
                  }
                }}
                style={{
                  backgroundColor: '#f5f5f5',
                  width: Dimensions.get('window').width * 0.7,
                  height: 40,
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 3,
                }}
              />
            ) : null,
          headerRight:
            navigation.router.getPathAndParamsForState(navigation.state).path ===
            'Login' ? null : language === 'ru' ? (
              <Button
                onPress={() => changeLocale()}
                style={{height: 30, width: 30, marginRight: 10, padding: 0}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('./assets/images/russia.png')}
                />
              </Button>
            ) : language === 'en' ? (
              <Button
                onPress={() => changeLocale()}
                style={{height: 30, width: 30, marginRight: 10, padding: 0}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('./assets/images/united-kingdom.png')}
                />
              </Button>
            ) : (
              <Button
                onPress={() => changeLocale()}
                style={{height: 30, width: 30, marginRight: 10, padding: 0}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('./assets/images/turkmenistan.png')}
                />
              </Button>
            ),
        }
      },
    },
    Ad: AdScreen,
    Filter: FilterScreen,
  },
  {
    initialRouteName: 'Drawer',
  }
)

const AppContainer = createAppContainer(MainStack)

class App extends Component {
  state = {
    overlayVisible: false,
  }

  componentDidMount() {
    init()
    console.disableYellowBox = true
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <LanguageOverlay
              navigation={NavigationActions}
              locale={store.getState().user.locale || 'ru'}
              closeLanguageOverlay={this.closeLanguageOverlay}
              openLanguageOverlay={this.openLanguageOverlay}
            />
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
