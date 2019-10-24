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

import {login} from '../actions/userActions'

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
  state = {
    active: false,
    email: '',
    password: '',
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
    this.setState({[key]: value})
  }

  logIn = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#2b3d61'}} styleName="vertical h-center v-center">
        <Title styleName="bold" style={{color: '#fff'}}>
          Login
        </Title>
        <Subtitle styleName="bold" style={{color: '#fff', marginBottom: 10}}>
          Welcome back!
        </Subtitle>
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
        <Button
          style={{
            backgroundColor: '#ff6633',
            borderColor: '#ff6633',
            width: 250,
            height: 50,
            marginBottom: 10,
          }}
          onPress={() => this.logIn()}>
          <Text style={{marginTop: 10, color: '#fff'}}>Submit</Text>
        </Button>
        <Button
          style={{backgroundColor: 'transparent'}}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{marginTop: 10, color: '#fff', textDecorationLine: 'underline'}}>
            Or you can register here
          </Text>
        </Button>
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
  }
)(LoginScreen)
