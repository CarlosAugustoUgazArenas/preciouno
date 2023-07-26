import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/Actions/cartActions";

const CartScreen = ({match, location, history}) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch()
  const productId = match.params.id
  const cantidad = location.search ?  Number(location.search.split("=")[1]) : 1

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const total = cartItems.reduce((a,i) =>a + i.cantidad*i.precio, 0).toFixed(2)

  useEffect(() => {
    if (productId){
      dispatch(addToCart(productId, cantidad))
    }
  },[dispatch, productId, cantidad])
  const checkOutHandler= () => {
    history.push("/login?redirect=shipping")
  }

  const removeFromCartHandler= (id) => {
    //TODO
    dispatch(removefromcart(id))
  }
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">

        {
          cartItems.length === 0 ? (
          <div className="alert alert-info text-center mt-3">
          Su cesta está vacía
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            COMPRAR AHORA
          </Link>
        </div>
          )
          :
          (
            <>
             <div className=" alert alert-info text-center mt-3">
          Total Productos en el carrito
          <Link className="text-success mx-2" to="/cart">
            ({cartItems.length})
          </Link>
        </div>
        {/* cartiterm */}
        {
          cartItems.map((item) => (
            <div className="cart-iterm row">
            <div onClick={() => removeFromCartHandler(item.product)}
            className="remove-button d-flex justify-content-center align-items-center">
              <i className="fas fa-times"></i>
            </div>
            <div className="cart-image col-md-3">
              <img src={item.imagenpro} alt={item.nombre} />
            </div>
            <div className="cart-text col-md-5 d-flex align-items-center">
              <Link to={`/products/${item.product}`} >
                <h4>{item.nombre}</h4>
              </Link>
            </div>
            <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
              <h6>CANTIDAD</h6>
              <select 
                 value={item.cantidad} 
                 onChange={(e) => 
                 dispatch(addToCart(item.product,Number(e.target.value)))
                 }
                >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
            </div>
            <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
              <h6>PRECIO</h6>
              <h4>S/.{item.precio}</h4>
            </div>
          </div>
          ))
        }
        
        {/* End of cart iterms */}
        <div className="total">
          <span className="sub">total:</span>
          <span className="total-price">S/. {total}</span>
        </div>
        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Seguir comprando</button>
          </Link>
          {
            total > 0 && (
              <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
              <button onClick={checkOutHandler}>Realizar pedido</button>
            </div>
            )
          }

      
        </div>
     
            </>
          )
        }
   
      </div>
    </>
  );
};

export default CartScreen;
