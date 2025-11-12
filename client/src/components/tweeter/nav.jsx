import "./nav.css";
import notUser from '../../imgs/notUser.jpg';
import icono from "../../imgs/icono.png";
import inicioPng from "../../imgs/inicio.png"
import marcadorPng from "../../imgs/marcador.png"
import explorarPng from "../../imgs/explorar.png"
import { useContext, useState, useEffect, useRef } from "react";
import LayoutContext from "../../context/layoutsContext";
import TweetsContext from "../../context/tweetsContext";
import Loading from "../loading/loading";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const logoutRef = useRef(null);
  const { layoutHomeContext, layoutListContext, layoutSearchContext, load } = useContext(LayoutContext);
  const { session, getProfileInformationContext } = useContext(TweetsContext);
  const navigation = useNavigate();

  // Cerrar menú de logout al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setOpenLogout(false);
      }
    };

    if (openLogout) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openLogout]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpenLogout(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const myProfile = async (e) => {
    e.preventDefault();
    await getProfileInformationContext(session[0]._id);
    await layoutHomeContext(e);
  };

  const logout = () => {
    localStorage.removeItem("credentials");
    navigation("/");
  };

  const toggleLogout = (e) => {
    e.stopPropagation();
    setOpenLogout(!openLogout);
  };

  if (load) {
    return <Loading />;
  }

  return (
    <div>
      <nav className="navTweeter">
        <img 
          src={icono} 
          alt="TweeterIO Logo"
          title="TweeterIO"
        />
        
        <div className="navButtons">
          <button 
            onClick={myProfile}
            aria-label="Ir al inicio"
          >
            <img src={inicioPng} alt=""></img>
          </button>
          <button 
            onClick={layoutSearchContext}
            aria-label="Explorar"
          >
            <img src={explorarPng} alt=""></img>
          </button>
          <button 
            onClick={layoutListContext}
            aria-label="Marcadores"
          >
            <img src={marcadorPng} alt=""></img>
          </button>
        </div>
        
        <div 
          className="navUser" 
          ref={logoutRef}
          onClick={toggleLogout}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') toggleLogout(e);
          }}
          aria-label="Menú de usuario"
        >
          <img 
            src={session && session[0]?.userImg ? session[0].userImg : notUser} 
            alt=""
          />
          {/*session && (
            <button aria-label={`Usuario: ${session[0]?.userName}`}>
              {session[0]?.userName}
            </button>
          )*/}
          
          {openLogout && (
            <div className="logout">
              <button 
                onClick={logout}
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;