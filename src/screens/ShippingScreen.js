import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { direccionEnviofromcart } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart)
  const { direccionEnvio } = cart

  const [ direccion, setDireccion ] = useState(direccionEnvio.direccion)
  const [ ciudad, setCiudad ] = useState(direccionEnvio.ciudad)
  const [ codigopostal, setCodigopostal ] = useState(direccionEnvio.codigopostal)
  const [ pais, setPais ] = useState(direccionEnvio.pais)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(direccionEnviofromcart({ direccion, ciudad, codigopostal, pais }))
    history.push("/payment")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DIRECCIÓN DE ENTREGA</h6>
          <input type="text" placeholder="Ingrese su dirección"
          required
          value={direccion} 
          onChange={(e)=> setDireccion(e.target.value)} />
          
          <input type="text" placeholder="Ingrese su ciudad" 
          required
          value={ciudad} 
          onChange={(e)=> setCiudad(e.target.value)} />
          <input type="text" placeholder="Ingrese su codigo postal"
           required
           value={codigopostal} 
           onChange={(e)=> setCodigopostal(e.target.value)} />
          <input type="text" placeholder="ingrese su Pais" 
           required
           value={pais} 
           onChange={(e)=> setPais(e.target.value)}/>
          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
