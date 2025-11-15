import { combineReducers } from "redux";
import registerReducer from "./slice/register";
import authReducer from "./slice/authSlice";
const reducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
});
export default reducer;
