import { PRODUCT_COMENTARIO_FAIL, PRODUCT_COMENTARIO_REQUEST, PRODUCT_COMENTARIO_RESET, PRODUCT_COMENTARIO_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";

export const productlistReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
} 

export const productDetailsReducer = (state = { product: {revisiones:[]}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state,loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { ...state,loading: false, error: action.payload }
        default:
            return state;
    }
} 
//comentario
export const productComentarioReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_COMENTARIO_REQUEST:
            return { loading: true }
        case PRODUCT_COMENTARIO_SUCCESS:
            return {loading: false, success:true }
        case PRODUCT_COMENTARIO_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_COMENTARIO_RESET:
            return {}
        default:
            return state;
    }
} 