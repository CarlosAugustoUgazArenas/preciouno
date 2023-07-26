import React, { useEffect }  from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/LoadingError/Error"
import { ORDER_CREAR_RESET } from "../Redux/Constants/OrderConstants";
import { crearOrder } from "../Redux/Actions/OrderActions";


const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);


  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const userLogin = useSelector ((state) => state.userLogin)
  const { userInfo } = userLogin


  //calcular precio

  const addDecimales = (num) => {
    return (Math.round(num* 100)/100).toFixed(2)
  }
  cart.itemsPrice = addDecimales (
    cart.cartItems.reduce((acc,item) => acc + item.precio * item.cantidad, 0)
  )

  cart.shippingPrice = addDecimales (
    cart.itemsPrice > 100 ? 0 : 20
  )
  cart.taxPrice = addDecimales (
    Number((0.18 * cart.itemsPrice).toFixed(2))
  )
  
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice)+
    Number(cart.taxPrice)
  ).toFixed(2)

    const orderCrear = useSelector((state) => state.orderCrear)
    const { order, success, error } = orderCrear

    useEffect(()=> {
      if (success) {
        history.push(`/order/${order._id}`)
        dispatch({ type: ORDER_CREAR_RESET })
      }
    }, [history, dispatch, success, order ])

  const placeOrderHandler = () => {
    dispatch(
      crearOrder({
        orderItems: cart.cartItems,
        direccionEnvio: cart.direccionEnvio,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
  
      })
    )
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Cliente</strong>
                </h5>
                <p>{userInfo.name }</p>
                <p> {userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Información del pedido</strong>
                </h5>
                <p>Envio: {cart.direccionEnvio.pais}</p>
                <p>Metodo de Pago: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Entregar a</strong>
                </h5>
                <p>
                  Dirección: {cart.direccionEnvio.ciudad}, {" "}{cart.direccionEnvio.direccion}, {" "} 
                  {cart.direccionEnvio.codigopostal}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {
              cart.cartItems.length === 0 ? (
                <Message  variant="alert-info mt-5"> Su cesta está vacía </Message>
              )
              :
              (
                <>
                  {
                    cart.cartItems.map((item,index)=>(
                      <div className="order-product row" key={index} >
                      <div className="col-md-3 col-6">
                        <img src={item.imagenpro} alt={item.nombre} />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                          <h6>{item.nombre}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>Cantidad</h4>
                        <h6>{item.cantidad}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>SUBTOTAL</h4>
                        <h6>S/. {item.cantidad * item.precio}</h6>
                      </div>
                    </div>
                    ))
                  }
                </>
              )
            }
            {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}

       
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Productos</strong>
                  </td>
                  <td>S/. {cart.itemsPrice} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Envío</strong>
                  </td>
                  <td>S/. {cart.shippingPrice } </td>
                </tr>
                <tr>
                  <td>
                    <strong>Impuesto (18%)</strong>
                  </td>
                  <td>S/. {cart.taxPrice} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>S/. {cart.totalPrice} </td>
                </tr>
              </tbody>
            </table>
            {
              cart.cartItems.length === 0 ? null : (
                <button type="submit" onClick={placeOrderHandler}>
                 REALIZAR PEDIDO
              </button>
              )}
              {
                error && ( 
                  <div className="my-3 col-12">
                  <Message variant="alert-danger">{error}</Message>
                </div>
                )
              }
           
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
