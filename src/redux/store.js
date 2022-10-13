import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit"
import musicReducer from "./reducers/musicReducer"
import userReducer from'./reducers/userReducer'

const store=configureStore({
  reducer:{
    user:userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;