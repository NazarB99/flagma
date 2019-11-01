/* eslint-disable no-case-declarations */
/* eslint-disable react/static-property-placement */
import {
  ADS_FETCHED,
  SET_LOADING,
  SET_AD,
  GET_CATEGORIES,
  GET_CURRENCIES,
  GET_UNITS,
} from '../actions/type/types'

const initialState = {
  ads: {},
  selected_ad: {},
  loading: false,
  categories: [],
  currencies: [],
  units: [],
  error: {},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADS_FETCHED:
      return {
        ...state,
        ads: action.payload,
        error: {},
        loading: false,
      }
    case SET_AD:
      return {
        ...state,
        selected_ad: action.payload,
        error: {},
        loading: false,
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.items,
      }
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload.items,
      }
    case GET_UNITS:
      return {
        ...state,
        units: action.payload.items,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
