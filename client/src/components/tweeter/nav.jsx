import "./nav.css";
import notUser from '../../imgs/notUser.jpg';
import icono from "../../imgs/icono.png";
import inicioPng from "../../imgs/inicio.png";
import marcadorPng from "../../imgs/marcador.png";
import explorarPng from "../../imgs/explorar.png";
import { useContext, useState, useEffect, useRef } from "react";
import LayoutContext from "../../context/layoutsContext";
import TweetsContext from "../../context/tweetsContext";
import Loading from "../loading/loading";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const logoutRef = useRef(null);
  const notifsRef = useRef(null);
  const { layoutHomeContext, layoutListContext, layoutSearchContext, layoutFeedContext, load } = useContext(LayoutContext);
  const { session, getProfileInformationContext, notifications, clearNotifications } = useContext(TweetsContext);
  const navigation = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) setOpenLogout(false);
      if (notifsRef.current && !notifsRef.current.contains(event.target)) setOpenNotifs(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpenLogout(false);
        setOpenNotifs(false);
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
    setOpenNotifs(false);
  };

  const toggleNotifs = (e) => {
    e.stopPropagation();
    setOpenNotifs(!openNotifs);
    setOpenLogout(false);
  };

  const unreadCount = notifications.length;

  if (load) return <Loading />;

  return (
    <div>
      <nav className="navTweeter">
        <img src={icono} alt="TweeterIO Logo" title="TweeterIO" />

        <div className="navButtons">
          <button onClick={myProfile} aria-label="Ir al inicio">
            <img src={inicioPng} alt="" />
          </button>
          <button onClick={layoutSearchContext} aria-label="Explorar">
            <img src={explorarPng} alt="" />
          </button>
          <button onClick={layoutListContext} aria-label="Marcadores">
            <img src={marcadorPng} alt="" />
          </button>
          <button className="nav-theme-btn" onClick={layoutFeedContext} aria-label="Feed global">
            🌐
          </button>

          <div className="nav-notif-wrapper" ref={notifsRef}>
            <button
              className="nav-notif-btn"
              onClick={toggleNotifs}
              aria-label="Notificaciones"
            >
              🔔
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
              )}
            </button>

            {openNotifs && (
              <div className="notif-panel">
                <div className="notif-panel-header">
                  <span>Notificaciones</span>
                  {unreadCount > 0 && (
                    <button className="notif-clear" onClick={clearNotifications}>
                      Limpiar
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="notif-empty">Sin notificaciones nuevas</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`notif-item notif-${n.type}`}>
                      <img src={n.fromImg || notUser} alt="" />
                      <span>{n.message}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            className="nav-theme-btn"
            onClick={() => setDarkMode(d => !d)}
            aria-label="Cambiar tema"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div
          className="navUser"
          ref={logoutRef}
          onClick={toggleLogout}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') toggleLogout(e); }}
          aria-label="Menú de usuario"
        >
          <img
            src={session && session[0]?.userImg ? session[0].userImg : notUser}
            alt=""
          />

          {openLogout && (
            <div className="logout">
              <button onClick={logout} aria-label="Cerrar sesión">
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
