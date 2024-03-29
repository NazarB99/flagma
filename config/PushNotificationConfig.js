/* eslint-disable block-scoped-var */
/* eslint-disable class-methods-use-this */
import {Platform} from 'react-native'
import ConnectyCube from 'connectycube-reactnative'
import DeviceInfo from 'react-native-device-info'

// TODO: to disable fo iOS
// import PushNotification from 'react-native-push-notification'
import appConfig from '../app.json'

// TODO: use import from 'react-native-push-notification' for both OS
// if (Platform.OS === 'android') {
var PushNotification = require('react-native-push-notification')
// }

export default class PushNotificationService {
  constructor(onNotification) {
    console.log('push initiated')
    this.init(onNotification)
  }

  init(onNotification) {
    if (Platform.OS === 'ios') return
    console.log(PushNotification)
    setTimeout(() => {
      console.log('timeout')
      PushNotification.configure({
        onRegister: function(token) {
          console.log('TOKEN:', token)
        },
        onNotification,
        senderID: appConfig.senderID,
      })
    }, 2000)
  }

  subscribe(register) {
    console.log('push subscribed')
    const params = {
      notification_channels: Platform.OS === 'ios' ? 'apns' : 'gcm',
      device: {
        platform: Platform.OS,
        udid: DeviceInfo.getUniqueID(),
      },
      push_token: {
        environment: 'development',
        client_identification_sequence: register.token,
      },
    }

    ConnectyCube.pushnotifications.subscriptions.create(params, (error, response) => {
      console.log('PUSH ERR' + JSON.stringify(error))
    })
  }
}
