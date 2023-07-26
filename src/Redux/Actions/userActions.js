
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants"
import { 
    USER_ACTUALIZAR_FAIL,
    USER_ACTUALIZAR_REQUEST,
    USER_ACTUALIZAR_SUCCESS,
    USER_DETALLE_FAIL,
    USER_DETALLE_REQUEST,
    USER_DETALLE_RESET,
    USER_DETALLE_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS, 
     USER_LOGOUT, 
     USER_REGISTRO_FAIL, 
     USER_REGISTRO_REQUEST,
     USER_REGISTRO_SUCCESS} from "../Constants/UserContants"
import axios from "axios"

//LOGIN
export const login =(email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }

        const { data } = await axios.post(
            `/api/users/login`,
             { email, password },
             config 
             )
             dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

             localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        })
    }
}

// CERRAR SESION

export const cerrarsesion = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETALLE_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    //opcional
    //document.location.href="/login";
}


//REGISTRAR USUARIO
export const registro =(name, email, password) => async (dispatch) =>{
    try {
        dispatch({ type: USER_REGISTRO_REQUEST })
        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }

        const { data } = await axios.post(
            `/api/users`,
             { name, email, password },
             config 
             )
             dispatch({ type: USER_REGISTRO_SUCCESS, payload: data })
             dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

             localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTRO_FAIL,
            payload:
            error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })
    }
}

//DETALLE USUARIO
export const getObtenerperfil =(id) => async (dispatch, getState) =>{
    try {
        dispatch({ type: USER_DETALLE_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
               Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`,config)
             dispatch({ type: USER_DETALLE_SUCCESS, payload: data })
     } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: USER_DETALLE_FAIL,
            payload:message           
        })
    }
}

//ACTUALIZAR PERFIL

export const actualizarPerfil =(user) => async (dispatch,getState) =>{
    try {
        dispatch({ type: USER_ACTUALIZAR_REQUEST})
        const {
            userLogin : { userInfo }, } = getState()
        const config = {
            headers: {
               "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`,user, config)
             dispatch({ type: USER_ACTUALIZAR_SUCCESS, payload: data })
             dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

             localStorage.setItem("userInfo", JSON.stringify(data))
     } catch (error) {
        const message = 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        if ((message === "Token no autorizado, token fallido")) {
            dispatch(cerrarsesion())
        }
        dispatch({
            type: USER_ACTUALIZAR_FAIL,
            payload:message           
        })
    }
}
