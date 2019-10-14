/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import AsyncStorage from '@react-native-community/async-storage'

import {postCallApi, getCallApi} from '../config/ApiCalls'

import {
  FETCH_USER,
  SET_LOADING,
  GET_PATIENTS,
  SET_ERROR,
  SET_PATIENT,
  STOP_LOADING,
  GET_SCHEDULE_BY_TEMPLATES,
  CLEAR_TEMPLATES,
  REMOVE_SELECTED,
  SET_LOGS,
  CLEAR_LOGS,
  PUSH_LOG,
  CHANGE_LOCALE,
  USER_LOGOUT,
  UPDATE_COUNT,
  CLEAR_SCHEDULE,
  GET_SCHEDULE,
} from './type/types'

export const login = (username, password) => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await getCallApi(`get_user?login=${username}&password=${password}`)
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

export const getPatients = token => async dispatch => {
  dispatch({type: SET_LOADING})
  dispatch({type: CLEAR_LOGS})
  const patients = await getCallApi('get_users', token)
  if (patients.type === 'error') {
    dispatch({type: SET_ERROR, payload: patients})
  } else {
    dispatch({type: GET_PATIENTS, payload: patients})
  }

  return new Promise((resolve, reject) => {
    if (patients.type === 'error') {
      reject()
    } else {
      resolve()
    }
  })
}

export const setPatient = patient => async dispatch => {
  dispatch({type: SET_PATIENT, payload: patient})
}

export const addPatient = (data, token) => async dispatch => {
  console.log('DATATATATATATATTA')
  console.log(data)
  dispatch({type: SET_LOADING})
  const user = await postCallApi('add_user', token, data)
  console.log(user)
  return new Promise((resolve, reject) => {
    if (user.role === 'patient') {
      resolve(user)
    } else {
      reject(user)
    }
    dispatch({type: STOP_LOADING})
  })
}

export const markAsDone = (task_id, user_id, token) => async dispatch => {
  console.log('DONE')
  console.log(task_id)
  dispatch({type: SET_LOADING})
  const response = await postCallApi('/set_schedule_task_done', token, {
    task_id,
    user_id,
  })
  console.log(response)
}

export const modifyPatient = (data, token) => async dispatch => {
  const response = await postCallApi('modify_user', token, data)

  console.log(response, token)

  return new Promise((resolve, reject) => {
    if (response.role === 'patient') {
      resolve(response)
    } else {
      reject(response)
    }
  })
}

export const getScheduleByTemplate = (token, data) => async dispatch => {
  console.log('scheduletemppppppppppp')
  dispatch({type: SET_LOADING})
  if (data.first) {
    dispatch({type: CLEAR_TEMPLATES})
  }
  const response = await getCallApi(
    `get_schedule_by_template?patient_id=${data.patient_id}&template_id=${data.template_id}&page=${data.page}&per_page=${data.per_page}`,
    token
  )
  console.log(response)
  if (response.length > 0) {
    dispatch({type: GET_SCHEDULE_BY_TEMPLATES, payload: response})
  } else {
    dispatch({type: STOP_LOADING})
  }

  return new Promise((resolve, reject) => {
    if (response.length > 0) {
      resolve()
    } else {
      reject(response)
    }
  })
}

export const getLogs = (token, data, reload) => async dispatch => {
  if (reload) {
    console.log('CLEAR LOGS')
    dispatch({type: CLEAR_LOGS})
  }
  const response = await getCallApi(`get_logs?page=${data.page}&per_page=${data.per_page}`, token)
  if (response.length > 0) {
    dispatch({type: SET_LOGS, payload: response})
  }

  return new Promise((resolve, reject) => {
    if (response.length > 0) {
      resolve()
    } else {
      reject()
    }
  })
}

export const pushLog = log => dispatch => {
  dispatch({type: PUSH_LOG, payload: log})
}

export const removeSelected = () => dispatch => {
  dispatch({type: REMOVE_SELECTED})
}

export const changeLocale = loc => dispatch => {
  dispatch({type: CHANGE_LOCALE, payload: loc})
}

export const userLogout = () => async dispatch => {
  await AsyncStorage.removeItem('identifier')
  dispatch({type: USER_LOGOUT})
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export const getUsersSchedule = (id, token, data) => async dispatch => {
  if (data.load) {
    dispatch({type: SET_LOADING})
  }
  if (data.clear) {
    dispatch({type: CLEAR_SCHEDULE})
  }
  console.log('PAGEPER_PAGE')
  console.log(data)
  const response = await getCallApi(
    `get_schedule?page=${data.page}&per_page=${data.per_page}&user_id=${id}`,
    token
  )
  console.log(response)

  if (response.length > 0) {
    dispatch({type: GET_SCHEDULE, payload: response})
  }

  return new Promise((resolve, reject) => {
    if (response.length > 0) {
      resolve()
    } else {
      reject(response)
    }
  })
}

export const getPatientById = (token, id) => async dispatch => {
  const response = await getCallApi(`get_patient_by_id?user_id=${id}`, token)
  console.log(response)
  dispatch({type: SET_PATIENT, payload: response})
}

export const clearPatientTemplates = () => async dispatch => {
  dispatch({type: CLEAR_TEMPLATES})
}

export const updateCountUser = id => dispatch => {
  dispatch({type: UPDATE_COUNT, payload: id})
}
