import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";
import { actualizarPerfil } from "../../Redux/Actions/userActions";

const ProfileTabs = () => {
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmarpassword, setConfirmarPassword ] = useState("")
  const toastId = React.useRef(null)
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  }

const dispatch = useDispatch()

const  detalleUsuario = useSelector((state) => state.detalleUsuario)
const { loading, error, user } =  detalleUsuario

const  actualizarUsuario = useSelector((state) => state.actualizarUsuario)
const { loading:updateloading } =  actualizarUsuario


useEffect(() => {
  if (user) {
    setName(user.name)
    setEmail(user.email)
  }
},[ dispatch, user ])

const submitHandler = (e) => {
  e.preventDefault()
  //coincidencia de contraseña
  if (password !== confirmarpassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Contraseñas no coinciden", Toastobjects)
      }
       
  } else{
    dispatch(actualizarPerfil({id:user._id,name, email, password }))
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Perfil actualizado", Toastobjects)
    }
  }
}

  return (
    <>

    <Toast />
    {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading />}
    {updateloading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler} >
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Nombre de Usuario</label>
            <input className="form-control" 
            type="text" 
            required 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail </label>
            <input className="form-control" 
            type="email" 
            required
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Nueva Contraseña</label>
            <input className="form-control" 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirmar Contraseña</label>
            <input className="form-control" 
            type="password" 
            value={confirmarpassword} 
            onChange={(e)=>setConfirmarPassword(e.target.value)} 
            />
          </div>
        </div>
        <button type="submit">Actualizar Perfil</button>
      </form>
    </>
  );
};

export default ProfileTabs;
