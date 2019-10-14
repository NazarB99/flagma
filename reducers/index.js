import userReducer from './userReducer'
import tasksReducer from './tasksReducer'
import chatReducer from './chatReducer'
import templateReducer from './templateReducer'

export default {
  user: userReducer,
  tasks: tasksReducer,
  templates: templateReducer,
  chat: chatReducer,
}
