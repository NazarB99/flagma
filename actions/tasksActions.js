/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {GET_TASKS, SET_LOADING_TASKS, SET_ERROR, SET_TASK, SET_DRUGS} from './type/types'

export const getTasks = token => async dispatch => {
  dispatch({type: SET_LOADING_TASKS})
  const response = await getCallApi('get_tasks', token)
  if (response.type === 'error') {
    dispatch({type: SET_ERROR, payload: response})
  } else {
    dispatch({type: GET_TASKS, payload: response})
  }
}

export const setTask = task => async dispatch => {
  dispatch({type: SET_TASK, payload: task})
}

export const addTask = (data, token) => async dispatch => {
  const response = await postCallApi('add_task', token, data)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const modifyTask = (data, token) => async dispatch => {
  const response = await postCallApi('modify_task', token, data)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const generateTask = (data, token) => async dispatch => {
  console.log('Token')
  console.log(token)
  const response = await postCallApi('generate_schedule_by_task', token, data)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const taskDelete = (token, data) => async dispatch => {
  const response = await postCallApi('remove_tasks', token, data)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const getDrugs = token => async dispatch => {
  const response = await getCallApi('get_medicaments', token)

  return new Promise((resolve, reject) => {
    if (response.type === 'error') {
      reject(response)
    } else {
      dispatch({type: SET_DRUGS, payload: response})
    }
  })
}
