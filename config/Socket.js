/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import socketIO from 'socket.io-client/dist/socket.io'

export const init = () => {
  this.socket = socketIO('http://flagma.tk:3000', {
    transports: ['websocket'],
    jsonp: false,
  })
}

export const connectSocket = id => {
  this.socket.connect()
  this.socket.on('connect', () => {
    console.log('connected to socket server')
  })
  this.socket.emit('user_joined', id)
}

export const sendMessage = (data, pushMessage) => {
  pushMessage(data)
  this.socket.emit('message', data)
}

export const messageListener = (pushMessage, users) => {
  this.socket.on('message', message => {
    console.log('Message listenerrrrrtrrrrrrrrrrrrrrrrr')
    if (
      (message.receiver_id === users.receiver_id && message.sender_id === users.sender_id) ||
      (message.sender_id === users.receiver_id && message.receiver_id === users.sender_id)
    ) {
      pushMessage(message)
    }
  })
}

export const joinMe = id => {
  this.socket.on('join_me', () => {
    this.socket.emit('user_joined', id)
  })
}

export const messageRead = messagesRead => {
  this.socket.on('message_read', data => {
    messagesRead(data)
  })
}

export const messageAddOneCount = addToCount => {
  this.socket.on('count_message', () => {
    addToCount()
  })
}

export const setUnreadCountSocket = setUnreadCount => {
  this.socket.on('send_unread_count', count => {
    setUnreadCount(count)
  })
}

export const getUnreadCount = user_id => {
  this.socket.emit('send_me_unread_count', user_id)
}

export const clearSubscriptions = () => {
  this.socket.removeAllListeners()
}
