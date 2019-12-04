/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable react/static-property-placement */
import {
  SET_CURRENT_DIALOG,
  GET_CHAT_HISTORY,
  SET_LOADING_CHAT,
  SET_CHAT_ERROR,
  PUSH_MESSAGE,
  UNSET_LOADING_CHAT,
  CLEAR_MESSAGES,
  SET_READ,
  SUBTRACT_COUNT,
  ADD_TO_COUNT,
  SET_UNREAD_COUNT,
  CLEAR_UNREAD_COUNTER,
} from '../actions/type/types'

const initialState = {
  history: [],
  selected_dialog: {},
  error: {},
  conversations: [],
  unread_counter: 0,
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT_HISTORY:
      return {
        ...state,
        history: state.history.concat(action.payload),
        loading: false,
      }
    case SET_LOADING_CHAT:
      return {
        ...state,
        loading: true,
      }
    case UNSET_LOADING_CHAT:
      return {
        ...state,
        loading: false,
      }
    case SET_CURRENT_DIALOG:
      return {
        ...state,
        selected_dialog: action.payload,
      }
    case ADD_TO_COUNT:
      return {
        ...state,
        unread_counter: state.unread_counter + 1,
      }
    case CLEAR_UNREAD_COUNTER:
      return {
        ...state,
        unread_counter: 0,
      }
    case SET_UNREAD_COUNT:
      return {
        ...state,
        unread_counter: action.payload,
      }
    case SET_CHAT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        history: [],
      }
    case PUSH_MESSAGE:
      if (
        state.history.length !== 0 &&
        state.history[0] &&
        state.history[0].temp_id !== undefined &&
        +action.payload.temp_id === +state.history[0].temp_id
      ) {
        state.history.shift()
      }
      const newMessage = [action.payload]
      return {
        ...state,
        history: newMessage.concat(state.history),
        unread_counter: state.unread_counter + 1,
      }
    case SUBTRACT_COUNT:
      return {
        ...state,
        unread_count: state.unread_counter - action.payload,
      }
    case SET_READ:
      for (let i = 0; i < state.history.length; i++) {
        console.log(
          state.history[i].room_id,
          action.payload.room_id,
          state.history[i].receiver_id,
          action.payload.opponent_id
        )
        if (
          state.history[i].room_id == action.payload.room_id &&
          state.history[i].receiver_id === action.payload.opponent_id
        ) {
          console.log(state.history[i])
          state.history[i].is_read = true
        }
      }
      console.log(state.history)
      const newHistory = state.history
      state.history = []
      return {
        ...state,
        history: newHistory.concat(state.history),
      }
    default:
      return state
  }
}
