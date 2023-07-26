import { CART_ADD_ITEM, 
    CART_LIMPIAR_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_METODO_PAGO, 
    CART_SAVE_SHIPING_ADDRESS } from "../Constants/CartConstants";

export const cartReducer =(state = {cartItems:[], direccionEnvio: {} },action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item =  action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((x) => 
                        x.product === existItem.product ? item : x
                    )
                }
            } else {
                return{
                    ...state,
                    cartItems: [...state.cartItems, item],
                   
                }

            }
           
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems:state.cartItems.filter((x) => x.product !== action.payload)
            }
            case CART_LIMPIAR_ITEM:
                return {
                    ...state,
                    cartItems:[],
                }
            case CART_SAVE_SHIPING_ADDRESS:
                return {
                    ...state,
                    direccionEnvio: action.payload
                }
            case CART_SAVE_METODO_PAGO:
                return {
                 ...state,
                 paymentMethod: action.payload
                    }
        default:
            return state
          
    }
}