import './form.css';
import test from '../../imgs/test.png';
import { useContext, useState } from 'react';
import UserContext from '../../context/usersContext';
import {useNavigate} from "react-router-dom";

const Form = () => {

    const {createUserContext, setSessionContext} = useContext(UserContext);
    const [form, setForm] = useState(false);
    const nav = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();
        const userMail = e.target.elements.userMail.value;
        const password = e.target.elements.password.value;   
        const repitePassword = e.target.elements.password.value;
        
        const accountData = {
            userMail: userMail,
            password: password,
            repitePassword: repitePassword
        }

        await createUserContext(accountData);

        setForm(!form);
    }

    const authenticateUser = async (e) => {
            e.preventDefault();
            const userMail = e.target.elements.userMail.value;
            const password = e.target.elements.password.value;

            const authenticateData = {
                userMail: userMail,
                password: password,
            }

            await setSessionContext(authenticateData);

            nav('/tweeterio');
    }


    const Register = () => {
        return(
            <div>
                <form className='form mx-auto' onSubmit={(e) => createUser(e)}>
                    <div className='form-header d-flex'>
                        <h1>TweeterIo</h1>
                    </div>
                    <div>
                        <div className='form-group'>
                            <input type="mail" name="userMail" placeholder='...'></input>
                            <label>userMail</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" placeholder='...'></input>
                            <label>Password</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="repitePassword" placeholder='...'></input>
                            <label>Repite password</label>
                        </div>
                    </div>
                    <div className='form-footer'>
                        <div>
                            <button onClick={(e) => setForm(!form)}>Back</button>
                            <button type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    const Login = () => {
        return(
            <div className='e'>
                <form className='form mx-auto' onSubmit={(e) => authenticateUser(e)}>
                    <div className='form-header d-flex'>
                        <h1>TweeterIo</h1>
                    </div>
                    <div>
                        <div className='form-group'>
                            <input type="mail" name="userMail" placeholder='...'></input>
                            <label>userMail</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" placeholder='...'></input>
                            <label>Password</label>
                        </div>
                    </div>
                    <div className='form-footer'>
                        <div className='d-flex justify-content-between'>
                            <button type="submit">Login</button>
                            <button onClick={(e) => setForm(!form)}>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <div>
             <nav>
                <img src={test} alt=""></img>
                <img src={test} alt=""></img>
            </nav>
             {form ? <Register/> : <Login/>}
        </div>
    )
}

export default Form;