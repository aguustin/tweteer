import "./form.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TweetsContext from "../../context/tweetsContext";

const Form = () => {

  const nav = useNavigate();
  const { createUserContext, setSessionContext, getProfileInformationContext } = useContext(TweetsContext);
  const [form, setForm] = useState(false);
  const [adv, setAdv] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    const userMail = e.target.elements.userMail.value;
    const userName = e.target.elements.userName.value;
    const password = e.target.elements.password.value;
    const repitePassword = e.target.elements.repitePassword.value;

    const accountData = {
      userMail: userMail,
      userName: userName,
      password: password,
      repitePassword: repitePassword,
    };
    
    await createUserContext(accountData);
    setForm(!form);
  };

  const authenticateUser = async (e) => {
    e.preventDefault();
    const userMail = e.target.elements.userMail.value;
    const password = e.target.elements.password.value;
    
    const authenticateData = {
      userMail: userMail,
      password: password,
    };
    
    const confirmUser = await setSessionContext(authenticateData);

    if (confirmUser === 2) {
      setAdv(true);
      setTimeout(() => setAdv(false), 3000); // El mensaje desaparece en 3 segundos
    } else {
      await getProfileInformationContext(confirmUser[0]._id);
      nav("/tweeterio");
    }
  };

  const Register = () => {
    return (
      <div>
        <form onSubmit={createUser} className="form mx-auto">
          <div className="form-header d-flex">
            <h1>TweeterIo</h1>
          </div>
          <div>
            <div className="form-group">
              <input 
                type="email" 
                name="userMail" 
                placeholder=" " 
                required
              />
              <label>Email</label>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="userName" 
                placeholder=" " 
                required
              />
              <label>Nombre de usuario</label>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password" 
                placeholder=" " 
                required
              />
              <label>Contraseña</label>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="repitePassword" 
                placeholder=" " 
                required
              />
              <label>Repetir contraseña</label>
            </div>
          </div>
          <div className="form-footer">
            <div className="d-flex justify-content-between">
              <button type="button" onClick={() => setForm(!form)}>
                Volver
              </button>
              <button type="submit">Registrarse</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const Login = () => {
    return (
      <div>
        <form className="form mx-auto" onSubmit={authenticateUser}>
          <div className="form-header d-flex">
            <h1>TweeterIo</h1>
          </div>
          {adv && (
            <div className="alert-error">
              Credenciales incorrectas. Por favor, intenta de nuevo.
            </div>
          )}
          <div>
            <div className="form-group">
              <input 
                type="email" 
                name="userMail" 
                placeholder=" " 
                autoComplete="username"
                required
              />
              <label>Email</label>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password" 
                placeholder=" " 
                autoComplete="current-password"
                required
              />
              <label>Contraseña</label>
            </div>
          </div>
          <div className="form-footer">
            <div className="d-flex justify-content-between">
              <button type="button" onClick={() => setForm(!form)}>
                Registrarse
              </button>
              <button type="submit">Iniciar sesión</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="body-form">
      {form ? <Register /> : <Login />}
    </div>
  );
};

export default Form;