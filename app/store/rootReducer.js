import { combineReducers } from "redux";
import registerReducer from "./slice/register";
import authReducer from "./slice/authSlice";
import popupReducer from "./slice/popupSlice";
import bannerReducer from "./slice/bannerSlice";
import parentcategoryReducer from "./slice/parentCategorySlice";
import adBannerReducer from "./slice/adBanner";
import offerReducer from "./slice/offerSlice";
import productReducer from "./slice/productsSlice";
import subCategoryReducer from "./slice/subCategorySlice";
const reducer = combineReducers({
  register: registerReducer,
  auth: authReducer,
  popup: popupReducer,
  banner: bannerReducer,
  parentcategory: parentcategoryReducer,
  adBanner: adBannerReducer,
  offers: offerReducer,
  products: productReducer,
  subCategory: subCategoryReducer,
});
export default reducer;
