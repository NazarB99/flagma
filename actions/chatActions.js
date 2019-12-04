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
  ADD_TO_COUNT,
  SET_UNREAD_COUNT,
  CLEAR_UNREAD_COUNTER,
  SUBTRACT_COUNT,
} from './type/types'

export const getChatHistory = (token, data) => async dispatch => {
  console.log(data)
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

export const subtractCounter = count => dispatch => {
  dispatch({type: SUBTRACT_COUNT, payload: count})
}

export const addToCount = () => dispatch =>{
  dispatch({type: ADD_TO_COUNT})
}

export const setUnreadCount = num => dispatch =>{
  dispatch({type: SET_UNREAD_COUNT, payload: num})
}

export const clearUnreadCounter = () => dispatch => {
  dispatch({type: CLEAR_UNREAD_COUNTER})
}

export const messagesRead = data => dispatch => {
  dispatch({type: SET_READ, payload: data})
}
