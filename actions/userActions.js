/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import AsyncStorage from '@react-native-community/async-storage'

import {postCallApi, getCallApi} from '../config/ApiCalls'

import {SET_LOADING, FETCH_USER} from './type/types'

export const login = (email, password) => async dispatch => {
  dispatch({type: SET_LOADING})
  console.log(email, password)
  const response = await getCallApi(`get_account?email=${email}&password=${password}`)
  console.log(response)
  dispatch({type: FETCH_USER, payload: response})

  return new Promise((resolve, reject) => {
    if (response.type === 'error') {
      reject(response.code_ru)
    } else {
      resolve()
    }
  })
}

export const registration = data => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await postCallApi('add_account', '', data)
  console.log(response)

  return new Promise((resolve, reject) => {
    if (response.type === 'error') {
      reject(response.code_ru)
    } else {
      resolve()
    }
  })
}
