/* eslint-disable no-case-declarations */
/* eslint-disable react/static-property-placement */
import {
  FETCH_USER,
  SET_LOADING,
  GET_PATIENTS,
  SET_ERROR,
  SET_PATIENT,
  STOP_LOADING,
  CLEAR_SCHEDULE,
  GET_SCHEDULE_BY_TEMPLATES,
  CLEAR_TEMPLATES,
  REMOVE_SELECTED,
  SET_LOGS,
  CLEAR_LOGS,
  PUSH_LOG,
  CHANGE_LOCALE,
  USER_LOGOUT,
  UPDATE_COUNT,
  GET_SCHEDULE,
} from '../actions/type/types'

const initialState = {
  user: {},
  locale: 'ru',
  user_id: null,
  patients: [],
  selected_patient: {},
  templates: [],
  schedule: [],
  error: {},
  logs: [],
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
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case CLEAR_TEMPLATES:
      return {
        ...state,
        templates: [],
        loading: false,
      }
    case GET_SCHEDULE_BY_TEMPLATES:
      return {
        ...state,
        templates: state.templates.concat(action.payload),
        loading: false,
      }
    case SET_PATIENT:
      return {
        ...state,
        selected_patient: action.payload,
      }
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        error: {},
        loading: false,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case SET_LOGS:
      return {
        ...state,
        loading: false,
        logs: state.logs.concat(action.payload),
      }
    case REMOVE_SELECTED:
      return {
        ...state,
        selected_patient: {},
      }
    case PUSH_LOG:
      const copyLog = [action.payload]
      return {
        ...state,
        logs: copyLog.concat(state.logs),
      }
    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
      }
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload,
      }
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: state.schedule.concat(action.payload),
        loading: false,
      }
    case CLEAR_SCHEDULE:
      return {
        ...state,
        schedule: [],
        loading: false,
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
        selected_patient: {},
        templates: [],
        error: {},
        logs: [],
        loading: false,
        locale: 'ru',
        patients: [],
      }
    case UPDATE_COUNT:
      const index = state.patients.findIndex(patient => patient.id === action.payload)
      let patient = state.patients.filter(pat => pat.id === action.payload)[0]
      const filteredArray = state.patients.filter(p => p.id !== action.payload)
      if (patient) {
        patient.unread_count += 1
        filteredArray.splice(index, 0, patient)
        // const newArray = filteredArray.join()
        console.log(filteredArray)
        return {
          ...state,
          patients: filteredArray,
        }
      }
      return {
        ...state,
        patients: state.patients,
      }

    default:
      return state
  }
}
