import './tweets.css';
import HomeLayout from './homeLayout';
import ListLayout from './listsLayout';
import SearchLayout from './searchLayout';
import PublicTweet from './publicTweet';
import TrendAndPeople from './trendAndPeople';
import prueba from '../../imgs/prueba.jpg';
import hearth from "../../imgs/hearth.png";
import { useContext, useState } from 'react';
import LayoutContext from '../../context/layoutsContext';
import Nav from './nav';
import UserContext from '../../context/usersContext';
import TweetsContext from '../../context/tweetsContext';
import notUser from '../../imgs/notUser.jpg';

const Tweets = () => {
    const [se, setSe] = useState("");
    const {homeLayout, listsLayout, searching} = useContext(LayoutContext);
    const {session, allUsers} = useContext(UserContext);
    const {tweets, respondTweetContext} = useContext(TweetsContext);
   
    const respondTweet = async (e, tweetId) => {
        e.preventDefault();
        const commentData = {
            tweetId: tweetId,
            commentsUsers: session[0]?.userName,
            commentsProfilesImg: session[0]?.profilePhoto,
            commentsPublication: e.target.elements.respondTweet.value
        }

        await respondTweetContext(commentData);
    }

    const searchs = (e) => {
        e.preventDefault();
        setSe(e.target.value);
    }
    const a = allUsers.filter((data) => data.userName?.toLowerCase().includes(se.toLowerCase()));

    return(
        <div>
            <Nav/>
         <div className='tweets'>
         {searching ? <div className='search'>
                <form className='d-flex'>           
                    <input value={se} onChange={searchs} type="text" placeholder='Search'></input>
                    <button>Search</button>
                </form>  
                <SearchLayout users={a}/>
        </div>
            : ''}
                {homeLayout ? <HomeLayout/> : ''}
                <div className='lists-publications-container d-flex mx-auto'>
                    {listsLayout ? <ListLayout/> : '' }
                    <div className='publications'>
                        {homeLayout ? <PublicTweet/> : ''}
                            {tweets.map((t) =>
                            <div key={t._id}>
                                {t.tweets.map((tc) => 
                                <div className='mt-4'>
                                    <div key={tc._id} className='tweetDesc-img'>
                                        <p>{tc.tweetUsername}</p>
                                        <label>{tc.tweetDate}</label>
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
                                    {tc.comments.map((c) => 
                                    <div key={c._id} className='comments-container d-flex mt-3 '>
                                        <img id="comment-image-profile" src={notUser} alt=""></img>
                                        <div>
                                            <div className='comment'>
                                                <div className='d-flex'>
                                                    <p>{c.commentsUsers}</p>
                                                    <label>{c.commentsDate}</label>
                                                </div>
                                                <div className="comment-width">
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