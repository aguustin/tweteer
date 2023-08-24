import "./form.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TweetsContext from "../../context/tweetsContext";

const Form = () => {
  const nav = useNavigate();
  const { session, createUserContext, setSessionContext, getProfileInformationContext } = useContext(TweetsContext);
  const [form, setForm] = useState(false);
  const [adv, setAdv] = useState(false);

  const createUser = async (e) => {
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

    if (confirmUser !== 0) {
      console.log("dasdsadsadasd");
      await getProfileInformationContext(session[0]._id);
      nav("/tweeterio");
    } else {
      console.log("assdasd");
      setAdv(true);
    }
  };

  const Register = () => {
    return (
      <div>
        <form onSubmit={(e) => createUser(e)} className="form mx-auto">
          <div className="form-header d-flex">
            <h1>TweeterIo</h1>
          </div>
          <div>
            <div className="form-group">
              <input type="text" name="userMail" placeholder="..."  required/>
              <label>Mail</label>
            </div>
            <div className="form-group">
              <input type="text" name="userName" placeholder="..."  required/>
              <label>UserName</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="..." required/>
              <label>Password</label>
            </div>
            <div className="form-group">
              <input type="password" name="repitePassword" placeholder="..." required/>
              <label>Repite password</label>
            </div>
          </div>
          <div className="form-footer">
            <div className="d-flex justify-content-between">
              <button onClick={() => setForm(!form)}>Back</button>
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const Login = () => {
    return (
      <div >
        <form className="form mx-auto" onSubmit={(e) => authenticateUser(e)}>
          <div className="form-header d-flex">
            <h1>TweeterIo</h1>
          </div>
          <div>
            <div className="form-group">
              <input type="text" name="userMail" placeholder="..." required/>
              <label>Mail</label>
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="..." required/>
              <label>Password</label>
            </div>
          </div>
          <div className="form-footer">
            <div className="d-flex justify-content-between">
              <button type="submit">Login</button>
              <button onClick={() => setForm(!form)}>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="body-form">
      <div>
        {adv ? <p>Wrong password!</p> : ''}
        {form ? <Register /> : <Login />}</div>
    </div>
  );
};

export default Form;
