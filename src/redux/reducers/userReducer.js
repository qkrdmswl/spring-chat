import {  createSlice} from '@reduxjs/toolkit'

let initialState = {
  isAuthenticated:false ,
  pk:0,
}

const getUsers = createSlice({
  name: "user",
  initialState,
  reducers:{
    getIsAuthenticated(state=initialState,action){
      state.isAuthenticated = action.payload;
    },
    getPk(state=initialState,action){
      state.pk=action;
      console.log(action.payload )
    }
  }

})

export const userAction = getUsers.actions
export default getUsers.reducer