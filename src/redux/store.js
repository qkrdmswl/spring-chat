import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit"
import musicReducer from "./reducers/musicReducer"

const store=configureStore({
  reducer:{
    music:musicReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;