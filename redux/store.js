import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage:AsyncStorage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    //middleware: [thunk]

});
const persistor = persistStore(store);


export {store, persistor}