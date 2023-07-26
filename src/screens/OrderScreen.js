import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { OrderPago, getDetalleOrder } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { ORDER_PAGO_RESET } from "../Redux/Constants/OrderConstants";

const OrderScreen = ({match}) => {
  window.scrollTo(0, 0);

  const [sdkReady, setSdkReady ] = useState(false)
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetalle = useSelector ((state) => state.orderDetalle)
  const { order, loading, error } = orderDetalle

  const orderPago = useSelector ((state) => state.orderPago)
  const { loading: loadingPago, success: successPago } = orderPago

  if (!loading) {
    const addDecimales = (num) => {
      return (Math.round(num * 100)/100).toFixed(2)
    }
    order.itemsPrice = addDecimales (
      order.orderItems.reduce((acc,item) => acc + item.precio * item.cantidad, 0)
    )
  }

 

  useEffect(()=> {

    const agregarPaypalScript = async() =>{
      const { data: clienteId } = await axios.get("/api/config/paypal")
      
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src=`https://www.paypal.com/sdk/js?client-id=${clienteId}`
     
      script.async = true
      script.onload =() =>{
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPago) {
      dispatch({type: ORDER_PAGO_RESET })
      dispatch(getDetalleOrder(orderId))
    } 
    else if(!order.isPaid ){
      if(!window.paypal){
        agregarPaypalScript()
      }else {
      setSdkReady(true)
      }
    }
        
  },[ dispatch, orderId, successPago, order])

  const successPagoHandler = (paymentResult)=>{
    console.log(paymentResult)
   dispatch(OrderPago(orderId,paymentResult))
  }
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Cliente</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
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
                    <p>Envio: {order.direccionEnvio.pais}</p>
                    <p>Metodo de Pago: {order.paymentMethod}</p>
                    {
                      order.isPaid ? (
                        <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                        Pagado el {moment(order.paidAt).calendar()}
                        </p>
                      </div>

                      ) : (
                        <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                        No pagado
                        </p>
                      </div>
                      )
                    }

                  
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
                  Dirección: {order.direccionEnvio.ciudad}, {" "}{order.direccionEnvio.direccion}, {" "} 
                  {order.direccionEnvio.codigopostal}
                </p>
                {
                      order.isDelivered ? (
                        <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                        Entregado el {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>

                      ) : (
                        <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                        No entregado
                        </p>
                      </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {
                  order.orderItems.length === 0 ? (
                    <Message variant="alert-info mt-5">Su pedido está vacío</Message>
                  )
                  :(
                    <>
                    {
                      order.orderItems.map((item,index) =>(
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
            
             </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                <tbody>
                <tr>
                  <td>
                    <strong>Productos</strong>
                  </td>
                  <td>S/. {order.itemsPrice} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Envío</strong>
                  </td>
                  <td>S/. {order.shippingPrice } </td>
                </tr>
                <tr>
                  <td>
                    <strong>Impuesto (18%)</strong>
                  </td>
                  <td>S/. {order.taxPrice} </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>S/. {order.totalPrice} </td>
                </tr>
              </tbody>
                </table>
                {
                  !order.isPaid && (
                    <div className="col-12">
                      { loadingPago && <Loading /> }
                      { !sdkReady ?  (
                      <Loading />
                      )
                      :(
                        <PayPalButton amount={order.totalPrice} locale={'es_XC'} onSuccess={successPagoHandler} />
                      )
                    }              
                  </div>
                  )
                }
              
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
