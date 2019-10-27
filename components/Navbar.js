/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
import React, {useState} from 'react'
import {Dimensions} from 'react-native'
import {NavigationBar, TextInput, Button, Image} from '@shoutem/ui'
import Hamburger from 'react-native-animated-hamburger'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Navbar = props => {
  const [isDrawerOpen, setDrawerStatus] = useState(false)
  console.log(props.routeName)
  return (
    <NavigationBar
      style={{container: {backgroundColor: '#2b3d61'}}}
      styleName="inline"
      leftComponent={
        props.routeName === 'Main' ? (
          <Hamburger
            type="cross"
            active={isDrawerOpen}
            color="white"
            onPress={() => {
              if (!isDrawerOpen) {
                props.openDrawer()
                setDrawerStatus(true)
              } else {
                props.closeDrawer()
                setDrawerStatus(false)
              }
            }}
            underlayColor="transparent"
          />
        ) : (
          <Button onPress={() => props.navigate('Main')}>
            <Icon size={26} color="white" name="arrow-left" />
          </Button>
        )
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
