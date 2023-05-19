import './nav.css';
import prueba from '../../imgs/prueba.jpg';
import test from '../../imgs/test.png';
import { useContext } from 'react';
import LayoutContext from '../../context/layoutsContext';
const Nav = () => {
    
    const {layoutHomeContext, layoutListContext, layoutSearchContext} = useContext(LayoutContext);

    return(
        <div>
            <nav className='navTweeter'>
                <img src={test} alt=""></img>
                <div className='navButtons'>
                    <button onClick={(e) => layoutHomeContext(e)}>Home</button>
                    <button onClick={(e) => layoutSearchContext(e)}>Explore</button>
                    <button onClick={(e) => layoutListContext(e)}>BookMarks</button>
                </div>
                <div className='navUser'>
                    <img src={prueba} alt=""></img>
                    <button>Username</button>
                </div>
            </nav>
        </div>
    )
}

export default Nav;