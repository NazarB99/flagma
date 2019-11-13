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

import Loading from '../components/Loading'
import {registration, startVerification} from '../actions/userActions'

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
  }

  componentDidMount() {
    this.props.navigation.setParams({
      togglePanel: () => this.togglePanel(),
      active: this.state.active,
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
    this.props.registration(data).then(() => this.setState({loading: false}))
  }

  startVer = () => {
    this.setState({loading: true})
    if (this.state.email.length > 5) {
      this.props
        .startVerification(this.state.email)
        .then(() => this.setState({code: true, loading: false}))
    } else {
      alert('E-mail is too short')
    }
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <View style={{flex: 1, backgroundColor: '#2b3d61'}} styleName="vertical h-center v-center">
        <Title styleName="bold" style={{color: '#fff'}}>
          Registration
        </Title>
        <Subtitle styleName="bold" style={{color: '#fff', marginBottom: 10}}>
          Create new account.
        </Subtitle>
        {!this.state.code ? (
          <View>
            <TextInput
              autoCompleteType="email"
              value={this.state.email}
              onChangeText={text => this.onChangeText('email', text)}
              style={styles.input}
              placeholder="E-mail"
            />
            <TextInput
              value={this.state.password}
              style={styles.input}
              onChangeText={text => this.onChangeText('password', text)}
              placeholder="Password"
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
            placeholder="Code"
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
              <Text style={{marginTop: 10, color: '#fff'}}>Submit</Text>
            </Button>
            <Button
              style={{backgroundColor: 'transparent'}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{marginTop: 10, color: '#fff', textDecorationLine: 'underline'}}>
                Or you can login here
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
  }
)(RegisterScreen)
