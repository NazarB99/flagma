/* eslint-disable import/prefer-default-export */
import {BASE_URL} from './Constants'

export const getCallApi = async (url, token = '') => {
  console.log(`${BASE_URL}/${url}`)
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const res = await response.json()
  return res
}

export const postCallApi = async (url, token = '', data = {}) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  const res = await response.json()
  return res
}

export const uploadFile = async (token = '', data = {}) => {
  console.log(data)
  const response = await fetch(`${BASE_URL}/upload_images`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
    body: data,
  })
  const res = await response.json()
  return new Promise((resolve, reject) => {
    if (res) {
      console.log(res)
      resolve(res)
    } else {
      console.log(res)
      reject(res)
    }
  })
}
