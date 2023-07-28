import "./nav.css";
import notUser from  '../../imgs/notUser.jpg';
import icono from "../../imgs/icono.png";
import { useContext } from "react";
import LayoutContext from "../../context/layoutsContext";
import TweetsContext from "../../context/tweetsContext";
import Loading from "../loading/loading";

const Nav = () => {
  const { layoutHomeContext, layoutListContext, layoutSearchContext, load } =  useContext(LayoutContext);
  const { session, getProfileInformationContext } = useContext(TweetsContext);

  const myProfile = async (e) => {
    e.preventDefault();
    await getProfileInformationContext(session);
    await layoutHomeContext(e);
  };

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
          {session[0]?.userImg ? <img src={session[0]?.userImg} alt=""></img> : <img src={notUser} alt=""></img>}
          <button>{session[0]?.userName}</button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
