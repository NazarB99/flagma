/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {
  SET_LOADING_CHAT,
  GET_CHAT_HISTORY,
  SET_CHAT_ERROR,
  PUSH_MESSAGE,
  UNSET_LOADING_CHAT,
  CLEAR_MESSAGES,
  SET_READ,
  GET_CONVERSATIONS,
  SUBTRACT_COUNT,
} from './type/types'

export const getChatHistory = (token, data) => async dispatch => {
  dispatch({type: SET_LOADING_CHAT})
  const response = await getCallApi(
    `get_chat_history?receiver_id=${data.receiver_id}&page=${data.page}&per_page=${data.per_page}`,
    token
  )
  console.log(response)
  if (response.type === 'error') {
    dispatch({type: SET_CHAT_ERROR, payload: response})
  } else if (response.length > 0) {
    dispatch({type: GET_CHAT_HISTORY, payload: response})
  } else {
    dispatch({type: UNSET_LOADING_CHAT})
  }

  return new Promise((resolve, reject) => {
    if (response.type !== 'error' && response.length > 0) {
      resolve()
    } else {
      reject()
    }
  })
}

export const pushMessage = message => async dispatch => {
  dispatch({type: PUSH_MESSAGE, payload: message})
}

export const clearMessages = () => dispatch => {
  dispatch({type: CLEAR_MESSAGES})
}

export const setMessagesRead = (token, data) => async dispatch => {
  const response = postCallApi('set_messages_read', token, data)
  // alert(JSON.stringify(response))
}

export const getConversations = token => async dispatch => {
  const response = await getCallApi('get_doctors', token)
  console.log('get doctors...')
  console.log(response)

  let counter = 0
  response.map(item => (counter += item.unread_count))
  console.log(counter)

  if (response.length > 0) {
    dispatch({type: GET_CONVERSATIONS, payload: {conversations: response, unread_count: counter}})
  }
}

export const subtractCounter = count => dispatch => {
  dispatch({type: SUBTRACT_COUNT, payload: count})
}

export const messagesRead = data => dispatch => {
  dispatch({type: SET_READ, payload: data})
}
