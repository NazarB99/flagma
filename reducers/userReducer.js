/* eslint-disable no-case-declarations */
/* eslint-disable react/static-property-placement */
import {FETCH_USER, SET_LOADING, LOGOUT, CHANGE_LANG, OVERLAY_VISIBLE} from '../actions/type/types'

const initialState = {
  user: {},
  locale: 'ru',
  loading: false,
  overlayVisible: false,
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
    case CHANGE_LANG:
      return {
        ...state,
        locale: action.payload,
      }
    case OVERLAY_VISIBLE:
      return {
        ...state,
        overlayVisible: !state.overlayVisible,
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
