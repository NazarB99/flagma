/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {GET_TEMPLATES, SET_LOADING_TEMPLATES, SET_ERROR, SET_TEMPLATE} from './type/types'

export const getTemplates = token => async dispatch => {
  dispatch({type: SET_LOADING_TEMPLATES})
  const response = await getCallApi('get_templates', token)
  if (response.type === 'error') {
    dispatch({type: SET_ERROR, payload: response})
  } else {
    dispatch({type: GET_TEMPLATES, payload: response})
  }
}

export const setTemplate = template => async dispatch => {
  console.log('selected')
  console.log(template)
  dispatch({type: SET_TEMPLATE, payload: template})
  return new Promise((resolve, reject) => {
    if (template) {
      resolve('ok')
    } else {
      reject('error')
    }
  })
}

export const addTemplate = (data, token) => async dispatch => {
  const response = await postCallApi('add_template', token, data)
  console.log('Resuilt')
  console.log(response)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const modifyTemplate = (data, token) => async dispatch => {
  const response = await postCallApi('modify_template', token, data)
  console.log('Resuilt')
  console.log(response)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const generateSchedule = (token, data) => async dispatch => {
  console.log(token)
  console.log(data)
  const response = await postCallApi('generate_schedule', token, data)
  console.log(response)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const archiveSchedule = (token, data) => async dispatch => {
  const response = await postCallApi('archive_schedule', token, data)
  console.log(response)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}

export const templateDelete = (token, data) => async dispatch => {
  const response = await postCallApi('remove_templates', token, data)
  return new Promise((resolve, reject) => {
    console.log(response)
    if (response.type === 'error') {
      reject(response)
    } else {
      resolve(response)
    }
  })
}
