import { useContext } from 'react';
import './retweetForm.css';
import TweetsContext from '../../context/tweetsContext';

const RetweetLayout = () => {
    const {session, retweet, saveRetweetContext} = useContext(TweetsContext);
 
    const saveRetweet = async (e, userId, retweetedUserName, retweetedPublication, retweetedImg) => {
        e.preventDefault();
        const retweetedComment = e.target.elements.retweetedComment.value;

        const retweetedData = {
            userId: userId,
            retweetedComment: retweetedComment,
            retweetedUserName: retweetedUserName,
            retweetedPublication: retweetedPublication,
            retweetedImg: retweetedImg
        }

        await saveRetweetContext(retweetedData);
    }

    return(
        <div>
            {retweet.map((re) => 
            <div key={re._id}>
                <form onSubmit={(e) => saveRetweet(session[0]._id, re.tweetUsername, re.tweetPublication, re.tweetImg)} className="retweetLayout">
                    <div className='form-group-retweet'>
                        <input name="retweetedComment" placeholder='Comment retweet'/>
                    </div>
                    <div>
                        <div className='form-group-retweet'>
                            <p>{re.tweetPublication}</p>
                        </div>
                            {re.tweetImg ? <div className='form-group-retweet-img'>
                            <img src={re.tweetImg} alt=""></img>
                        </div> : ''}
                    </div>
                </form>
            </div>)}
        </div>
    )
}

export default RetweetLayout;