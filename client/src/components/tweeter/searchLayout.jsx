import './searchLayout.css';
import { useContext } from "react";
import TweetsContext from '../../context/tweetsContext';
import notUser from "../../imgs/notUser.jpg";
import LayoutContext from '../../context/layoutsContext';

const SearchLayout = (users) => {
    const { layoutHomeContext } = useContext(LayoutContext);
    const { session, se, seeProfileContext, getProfileInformationContext } = useContext(TweetsContext);

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        await seeProfileContext(userId); //--
        layoutHomeContext(e);
    }

    const myProfile = async (e) => {
        e.preventDefault();
        await getProfileInformationContext(session);
        await layoutHomeContext(e);
    };
    console.log("us: " ,users)
    return(
        <div>
            {se ?
        <div className="searchedPeople">
             {users.users.map((all) => <div className="peopleData">
                    <div>
                       {all.userImg ? <img src={all.userImg} alt=""></img> : <img src={notUser} alt=""></img> }
                    </div>
                    <div className='data'>
                        <p>{all.userName}</p>
                        <label>{all.followers.length} Followers</label>
                        <label>{all.following.length} Following</label>
                    </div>
                    {all._id === session[0]?._id ? <button onClick={(e) => myProfile(e)}>See profile</button> : <button onClick={(e) => seeProfile(e, all._id)}>See profile</button>}
            </div>)}
        </div>
        : ''}
        </div>
        
    )
}

export default SearchLayout;