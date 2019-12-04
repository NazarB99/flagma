/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
import React, {Component} from 'react'
import {StyleSheet, View, Text, Dimensions, PermissionsAndroid} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import {MAIN_COLOR, ORANGE_COLOR} from '../config/Constants'

const fullWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  positionToLeft: {
    justifyContent: 'flex-start',
  },
  positionToRight: {
    justifyContent: 'flex-end',
  },
  message: {
    paddingTop: 5,
    paddingBottom: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  messageToLeft: {
    maxWidth: fullWidth - 90,
    borderBottomLeftRadius: 2,
    backgroundColor: MAIN_COLOR,
  },
  messageToRight: {
    maxWidth: fullWidth - 55,
    borderBottomRightRadius: 2,
    backgroundColor: ORANGE_COLOR,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  selfToLeft: {
    alignSelf: 'flex-start',
    color: 'white',
  },
  selfToRight: {
    alignSelf: 'flex-end',
    color: 'black',
  },
  dateSent: {
    alignSelf: 'flex-end',
    paddingTop: 1,
    flexDirection: 'row',
  },
  dateSentText: {
    fontSize: 12,
  },
})

export default class Message extends Component {
  state = {
    delivered: false,
    read: false,
    imageHeight: 300,
    imageWidth: 200,
    downloading: false,
    downloadingPercent: '',
    audioPlaying: false,
  }

  componentDidMount() {
    if (!this.props.message.is_read && this.props.otherSender) {
      this.props.setMessagesRead()
    }
  }

  requestCameraPermission = async link => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'StopTubDoc запрашивает разрешение',
          message: 'Чтобы сохранять файлы нужно разрешение на запись',
          buttonNeutral: 'Спросить позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.downloadFile(link)
      } else {
        alert(
          'Файлы не будут сохраняться из-за того, что вы не разрешили запись файлов на ваш телефон'
        )
      }
    } catch (err) {
      console.warn(err)
    }
  }

  getTime(dateSent) {
    return moment(dateSent)
      .format('DD.MM HH:mm')
      .toString()
  }

  getStatusIcon = () => {
    const {otherSender} = this.props
    if (this.state.delivered) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={10} />
          <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={10} />
        </View>
      )
    }
    if (this.state.read) {
      return (
        <Icon
          color={otherSender ? 'white' : 'black'}
          name="ios-checkmark-circle-outline"
          size={10}
        />
      )
    }
    return !otherSender ? (
      <Icon color={otherSender ? 'white' : 'black'} name="ios-checkmark" size={10} />
    ) : null
  }

  render() {
    const {message, otherSender} = this.props
    return (
      <View
        style={[styles.container, otherSender ? styles.positionToLeft : styles.positionToRight]}>
        <View style={[styles.message, otherSender ? styles.messageToLeft : styles.messageToRight]}>
          {message.is_attachment ? (
            this.renderAttachment(message.message, message.attachment_type)
          ) : (
            <Text
              style={[styles.messageText, otherSender ? styles.selfToLeft : styles.selfToRight]}>
              {message.message || ' '}
            </Text>
          )}

          <View style={styles.dateSent}>
            <Text style={[styles.dateSentText, otherSender ? {color: 'white'} : {color: 'black'}]}>
              {this.getTime(message.sent_date)}
            </Text>
            {message.sent_date && !message.is_read ? (
              <View style={{flexDirection: 'row'}}>
                <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={12} />
                <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={12} />
              </View>
            ) : null}
            {message.is_read && message.sent_date ? (
              <Icon
                color={otherSender ? 'white' : 'black'}
                name="ios-checkmark-circle-outline"
                size={12}
              />
            ) : null}
            {!message.sent_date ? (
              <Icon color={otherSender ? 'white' : 'black'} name="ios-checkmark" size={12} />
            ) : null}
          </View>
        </View>
      </View>
    )
  }
}