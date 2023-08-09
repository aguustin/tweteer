import notUser from "../../imgs/notUser.jpg";
import { useContext } from 'react';
import './retweetForm.css';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from "../../context/layoutsContext";


const RetweetLayout = () => {
    const {session, retweet, setRetweetLayout, saveRetweetContext} = useContext(TweetsContext);
    const {black, setBlackLayout} = useContext(LayoutContext);
 
    const saveRetweet = async (e, userId, tweetProfileImg, retweetedUserName, retweetedPublication, retweetedImg) => {
        e.preventDefault();
        const tweetPublication = e.target.elements.retweetedComment.value;

        const retweetedData = {
            userId: userId,
            tweetPublication:  tweetPublication,
            profileRetweetedImg: tweetProfileImg,
            retweetedUserName: retweetedUserName,
            retweetedPublication: retweetedPublication,
            retweetedImg: retweetedImg
        }

        await saveRetweetContext(retweetedData);

    }

    const closeRetweetLayout = (e) => {
        e.preventDefault();
        setRetweetLayout(false);
        setBlackLayout(!black);
    }

    return(
        <div>
            {black ? <div className='i'></div> : ''}
            {retweet[0].tweets.map((re) => 
            <div key={re._id}  className="retweetLayout">
                <div className="d-flex">
                  <p>{re.tweetUsername}</p>
                  <p>{re.tweetPublication}</p>
                </div>
                <form onSubmit={(e) => saveRetweet(e, session[0]._id, re.tweetProfileImg, re.tweetUsername, re.tweetPublication, re.tweetImg)}>
                    <div className='form-group-retweet'>
                            <textarea name="retweetedComment" placeholder='Comment retweet'/>
                    </div>
                    <div>
                        <div className='retweet-info'>
                            { re.tweetProfileImg ? <img src={re.tweetProfileImg} alt=""></img> : <img src={notUser} alt=""></img> }
                        </div>
                            {re.tweetImg ? <div className='form-group-retweet-img'>
                            <img src={re.tweetImg} alt=""></img>
                        </div> : ''}
                    </div>
                    <div>
                    <button onClick={(e) => closeRetweetLayout(e)}>Cancel</button>
                    <button type="submit">Public retweet</button>
                    </div>
                </form>
            </div>)}
        </div>
    )
}

export default RetweetLayout;