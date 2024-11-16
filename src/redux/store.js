import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import detailReducer from '../slice/detailSlice'
import updateReducer from '../slice/updateSlice'
import createReducer from '../slice/newSlice'
import deleteReducer from '../slice/deleteSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    details:detailReducer,
    update:updateReducer,
    create: createReducer,
    delete:deleteReducer
  },
})