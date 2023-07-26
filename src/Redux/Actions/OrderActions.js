//CREAR ORDER

import axios from "axios"
import { ORDER_CREAR_FAIL, ORDER_CREAR_REQUEST, ORDER_CREAR_SUCCESS, ORDER_DETALLE_FAIL, ORDER_DETALLE_REQUEST, ORDER_DETALLE_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAGO_FAIL, ORDER_PAGO_REQUEST, ORDER_PAGO_SUCCESS } 
from "../Constants/OrderConstants"
import { CART_LIMPIAR_ITEM } from "../Constants/CartConstants"
import { cerrarsesion } from "./userActions"

//CREAR ORDEN
export const crearOrder =(order) => async (dispatch,getState) =>{
    try {
        dispatch({ type: ORDER_CREAR_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
               "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`,order, config)
             dispatch({ type: ORDER_CREAR_SUCCESS, payload: data })
             dispatch({ type: CART_LIMPIAR_ITEM, payload: data })

             localStorage.removeItem("cartItems")
     } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: ORDER_CREAR_FAIL,
            payload:message           
        })
    }
}

// DETALLE ORDER
export const getDetalleOrder =(id) => async (dispatch,getState) =>{
    try {
        dispatch({ type: ORDER_DETALLE_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
                  Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)
             dispatch({ type: ORDER_DETALLE_SUCCESS, payload: data })
    } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: ORDER_DETALLE_FAIL,
            payload:message           
        })
    }
}


//ORDEN PAGO
export const OrderPago =(orderId, paymentResult) => async (dispatch,getState) =>{
    try {
        dispatch({ type: ORDER_PAGO_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
               "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config)
             dispatch({ type: ORDER_PAGO_SUCCESS, payload: data })
            
     } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: ORDER_PAGO_FAIL,
            payload:message           
        })
    }
}


//ORDEN LIST MY
export const ListMyOrders =(orderId, paymentResult) => async (dispatch,getState) =>{
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
               Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/`, config)
             dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
            
     } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:message           
        })
    }
}