import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    isAppReady: false
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
      setAppReady: (state)=>{
        state.isAppReady = true
      }
    }
})

export const {setAppReady} = appSlice.actions
export default appSlice