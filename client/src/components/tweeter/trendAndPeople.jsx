import './trendAndPeople.css';
import notUser from "../../imgs/notUser.jpg";
import { useContext } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const TrendAndPeople = () => {

    const {allUsers, tendencies, getTendenciesContext} = useContext(TweetsContext);
    const {layoutSearchContext, layoutHomeContext} = useContext(LayoutContext);
    const { session, seeProfileContext, getProfileInformationContext } = useContext(TweetsContext);

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        await seeProfileContext(userId);
        layoutHomeContext(e);
    }

    const myProfile = async (e) => {
        e.preventDefault();
        await getProfileInformationContext(session);
        await layoutHomeContext(e);
    };
    
    const getTendencie = async (e, tendencie) => {
        e.preventDefault();
        await layoutSearchContext();
        await getTendenciesContext(tendencie);
    }

    let a = tendencies.slice(0, 7);
    let users = allUsers.slice(0, 4);
    return(
        <div className="trendAndPeople">
            <div className="trends">
                <div className='trends-header'>
                    <p>Trends for you</p>
                </div>
                <div>
                { 
                a?.map((tend, o) => <span key={o}>  
                {tend?._id.map((t, i) => <span key={i}> 
                        <div className='trendsDivs' onClick={(e) => getTendencie(e, t.word)}>
                            <p>#{t.word}</p>
                            <label>{t?.countH} Tweets</label>
                        </div>
                
                        </span>
                )}
                </span>
                )}
                </div>
            </div>

            {users.map((allU) => <div key={allU._id} className="people">
                <div className='mx-auto'>
                    <div className='trends-header'>
                        <label>Who to follow</label>
                    </div>
                    <div className="people-body d-flex">
                        {allU.userImg ? <div><img id="peopleImg" src={allU?.userImg} alt=""></img></div> : <div><img id="peopleImg" src={notUser} alt=""></img></div> }
                        <div className='user-followers'>
                            <p >{allU.userName}</p>
                            <label>{allU.followers.length} Followers</label>
                            <label>{allU.following.length} Following</label>
                        </div>
                        {allU._id === session[0]?._id ? <button onClick={(e) => myProfile(e)}>See profile</button> : <button onClick={(e) => seeProfile(e, allU._id)}>See profile</button>}
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