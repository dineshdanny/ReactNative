import {
    SEARCH_PRODUCTS,
    GET_SEARCH_PRODUCTS_SUCCESS,
    GET_SEARCH_PRODUCTS_FAILURE,
    ADD_SEARCH_PRODUCT_TO_WISH,
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    isLoading: false,
    page: 1,
    limit: 8
}, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            const { page } = action;
            return {
                ...prevState,
                isLoading: page === 1,
                page,
            }
        case GET_SEARCH_PRODUCTS_SUCCESS: {
            const { page } = prevState;
            const products = page === 1 ? action.products : prevState.products.concat(action.products);
            return {
                ...prevState,
                isLoading: false,
                products,
            }
        }
        case ADD_SEARCH_PRODUCT_TO_WISH: {
            const { products } = prevState;
            const { id } = action;
            return {
                ...prevState,
                products: products.map(product => ({ ...product, wish: product.id === id ? !product.wish : product.wish })),
            }
        }
        case GET_SEARCH_PRODUCTS_FAILURE:
            return {
                ...prevState,
                isLoading: false,
                error,
            }
        default:
            return prevState;

    }
}