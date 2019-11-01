/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {
  SET_LOADING,
  ADS_FETCHED,
  SET_AD,
  GET_CATEGORIES,
  GET_CURRENCIES,
  GET_UNITS,
} from './type/types'

export const getAdsByCatId = data => async dispatch => {
  const {page, per_page, id} = data
  dispatch({type: SET_LOADING})
  const response = await getCallApi(
    `get_ads_by_category_id?page=${page}&per_page=${per_page}&cat_id=${id}`
  )
  console.log(response)
  dispatch({type: ADS_FETCHED, payload: response.items})

  return new Promise((resolve, reject) => {
    if (response.type === 'error') {
      reject(response.code_ru)
    } else {
      resolve()
    }
  })
}

export const setAd = ad => async dispatch => {
  dispatch({type: SET_AD, payload: ad})
}

export const getCategories = () => async dispatch => {
  const response = await getCallApi(`get_categories`)
  console.log(response)
  if (response.type !== 'error') {
    dispatch({type: GET_CATEGORIES, payload: response})
  }
}

export const getCurrencies = () => async dispatch => {
  const response = await getCallApi(`get_currencies`)
  console.log(response)
  if (response.type !== 'error') {
    dispatch({type: GET_CURRENCIES, payload: response})
  }
}

export const getUnits = () => async dispatch => {
  const response = await getCallApi(`get_units`)
  console.log(response)
  if (response.type !== 'error') {
    dispatch({type: GET_UNITS, payload: response})
  }
}

export const addAdv = (token, data) => async dispatch => {
  const response = await postCallApi('add_adv', token, data)
  if (response.type !== 'error') {
    dispatch({type: GET_UNITS, payload: response})
  }
}

export const uploadImage = (token, data) => async dispatch => {
  console.log(data)
  const response = await postCallApi('upload_images', token, data)
  console.log(response)
  return new Promise((resolve, reject) => {
    if (response.type !== 'error') {
      return resolve(response)
    // eslint-disable-next-line no-else-return
    } else {
      return reject(response.code_en)
    }
  })
}
