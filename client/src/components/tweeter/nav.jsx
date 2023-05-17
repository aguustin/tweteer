import './nav.css';
import prueba from '../../imgs/prueba.jpg';
const Nav = () => {
    return(
        <div>
            <nav className='navTweeter'>
                <img src={prueba} alt=""></img>
                <div className='navButtons'>
                    <button>Home</button>
                    <button>Explore</button>
                    <button>Bookmarks</button>
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