/* eslint-disable consistent-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import {Text, Easing, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Screen, Title, Subtitle, TextInput, View, NavigationBar} from '@shoutem/ui'
import Hamburger from 'react-native-animated-hamburger'

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
})

class LoginScreen extends React.Component {
  state = {
    active: false,
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

  render() {
    const parent = this.props.navigation.dangerouslyGetParent()
    const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen
    return (
      <View style={{flex: 1}} styleName="vertical h-center v-center">
        <NavigationBar
          leftComponent={
            <Hamburger
              type="cross"
              active={isDrawerOpen}
              onPress={() => this.props.navigation.openDrawer()}
              underlayColor="transparent"
            />
            // <Button onPress={() => alert('')}>
            //   <Icon name="sidebar" />
            // </Button>
          }
          centerComponent={<Title>FLAGMA</Title>}
        />
        <Title>Login</Title>
        <Subtitle>Welcome back!</Subtitle>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" secureTextEntry />
      </View>
    )
  }
}

export default LoginScreen
