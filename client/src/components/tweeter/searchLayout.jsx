import './searchLayout.css';
import { useContext } from "react";
import TweetsContext from "../../context/tweetsContext";
import prueba from "../../imgs/prueba.jpg";
import UserContext from '../../context/usersContext';

const SearchLayout = (users) => {
    const {allUsers, seeProfileContext} = useContext(UserContext);
    const {tweets, setTweets} = useContext(TweetsContext);

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        await seeProfileContext(userId);
    }
console.log("users:", users);
    return(
        /*<div>
            {tweets.map((t) => <div key={t._id} className="seachedPeople">
                <img src={notUser} alt=""></img>
                <div>
                    <p>{t.userName}</p>
                    <label>{t?.followers}</label>
                    <label>{t?.following}</label>
                </div>
            </div>)}
        </div>*/
        <div className="searchedPeople">
            {users.users.map((all) => <div className="peopleData">
                    <div>
                        <img src={prueba} alt=""></img>
                    </div>
                    <div className='data'>
                        <p>{all.userName}</p>
                        <label>{all.followers.length} Followers</label>
                        <label>{all.following.length} Following</label>
                    </div>
                    <button onClick={(e) => seeProfile(e, all._id)}>See profile</button>
            </div>)}
        </div>
        
    )
}

export default SearchLayout;