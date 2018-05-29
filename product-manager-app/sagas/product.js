import {
    put,
    takeLatest,
    select,
    throttle,
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product";
import * as detailsActionCreators from "../actionCreators/productDetails";
import * as addProductActionCreators from "../actionCreators/addProduct";
import * as searchProductActionCreators from "../actionCreators/search";
import {
    GET_PRODUCTS, ADD_PRODUCT, GET_PRODUCT_DETAILS, ADD_TO_WISH, SEARCH_PRODUCTS, DELETE_PRODUCT,
} from "../actionTypes/product";
import { takeEvery } from "redux-saga";

let URI = "http://172.16.109.17:4000";

function* getProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(actionCreators.getProductsSuccess(products))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* getProductDetails(action) {
    try {
        let productDetails = yield fetch(`${URI}/products/${action.id}`).then(r => r.json());
        yield put(detailsActionCreators.getProductDetailsSuccess(productDetails))
    } catch (error) {
        yield put(detailsActionCreators.getProductDetailsFailure(error))
    }
}

function* searchProducts(action) {
    try {
        let products = yield fetch(`${URI}/products?q=${action.searchText}&_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        yield put(searchProductActionCreators.getsearchProductsSuccess(products))
    } catch (error) {
        yield put(searchProductActionCreators.getsearchProductsFailure(error))
    }
}

function* deleteProducts(action) {
    try {
        let products = yield fetch(`${URI}/products/${action.id}`, { method: 'DELETE', }).then(r => r.json());
        yield put(actionCreators.deleteProductSuccess(action.selectedIndex))
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}

// function* addToWishList(action) {
//     yield put(actionCreators.addProductToWishList(action.id));
// }

function* addProduct(action) {
    try {
        let product = yield fetch(`${URI}/products`, {
            body: JSON.stringify(action.product),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(r => r.json());
        yield put(addProductActionCreators.addProductSuccess(product))
    } catch (error) {
        yield put(addProductActionCreators.addProductFailure(error))
    }
}

export function* productWatchers() {
    yield [takeLatest(GET_PRODUCTS, getProducts),
    takeLatest(GET_PRODUCT_DETAILS, getProductDetails),
    //takeEvery(ADD_TO_WISH, addToWishList),
    takeEvery(ADD_PRODUCT, addProduct),
    throttle(1000, SEARCH_PRODUCTS, searchProducts),
    takeLatest(DELETE_PRODUCT, deleteProducts),]
}