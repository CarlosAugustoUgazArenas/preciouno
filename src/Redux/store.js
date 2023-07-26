import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productComentarioReducer, productDetailsReducer, productlistReducer } from "./Reducers/ProductReducers"
import { cartReducer } from "./Reducers/CartReducers"
import { actualizarUsuarioReducer, detalleUsuarioReducer, registrarUsuarioReducer, userLoginReducer } from "./Reducers/userReducers"
import { orderCrearReducer, orderDetalleReducer, orderListMyReducer, orderPagoReducer } from "./Reducers/OrderReducers"

const reducer = combineReducers({
    productList: productlistReducer,
    productDetails: productDetailsReducer,
    productComentado: productComentarioReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    registrarUsuario: registrarUsuarioReducer,
    detalleUsuario: detalleUsuarioReducer,
    actualizarUsuario: actualizarUsuarioReducer,
    orderCrear: orderCrearReducer,
    orderDetalle: orderDetalleReducer,
    orderPago:orderPagoReducer,
    orderListMy:orderListMyReducer
})

 const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
//login 
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null

//direccion de entrega
const direccionEnvioFromLocalStorage = localStorage.getItem("direccionEnvio")
? JSON.parse(localStorage.getItem("direccionEnvio"))
: {}

const initialState = {
    cart :{
        cartItems: cartItemsFromLocalStorage,
        direccionEnvio: direccionEnvioFromLocalStorage,
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const middleware = [ thunk ]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store