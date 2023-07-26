import axios from "axios"
import { CART_ADD_ITEM,
     CART_REMOVE_ITEM, 
     CART_SAVE_METODO_PAGO, 
     CART_SAVE_SHIPING_ADDRESS 
    } from "../Constants/CartConstants"

//AGREGAR PRODUCTO AL CARRITO
export const addToCart = (id, cantidad) => async (dispatch, getState)=>{
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch ({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            nombre: data.nombre,
            imagenpro:data.imagenpro,
            precio: data.precio,
            stock: data.stock,
            cantidad
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

//ELIMINAR PRODUCTOS DEL CARRITO

export const removefromcart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

//GUARDAR DIRECION DE ENTREGA

export const direccionEnviofromcart = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem("direccionEnvio", JSON.stringify(data))
}

//METODO DE PAGO

export const guardarMetodopago = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_METODO_PAGO,
        payload: data,
    })
    localStorage.setItem("paymentMethod", JSON.stringify(data))
}