import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    ADD_TO_WISH,
    ADD_PRODUCT_TO_WISH,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from "../actionTypes/product";

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function getProductsSuccess(products) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function deleteProduct(id, selectedIndex) {
    return {
        type: DELETE_PRODUCT,
        id,
        selectedIndex,
    }
}

export function deleteProductSuccess(index) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        index,
    }
}

export function deleteProductFailure() {
    return {
        type: DELETE_PRODUCT_FAILURE,
    }
}

// export function addToWishList(products, id) {
//     return {
//         type: ADD_TO_WISH,
//         id,
//         products,
//     }
// }
//addProductToWishList

export function addToWishList(id) {
    return {
        type: ADD_PRODUCT_TO_WISH,
        id,
    }
}
