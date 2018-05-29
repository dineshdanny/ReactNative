import {
    combineReducers
} from "redux";
import productReducer from "./product";
import detailsReducer from "./productDetails";
import addProductReducer from "./addProduct";
import search from "./search";
import storeReducer from "./store"
import {
    createNavigationReducer
} from "react-navigation-redux-helpers";
import {AppNavigator} from "../containers/AppNavigator";


const navReducer = createNavigationReducer(AppNavigator);

const rootReducer = combineReducers({
    productState: productReducer,
    detailsState: detailsReducer,
    addProductState: addProductReducer,
    searchState: search,
    storeState: storeReducer,
    navState: navReducer
})

export default rootReducer;