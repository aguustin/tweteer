import './trendAndPeople.css';
import notUser from "../../imgs/notUser.jpg";
import hearth from "../../imgs/hearth.png";
import { useContext } from 'react';
import TweetsContext from '../../context/tweetsContext';

const TrendAndPeople = () => {

    const {allUsers} = useContext(TweetsContext);
   
    return(
        <div className="trendAndPeople">
            <div className="trends">
                <div className='trends-header'>
                    <p>Trends for you</p>
                </div>
                <div>
                    <li>
                        <p>#programming</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#devChallenge</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#trendOne</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#frontend</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#backend</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#tweeterio</p>
                        <label>231k Tweets</label>
                    </li>
                </div>
            </div>
            {allUsers.map((allU) => <div key={allU._id} className="people">
                <div className='mx-auto'>
                    <div className='trends-header'>
                        <label>Who to follow</label>
                    </div>
                    <div className="people-body d-flex">
                        {allU.userImg ? <img id="peopleImg" src={allU?.userImg} alt=""></img> : <img id="peopleImg" src={notUser} alt=""></img> }
                        <div className='user-followers'>
                            <p>{allU.userName}</p>
                            <label>{allU.followers.length} Followers</label>
                            <label>{allU.following.length} Following</label>
                        </div>
                        <button><img src={hearth} alt=""></img>Follow</button>
                    </div>
                    <div className='peopleHobbies'>
                        {allU.userHobbies.map((ho) => <label>{ho}</label>)}
                    </div>
                    <div className='peoplePortada text-center'>
                        {allU.userPortada ? <img src={allU?.userPortada} alt=""></img> : <img src={notUser} alt=""></img> }
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default TrendAndPeople;