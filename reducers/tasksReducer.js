/* eslint-disable react/static-property-placement */
import {SET_LOADING_TASKS, GET_TASKS, SET_ERROR, SET_TASK, SET_DRUGS} from '../actions/type/types'

const initialState = {
  tasks: [],
  selected_task: {},
  error: {},
  loading: false,
  drugs: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TASKS:
      return {
        ...state,
        loading: true,
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        error: {},
        loading: false,
      }
    case SET_TASK:
      return {
        ...state,
        selected_task: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case SET_DRUGS:
      return {
        ...state,
        drugs: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
