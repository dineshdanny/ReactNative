import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    ADD_PRODUCT_TO_WISH,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 8,
    isDeleted: false,
}, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...prevState,
                isLoading: prevState.products.length > 0 ? false : true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case ADD_PRODUCT_TO_WISH: {
            const { products } = prevState;
            const { id } = action;
            return {
                ...prevState,
                products: products.map(product => ({ ...product, wish: product.id === id ? !product.wish : product.wish })),
            }
        }
        case DELETE_PRODUCT:
            return {
                ...prevState,
                isDeleted: false,
                isLoading: true,
            }
        case DELETE_PRODUCT_SUCCESS:
            const { products } = prevState;
            const { index } = action;
            const newProducts = products.slice();
            newProducts.splice(index, 1);
            return {
                ...prevState,
                products: newProducts,
                isDeleted: true,
                isLoading: false,
            }
        case DELETE_PRODUCT_FAILURE:
        case GET_PRODUCTS_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}