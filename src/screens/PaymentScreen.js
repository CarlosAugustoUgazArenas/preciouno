import React, { useState } from "react";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { guardarMetodopago } from "../Redux/Actions/cartActions";

const PaymentScreen = ( { history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart)
  const { direccionEnvio } = cart

  if (!direccionEnvio) {
    history.push("/shipping")
  }

  const [ paymentMethod, setPaymentMethod ] = useState("Paypal")
 
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(guardarMetodopago(paymentMethod))
    history.push("/placeorder")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECCIONA EL METODO DE PAGO</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input 
              className="form-check-input" 
              type="radio" 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value) } />
              <label className="form-check-label">PayPal o Tarjeta de credito</label>
            </div>
          </div>

          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
