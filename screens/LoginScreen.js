/* eslint-disable react/no-unused-state */
/* eslint-disable consistent-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {StyleSheet} from 'react-native'
import {Title, Subtitle, TextInput, View, Text, Button, Icon} from '@shoutem/ui'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

import Languages from '../config/Languages'
import Loading from '../components/Loading'
import {login, logout} from '../actions/userActions'
import {getCategories, getCurrencies, getUnits} from '../actions/adsActions'

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  mask: {}, // style of mask if it is enabled
  main: {}, // style of main board
  container: {
    backgroundColor: 'black',
  },
  input: {
    width: 250,
    marginBottom: 10,
  },
})

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    drawerIcon: () => null,
    drawerLabel: () => (navigation.getParam('loggedIn') ? null : 'Login'),
  })

  state = {
    active: false,
    email: '',
    password: '',
    loading: false,
    secureEntry: true,
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getCurrencies()
    this.props.getUnits()
    this.props.navigation.setParams({
      loggedIn: this.props.user.user.id,
    })
    if (this.props.user.user.id) {
      this.props.navigation.navigate('Drawer', {}, NavigationActions.navigate({routeName: 'Main'}))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active !== undefined && prevState.active !== this.state.active) {
      this.props.navigation.setParams({
        active: this.state.active,
      })
    }
    if (this.props.user.user.id) {
      this.props.navigation.navigate('Drawer', {}, NavigationActions.navigate({routeName: 'Main'}))
    }
  }

  togglePanel = () => {
    this.setState({active: !this.state.active}, () => {
      if (this.state.active) {
        this.props.navigation.openDrawer()
      } else {
        this.props.navigation.closeDrawer()
      }
    })
  }

  onChangeText = (key, value) => {
    this.setState({[key]: value})
  }

  logIn = () => {
    this.setState({loading: true})
    this.props
      .login(this.state.email, this.state.password)
      .then(res => {
        this.setState({loading: false})
        // if (!this.props.user.user.is_verified) {
        //   alert('Your account is not verified')
        //   this.props.logout()
        // }
      })
      .catch(err => {
        this.setState({loading: false})
        alert(err)
      })
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <View style={{flex: 1, backgroundColor: '#2b3d61'}} styleName="vertical h-center v-center">
        <Title styleName="bold" style={{color: '#fff'}}>
          {Languages[this.props.user.locale].Login}
        </Title>
        <Subtitle styleName="bold" style={{color: '#fff', marginBottom: 10}}>
          {Languages[this.props.user.locale].Welcomeback}
        </Subtitle>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          value={this.state.email}
          onChangeText={text => this.onChangeText('email', text)}
          style={styles.input}
          placeholder={Languages[this.props.user.locale].Email}
        />
        <View>
          <TextInput
            value={this.state.password}
            style={styles.input}
            onChangeText={text => this.onChangeText('password', text)}
            placeholder={Languages[this.props.user.locale].Password}
            secureTextEntry={this.state.secureEntry}
          />
          <View style={{position: 'absolute', right: 2, top: 10}}>
            <Button onPress={() => this.setState({secureEntry: !this.state.secureEntry})}>
              <FontAwesome name="eye" size={32} />
            </Button>
          </View>
        </View>
        <Button
          style={{
            backgroundColor: '#ff6633',
            borderColor: '#ff6633',
            width: 250,
            height: 50,
            marginBottom: 10,
          }}
          onPress={() => this.logIn()}>
          <Text style={{marginTop: 10, color: '#fff'}}>
            {Languages[this.props.user.locale].Submit}
          </Text>
        </Button>
        <Button
          style={{backgroundColor: 'transparent'}}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{marginTop: 10, color: '#fff', textDecorationLine: 'underline'}}>
            {Languages[this.props.user.locale].Registerhere}
          </Text>
        </Button>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            style={{backgroundColor: 'transparent'}}
            onPress={() => this.props.navigation.navigate('Main')}>
            <Text style={{marginTop: 10, color: '#fff', textDecorationLine: 'underline'}}>
              {Languages[this.props.user.locale].Withoutlogin}
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  {
    login,
    logout,
    getCategories,
    getCurrencies,
    getUnits,
  }
)(LoginScreen)
