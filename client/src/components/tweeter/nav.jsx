import "./nav.css";
import notUser from  '../../imgs/notUser.jpg';
import icono from "../../imgs/icono.png";
import { useContext, useState } from "react";
import LayoutContext from "../../context/layoutsContext";
import TweetsContext from "../../context/tweetsContext";
import Loading from "../loading/loading";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [openLogout, setOpenLogout ] = useState(false)
  const { layoutHomeContext, layoutListContext, layoutSearchContext, load } =  useContext(LayoutContext);
  const { session, getProfileInformationContext } = useContext(TweetsContext);
  const navigation = useNavigate()

  const myProfile = async (e) => {
    e.preventDefault();
    await getProfileInformationContext(session);
    await layoutHomeContext(e);
  };

  const logout = () => {
    localStorage.removeItem("credentials")
    navigation("/")
  }

  if(load){
    return(
      <Loading/>
    )
  }

  return (
    <div>
      <nav className="navTweeter">
        <img src={icono} alt=""></img>
        <div className="navButtons">
          <button onClick={(e) => myProfile(e)}>Home</button>
          <button onClick={(e) => layoutSearchContext(e)}>Explore</button>
          <button onClick={(e) => layoutListContext(e)}>BookMarks</button>
        </div>
        <div className="navUser">
          
          {session && session[0]?.userImg ? <img src={session[0]?.userImg} alt=""></img> : <img src={notUser} alt=""></img>}
          { session && <button onClick={() => setOpenLogout(!openLogout)}>{session[0]?.userName}</button>}
          { openLogout && <div className="logout">
            <button onClick={() => logout()}>Log out</button>
          </div> }
        </div>
      </nav>
    </div>
  );
};

export default Nav;
