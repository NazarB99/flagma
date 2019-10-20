/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
import React from 'react'
import {Dimensions} from 'react-native'
import {NavigationBar, TextInput, Button, Image} from '@shoutem/ui'
import Hamburger from 'react-native-animated-hamburger'

let parent = {}
let isDrawerOpen = {}

const Navbar = props => {
  parent = props.navigation.dangerouslyGetParent()
  isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen
  return (
    <NavigationBar
      style={{container: {backgroundColor: '#2b3d61'}}}
      styleName="inline"
      leftComponent={
        <Hamburger
          type="cross"
          active={isDrawerOpen}
          color="white"
          onPress={() => props.navigation.openDrawer()}
          underlayColor="transparent"
        />
      }
      centerComponent={
        <TextInput
          placeholder="Search Flagma"
          style={{
            backgroundColor: '#f5f5f5',
            width: Dimensions.get('window').width * 0.75,
            height: 40,
            padding: 5,
            borderRadius: 5,
          }}
        />
      }
      rightComponent={
        <Button>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/united-kingdom.png')}
          />
        </Button>
      }
    />
  )
}

export default Navbar
