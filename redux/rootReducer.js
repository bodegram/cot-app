import { combineReducers } from "redux";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
   app: appSlice.reducer,
   auth: authSlice.reducer
})

export default rootReducer