import './trendAndPeople.css';
import notUser from "../../imgs/notUser.jpg";
import hearth from "../../imgs/hearth.png";
import { useContext } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const TrendAndPeople = () => {

    const {allUsers, tendencies, getTendenciesContext} = useContext(TweetsContext);
    const {layoutSearchContext} = useContext(LayoutContext);
    
    const getTendencie = async (e, tendencie) => {
        e.preventDefault();
        await layoutSearchContext();
        await getTendenciesContext(tendencie);
    }

    let a = tendencies.slice(0, 7);
    
    return(
        <div className="trendAndPeople">
            <div className="trends">
                <div className='trends-header'>
                    <p>Trends for you</p>
                </div>
                <div>
                { 
                a?.map((tend) => <span key={tend._id}>  
                {tend?._id.map((t) => <span key={t._id}> {
                        <li onClick={(e) => getTendencie(e, t.word)}>
                            <p>#{t.word}</p>
                            <label>{t?.countH} Tweets</label>
                        </li>
                }
                        </span>
                )}
                </span>
                )}
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
                    <div className='peoplePortada text-center'>
                        {allU.userPortada ? <img src={allU?.userPortada} alt=""></img> : <img src={notUser} alt=""></img> }
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default TrendAndPeople;