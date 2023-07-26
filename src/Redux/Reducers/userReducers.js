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
    USER_REGISTRO_SUCCESS } from "../Constants/UserContants";

//login
export const userLoginReducer = (
    state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { }

        default:
            return state;
    }
} 

//REGISTRAR USUARIO
export const registrarUsuarioReducer = (
    state = { }, action) => {
    switch (action.type) {
        case USER_REGISTRO_REQUEST:
            return { loading: true }
        case USER_REGISTRO_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTRO_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
} 


//detalle USUARIO
export const detalleUsuarioReducer = (
    state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETALLE_REQUEST:
            return {...state, loading: true }
        case USER_DETALLE_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETALLE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETALLE_RESET:
            return { user: {}}
        default:
            return state;
    }
} 

//ACTUALIZAR USUARIO
export const actualizarUsuarioReducer = (
    state = {}, action) => {
    switch (action.type) {
        case USER_ACTUALIZAR_REQUEST:
            return {loading: true }
        case USER_ACTUALIZAR_SUCCESS:
            return { loading: false, success:true, userInfo: action.payload }
        case USER_ACTUALIZAR_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
} 