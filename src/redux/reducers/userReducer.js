import {  createSlice} from '@reduxjs/toolkit'

let initialState = {
  isAuthenticated:false ,

}

const getUsers = createSlice({
  name: "user",
  initialState,
  reducers:{
    getIsAuthenticated(state,action){
      state.isAuthenticated = action.payload;
    },
  }

})

export const userAction = getUsers.actions
export default getUsers.reducer