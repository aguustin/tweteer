import './tweets.css';
import HomeLayout from './homeLayout';
import ListLayout from './listsLayout';
import PublicTweet from './publicTweet';
import TrendAndPeople from './trendAndPeople';
import prueba from '../../imgs/prueba.jpg';
import hearth from "../../imgs/hearth.png";
import { useContext } from 'react';
import LayoutContext from '../../context/layoutsContext';
import Nav from './nav';
import UserContext from '../../context/usersContext';
import TweetsContext from '../../context/tweetsContext';
import notUser from '../../imgs/notUser.jpg';

const Tweets = () => {

    const {homeLayout, listsLayout, searching} = useContext(LayoutContext);
    const {session} = useContext(UserContext);
    const {tweets, respondTweetContext} = useContext(TweetsContext);

    const respondTweet = async (e, tweetId) => {
        e.preventDefault();
        const commentData = {
            commentsUsers: session[0]?.userName,
            commentsProfilesImg: session[0]?.profilePhoto,
            commentsPublication: respondTweet
        }

        await respondTweetContext(commentData);
    }

    const Search = () => {

        return(
            <div className='search'>
                <form className='d-flex'>
                    <input type="text" name="search" placeholder='search'></input>
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
console.log("tweets", tweets);
console.log("session", session);
    return(
        <div>
            <Nav/>
            <div className='tweets'>
                {searching ? <Search/> : ''}
                {homeLayout ? <HomeLayout/> : ''}
                <div className='lists-publications-container d-flex mx-auto'>
                    {listsLayout ? <ListLayout/> : '' }
                    <div className='publications'>
                        {homeLayout ? <PublicTweet/> : ''}
                            {tweets.map((t) => <div key={t._id} className='imgProfile d-flex'>
                                <img src={notUser} alt=""></img>
                                {t.tweets.map((tc) => <div key={tc._id}>
                                    <p>{tc.userName}</p>
                                    <label>{tc.tweetDate}</label>
                                </div>)}
                            </div>)}
                            {tweets.map((t) =>
                            <div key={t._id}>
                                {t.tweets.map((tc) => 
                                <div>
                                    <div key={tc._id} className='tweetDesc-img'>
                                        <p>{tc.tweetPublication}</p>
                                        <img src={notUser} alt=""></img>
                                        <li className='d-flex'>
                                            <form>
                                                <button><img src={hearth} alt=""></img>Comments {tc.tweetComments}</button>
                                                <button><img src={hearth} alt=""></img>Retweets {tc.retweets}</button>
                                                <button><img src={hearth} alt=""></img>Likes {tc.tweetLikes}</button>
                                                <button><img src={hearth} alt=""></img>Save</button>
                                            </form>
                                        </li>
                                    </div>
                                    <div>
                                        <form className='comments-form d-flex mt-2' encType='multipart/form-data' onSubmit={(e) => respondTweet(e, tc._id)}>
                                            <img src={prueba} alt=""></img>
                                            <input type="text" name="respondTweet" placeholder='Tweet your reply'></input>
                                            <button type="submit">Comment</button>
                                        </form>
                                    </div>
                               </div>
                                )}
                            </div> 
                            )}

                        {tweets.map((t) => 
                            {t.tweets.map((tc) =>
                                {tc.comments.map((c) => 
                                    <div key={c._id} className='comments-container d-flex mt-3 '>
                                        <img id="comment-image-profile" src={notUser} alt=""></img>
                                        <div>
                                            <div className='comment'>
                                                <div className='d-flex'>
                                                    <p>{c.commentsUsers}</p>
                                                    <label>{c.commentsDate}</label>
                                                </div>
                                                <div>
                                                    <p>{c.commentsPublication}</p>
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                    <button id="like-comment"><img src={hearth} alt=""></img>Like</button>
                                                    <label>{c.commentsLikes} Likes</label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            )}
                        )}
                    </div>
                        {listsLayout ? '' : <TrendAndPeople/>}
                </div>
            </div>
            </div>
    )
}

export default Tweets;