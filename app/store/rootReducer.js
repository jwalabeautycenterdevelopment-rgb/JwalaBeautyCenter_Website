import { combineReducers } from "redux";
import registerReducer from "./slice/register";
import authReducer from "./slice/authSlice";
import popupReducer from "./slice/popupSlice";
const reducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  popup: popupReducer,
});
export default reducer;
