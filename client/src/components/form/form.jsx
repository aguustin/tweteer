import './form.css';
import test from '../../imgs/test.png';
import { useContext, useState } from 'react';
import UserContext from '../../context/usersContext';
import {useNavigate} from "react-router-dom";

const Form = () => {
    const nav = useNavigate();
    const {createUserContext, setSessionContext} = useContext(UserContext);
    const [form, setForm] = useState(false);

    const createUser = async (e) => {

        const userMail = e.target.elements.userMail.value;
        const userName = e.target.elements.userName.value;
        const password = e.target.elements.password.value;  
        const repitePassword = e.target.elements.repitePassword.value;
        
        const accountData = {
            userMail: userMail,
            userName: userName,
            password: password,
            repitePassword: repitePassword
        };
        await createUserContext(accountData);
        console.log(userMail);
        setForm(!form);
    }

    const authenticateUser = async (e) => {
            e.preventDefault();
            const userMail = e.target.elements.userMail.value;
            const password = e.target.elements.password.value; 
            const authenticateData = {
                userMail: userMail,
                password: password,
                
            };
    
            await setSessionContext(authenticateData);
            nav('/tweeterio');
    }


    const Register = () => {
        return(
            <div>
                <form onSubmit={(e) => createUser(e)} className='form mx-auto'>
                    <div className='form-header d-flex'>
                        <h1>TweeterIo</h1>
                    </div>
                    <div>
                        <div className='form-group'>
                            <input type="text" name="userMail" placeholder='...'/>
                            <label>Mail</label>
                        </div>
                        <div className='form-group'>
                            <input type="text" name="userName" placeholder='...'/>
                            <label>UserName</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" placeholder='...'/>
                            <label>Password</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="repitePassword" placeholder='...'/>
                            <label>Repite password</label>
                        </div>
                    </div>
                    <div className='form-footer'>
                        <div>
                            <button onClick={() => setForm(!form)}>Back</button>
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
                            <input type="text" name="userMail" placeholder='...'/>
                            <label>Mail</label>
                        </div>
                        <div className='form-group'>
                            <input type="password" name="password" placeholder='...'/>
                            <label>Password</label>
                        </div>
                    </div>
                    <div className='form-footer'>
                        <div className='d-flex justify-content-between'>
                            <button type="submit">Login</button>
                            <button onClick={() => setForm(!form)}>Sign In</button>
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
            <div>

             {form ? <Register/> : <Login/>}
            </div>
        </div>
    )
}

export default Form;