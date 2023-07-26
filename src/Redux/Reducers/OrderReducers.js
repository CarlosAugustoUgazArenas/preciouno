import { ORDER_CREAR_FAIL, 
    ORDER_CREAR_REQUEST, 
    ORDER_CREAR_RESET, 
    ORDER_CREAR_SUCCESS,
    ORDER_DETALLE_FAIL,
    ORDER_DETALLE_REQUEST,
    ORDER_DETALLE_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAGO_FAIL,
    ORDER_PAGO_REQUEST,
    ORDER_PAGO_RESET,
    ORDER_PAGO_SUCCESS
 } from "../Constants/OrderConstants"


//CREAR ORDER
export const orderCrearReducer = (
    state = { }, action) => {
    switch (action.type) {
        case ORDER_CREAR_REQUEST:
            return {loading: true }
        case ORDER_CREAR_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREAR_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_CREAR_RESET:
            return {}
        default:
            return state;
    }
} 
// direccionEnvio, 
//                 paymentMethod, 
//                 itemsPrice, 
//                 taxPrice, 
//                 shippingPrice,
//                 totalPrice

//DETALLE ORDER
export const orderDetalleReducer = (
    state = {loading: true, 
        orderItems: [],
        direccionEnvio:{}  }, 
        action) => {
    switch (action.type) {
        case ORDER_DETALLE_REQUEST:
            return {...state, loading: true }
        case ORDER_DETALLE_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETALLE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
} 

// ORDER PAGO
export const orderPagoReducer = (
    state = { }, 
        action) => {
    switch (action.type) {
        case ORDER_PAGO_REQUEST:
            return {loading: true }
        case ORDER_PAGO_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAGO_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAGO_RESET:
            return {}
        default:
            return state;
    }
} 

// USER ORDERS 
export const orderListMyReducer = (
    state = { orders:[]}, 
        action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {loading: true }
        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders:action.payload}
        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_LIST_MY_RESET:
            return {orders:[]}
        default:
            return state;
    }
} 


