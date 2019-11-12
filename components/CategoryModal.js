/* eslint-disable camelcase */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, {useState} from 'react'
import {View, Dimensions, StyleSheet} from 'react-native'
import {Overlay} from 'react-native-elements'
import {Text, Title, Heading, Button} from '@shoutem/ui'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NestedListView, {NestedRow} from 'react-native-nested-listview'

import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

const styles = StyleSheet.create({
  row: {
    borderColor: '#000',
    borderWidth: 0.8,
  },
})

const getChildrenName = node => {
  if (node.name === 'Item level 1.2.2') {
    return 'children'
  }

  return 'descendants'
}

const CategoryModal = props => {
  const [parent_id, setParentId] = useState(1)
  console.log(parent_id)
  return (
    <Overlay height="auto" width="auto" isVisible={props.isVisible}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 5,
          zIndex: 1000,
        }}>
        <Button
          onPress={() => props.closeModal()}
          style={{
            backgroundColor: ORANGE_COLOR,
            width: 40,
            height: 40,
            borderRadius: 20,
            padding: 0,
            paddingLeft: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            style={{alignSelf: 'center', textAlign: 'center'}}
            name="times"
            size={24}
            color={MAIN_COLOR}
          />
        </Button>
      </View>
      <View
        style={{
          width: Dimensions.get('window').width * 0.95,
          height: Dimensions.get('window').height * 0.95,
          borderColor: '#999999',
          borderWidth: 0.7,
          borderRadius: 3,
          backgroundColor: '#f8f9fc',
          alignItems: 'center',
          position: 'relative',
          //   justifyContent: 'center',
        }}>
        {parent_id !== 1 ? (
          <View style={{position: 'absolute', top: 5, left: 5}}>
            <Button
              onPress={() => setParentId(1)}
              style={{padding: 0, backgroundColor: 'transparent'}}>
              <Icon
                style={{justifyContent: 'flex-end'}}
                name="chevron-left"
                size={24}
                color="#000"
              />
            </Button>
          </View>
        ) : null}
        <Title style={{marginTop: 20}}>Select category</Title>
        {props.categories.map(item =>
          item.id !== parent_id && item.parent_id === parent_id && item.id !== 1 ? (
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#000',
                borderBottomWidth: 0.7,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                // marginTop: 10,
                width: '100%',
                alignItems: 'center',
                // justifyContent: 'center',
              }}>
              <Button
                onPress={() => props.setCategory(item)}
                style={{
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                }}>
                <Text style={{fontSize: 20, color: '#0670ec', margin: 0}}>{item.title_en}</Text>
              </Button>
              <Button
                onPress={() => setParentId(item.id)}
                style={{
                  position: 'absolute',
                  right: 10,
                  padding: 10,
                  backgroundColor: '#f7f8fb',
                }}>
                <Icon name="chevron-right" size={22} color="#9ea8b8" />
              </Button>
            </View>
          ) : null
        )}
      </View>
    </Overlay>
  )
}

export default CategoryModal
