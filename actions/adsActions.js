/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {postCallApi, getCallApi} from '../config/ApiCalls'

import {SET_LOADING, ADS_FETCHED, SET_AD} from './type/types'

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