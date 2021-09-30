import { configureStore } from '@reduxjs/toolkit';
import fieldGameReducer from '../components/FieldGame/fieldGameSlice';
// import statusReducer from '../components/Status/statusSlice';
// import authorizationReducer from "../components/Authorization/authorizationSlice"


    // status: statusReducer,
    // authorization: authorizationReducer,
export const store = configureStore({
  reducer: {
    fieldGame: fieldGameReducer,
  }
});
