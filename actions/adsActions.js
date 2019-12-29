/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {
  FETCH_USER,
  SET_LOADING,
  ADS_FETCHED,
  SET_AD,
  GET_CATEGORIES,
  GET_CURRENCIES,
  GET_UNITS,
  GET_ADS_BY_BUSINESS_ID,
  GET_ADS_BY_CATEGORY_ID,
  SET_CATEGORY,
  GET_ADS_BY_SEARCH,
  GET_ADS_BY_FILTER,
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

export const setCategory = cat => async dispatch => {
  dispatch({type: SET_CATEGORY, payload: cat})
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
  console.log(data)
  const response = await postCallApi('add_adv', token, data)
  console.log(response)
  if (response.type !== 'error') {
    dispatch({type: GET_UNITS, payload: response})
  }

  return new Promise((resolve, reject) => {
    if (response.type !== 'error') {
      resolve('ok')
    } else {
      reject(response)
    }
  })
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

export const getAdsByBusiness = (token, data) => async dispatch => {
  console.log(data)
  const response = await getCallApi(
    `get_ads_by_user_id?user_id=${data.id}&page=${data.page}&per_page=${data.per_page}`
  )
  dispatch({type: GET_ADS_BY_BUSINESS_ID, payload: response})
}

export const getAdsByCategory = (token, data) => async dispatch => {
  console.log(data)
  const response = await getCallApi(
    `get_ads_by_category_id?cat_id=${data.id}&page=${data.page}&per_page=${data.per_page}`
  )
  dispatch({type: GET_ADS_BY_CATEGORY_ID, payload: response})
}

export const searchAdvs = data => async dispatch => {
  console.log(data)
  const response = await getCallApi(
    `get_ads_by_search?word=${data.word}&page=${data.page}&per_page=${data.per_page}`
  )
  console.log(response)
  dispatch({type: GET_ADS_BY_SEARCH, payload: response})

  return new Promise((resolve, reject) => {
    if (response.items.length > 0) {
      resolve()
    } else {
      reject()
    }
  })
}

export const setAccountModification = (token, data) => async dispatch => {
  const response = await postCallApi(`modify_account`, token, data)
  console.log(response)
  // dispatch({type: GET_ADS_BY_SEARCH, payload: response})

  return new Promise((resolve, reject) => {
    if (response.id) {
      resolve()
      dispatch({type: FETCH_USER, payload: response})
    } else {
      reject(response)
    }
  })
}

export const filterAds = data => async dispatch => {
  console.log(data)
  const response = await getCallApi(
    `get_ads_by_filter?cat_id=${data.cat_id}&price_min=${data.price_min}&price_max=${data.price_max}&type=${data.type}&unit_id=${data.unit_id}&currency_id=${data.currency_id}&country=${data.country}&page=${data.page}&per_page=${data.per_page}`
  )

  console.log(response)

  dispatch({type: GET_ADS_BY_FILTER, payload: response})
}
