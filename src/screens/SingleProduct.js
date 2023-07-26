import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, productoComentado } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_COMENTARIO_RESET } from "../Redux/Constants/ProductConstants";
import  moment  from "moment";

const SingleProduct = ({ history, match }) => {
  const [cantidad, setCantidad ] = useState(1)
  const [valoracion, setValoracion ] = useState(0)
  const [comentarios, setComentario ] = useState("")

  const productId = match.params.id
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productComentado = useSelector((state) => state.productComentado)
  const { loading : loadingComentario, error : errorComentario, success: successComentario } = productComentado



  useEffect(()=>{
      if (successComentario) {
        alert("Comentario enviado")
        setValoracion(0)
        setComentario("")
        dispatch({type: PRODUCT_COMENTARIO_RESET})
      }
     dispatch(listProductDetails(productId))
  },[dispatch, productId, successComentario])

  const AddToCartHandle = (e) => {
    e.preventDefault()
    history.push(`/cart/${productId}?qty=${cantidad}`)
  }

  const submitHandler =(e) =>{
    e.preventDefault()
    dispatch(productoComentado(productId,{
      valoracion,
      comentarios,
    }))
  }
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.imagenpro} alt={product.nombre} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.nombre}</div>
                  </div>
                  <p>{product.descripcion}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio</h6>
                      <span>S/. {product.precio}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Estado</h6>
                      {product.stock > 0 ? (
                        <span>En Stock</span>
                      ) : (
                        <span>no disponible</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Comentarios</h6>
                      <Rating
                        value={product.valoracion}
                        text={`${product.numeroRevisiones} comentarios`}
                      />
                    </div>
                    {product.stock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Cantidad</h6>
                          <select
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Agregar al Carrito
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">COMENTARIOS</h6>
                {product.revisiones.length === 0 && (
                  <Message variant={"alert-info mt-3"}>Sin comentarios</Message>
                )}

                {product.revisiones.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                  >
                    <strong>{review.nombre}</strong>
                    <Rating value={review.valoracion} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comentarios}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>ESCRIBA UNA OPINIÓN</h6>

                <div className="my-4">
                  {loadingComentario && <Loading />}
                  {errorComentario && (
                    <Message variant="alert-danger">{errorComentario}</Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Valoracion</strong>
                      <select
                        value={valoracion}
                        onChange={(e) => setValoracion(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      >
                        <option value="">Seleccione</option>
                        <option value="1">1 - Malo</option>
                        <option value="2">2 - Regular</option>
                        <option value="3">3 - Bueno</option>
                        <option value="4">4 - Muy Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comentario</strong>
                      <textarea
                        row="3"
                        value={comentarios}
                        onChange={(e) => setComentario(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingComentario}
                        className="col-12 bg-black border-0 p-3 rounded text-white"
                      >
                        ENVIAR
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Por favor{" "}
                      <Link to="/login">
                        " <strong>Ingrese</strong> "
                      </Link>{" "}
                      escribir una reseña{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
