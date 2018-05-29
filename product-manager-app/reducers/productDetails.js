import {
    GET_PRODUCT_DETAILS,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_FAILURE
} from "../actionTypes/product";

const initialState = {
    productDetails: {},
};
export default (prevState = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAILS:
            return {
                ...prevState,
                isLoading: true
            }
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                productDetails: action.productDetails
            }
        case GET_PRODUCT_DETAILS_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}