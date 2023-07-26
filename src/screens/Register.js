import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { registro } from "../Redux/Actions/userActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const registrarUsuario = useSelector((state) => state.registrarUsuario)
  const { error, loading, userInfo } = registrarUsuario

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)

    }
  },[userInfo, history, redirect])
    

  const submitHandler = (e) =>{
    e.preventDefault()
    //todo
    dispatch(registro(name, email,password))
  }


  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
      {error && <Message variant="alert-danger">{error}</Message> }
       {loading && <Loading />}
       
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="text" placeholder="Nombre completo del usuario" 
          value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" 
           value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" 
          value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Registro</button>
          <p>
            <Link 
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
             ¿Tienes una Cuenta? <strong>Ingresa</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
