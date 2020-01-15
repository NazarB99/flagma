/* eslint-disable consistent-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {StyleSheet} from 'react-native'
import {Title, Subtitle, TextInput, View, Text, Button} from '@shoutem/ui'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import Languages from '../config/Languages'
import Loading from '../components/Loading'
import {registration, startVerification, changeLocale} from '../actions/userActions'
import LanguageOverlay from '../components/LanguagesOverlay'

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

class RegisterScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      drawerIcon: () => null,
      drawerLabel: () => null,
    }
  }

  state = {
    active: false,
    code: false,
    passCode: '',
    loading: false,
    overlayVisible: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({
      togglePanel: () => this.togglePanel(),
      active: this.state.active,
      changeLocale: () => this.setState({overlayVisible: true}),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active !== undefined && prevState.active !== this.state.active) {
      this.props.navigation.setParams({
        active: this.state.active,
      })
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
    this.setState({[key]: value}, () => {
      if (key === 'passCode') {
        if (value.length === 4) {
          this.register()
        }
      }
    })
  }

  register = () => {
    this.setState({loading: true})
    const data = {
      email: this.state.email,
      password: this.state.password,
      code: this.state.passCode,
    }
    this.props
      .registration(data)
      .then(() => {
        this.setState({loading: false})
        alert(Languages[this.props.user.locale].Youcanlogin)
        this.props.navigation.replace(
          'Drawer',
          {},
          NavigationActions.navigate({routeName: 'Login'})
        )
      })
      .catch(err => {
        alert(err)
        this.setState({loading: false, code: false})
      })
  }

  startVer = () => {
    this.setState({loading: true})
    if (this.state.email.length > 5) {
      this.props
        .startVerification(this.state.email)
        .then(() => this.setState({code: true, loading: false}))
    } else {
      alert(Languages[this.props.user.locale].Emailshort)
    }
  }

  closeLanguageOverlay = () => {
    this.setState({overlayVisible: false})
  }

  openLanguageOverlay = () => {
    this.setState({overlayVisible: true})
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <View style={{flex: 1, backgroundColor: '#2b3d61'}} styleName="vertical h-center v-center">
        <LanguageOverlay
          navigation={this.props.navigation}
          locale={this.props.user.locale || 'ru'}
          changeLocale={this.props.changeLocale}
          closeLanguageOverlay={this.closeLanguageOverlay}
          openLanguageOverlay={this.openLanguageOverlay}
          overlayVisible={this.state.overlayVisible}
        />
        <Title styleName="bold" style={{color: '#fff'}}>
          {Languages[this.props.user.locale].Registration}
        </Title>
        <Subtitle styleName="bold" style={{color: '#fff', marginBottom: 10}}>
          {Languages[this.props.user.locale].Newaccount}
        </Subtitle>
        {!this.state.code ? (
          <View>
            <TextInput
              autoCompleteType="email"
              value={this.state.email}
              onChangeText={text => this.onChangeText('email', text)}
              style={styles.input}
              placeholder={Languages[this.props.user.locale].Email}
            />
            <TextInput
              value={this.state.password}
              style={styles.input}
              onChangeText={text => this.onChangeText('password', text)}
              placeholder={Languages[this.props.user.locale].Password}
              secureTextEntry
            />
          </View>
        ) : (
          <TextInput
            value={this.state.passCode}
            style={styles.input}
            onChangeText={text => {
              this.onChangeText('passCode', text)
            }}
            placeholder={Languages[this.props.user.locale].Code}
            secureTextEntry
          />
        )}
        {!this.state.code ? (
          <View>
            <Button
              style={{
                backgroundColor: '#ff6633',
                borderColor: '#ff6633',
                width: 250,
                height: 50,
                marginBottom: 10,
              }}
              onPress={() => this.startVer()}>
              <Text style={{marginTop: 10, color: '#fff'}}>
                {Languages[this.props.user.locale].Submit}
              </Text>
            </Button>
            <Button
              style={{backgroundColor: 'transparent'}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{marginTop: 10, color: '#fff', textDecorationLine: 'underline'}}>
                {Languages[this.props.user.locale].loginhere}
              </Text>
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
  {
    registration,
    startVerification,
    changeLocale,
  }
)(RegisterScreen)
