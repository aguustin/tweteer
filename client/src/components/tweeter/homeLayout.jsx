import './homeLayout.css';
import prueba from "../../imgs/prueba.jpg";
import { useContext } from 'react';
import UserContext from '../../context/usersContext';
import TweetsContext from '../../context/usersContext';

const HomeLayout = () => {

    const {session} = useContext(UserContext);
    const {tweets} = useContext(TweetsContext);

    return(
        <div className='profileInfo'>
            <div className='portadaProfile'>
                <img src={prueba} alt=""></img>
            </div>
            <div className='profileDesc d-flex mx-auto'>
                <div className='photoUser'>
                    {session.map((s) => <img src={prueba} alt=""></img>)}
                </div>
                <div className='userDesc'>
                    <div className='d-flex align-items-center'>
                        {session.map((s) => <h1>{s.userName}</h1>)}
                        <label>2031 following</label>
                        <label>2031 followers</label>
                    </div>
                    <div className='description'>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Ut architecto temporibus quae, dolorum eaque id nostrum vero repudiandae est alias.
                         Dignissimos voluptas saepe earum hic iste distinctio itaque ex repellendus?</p>
                    </div>
                </div>
                <button>Follow</button>
            </div>
        </div>
    )
}

export default HomeLayout;