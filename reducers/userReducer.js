/* eslint-disable no-case-declarations */
/* eslint-disable react/static-property-placement */
import {FETCH_USER, SET_LOADING, LOGOUT} from '../actions/type/types'

const initialState = {
  user: {},
  locale: 'ru',
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        error: {},
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT:
      return {
        ...state,
        user: {},
      }
    default:
      return state
  }
}
