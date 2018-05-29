import {
    SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_FAILURE,
    ADD_SEARCH_PRODUCT_TO_WISH,
} from "../actionTypes/product";


export function searchProducts(searchText, page, limit, isReset) {
    return {
        type: SEARCH_PRODUCTS,
        searchText,
        page,
        limit,
        isReset,
    }
}

export function getsearchProductsSuccess(products) {
    return {
        type: GET_SEARCH_PRODUCTS_SUCCESS,
        products,
    }
}

export function getsearchProductsFailure(error) {
    return {
        type: GET_SEARCH_PRODUCTS_FAILURE,
        error
    }
}

export function addSearchProductToWishList(id) {
    return {
        type: ADD_SEARCH_PRODUCT_TO_WISH,
        id,
    }
}