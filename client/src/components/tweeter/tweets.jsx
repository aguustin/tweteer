import './tweets.css';
import HomeLayout from './homeLayout';
import ListLayout from './listsLayout';
import SearchLayout from './searchLayout';
import PublicTweet from './publicTweet';
import TrendAndPeople from './trendAndPeople';
import prueba from '../../imgs/prueba.jpg';
import hearth from "../../imgs/hearth.png";
import { useContext, useEffect, useState } from 'react';
import LayoutContext from '../../context/layoutsContext';
import Nav from './nav';
import notUser from '../../imgs/notUser.jpg';
import TweetsContext from '../../context/tweetsContext';

const Tweets = () => {
    const [ se, setSe ] = useState("");
    const [ answerLayout, setAnswerLayout ] = useState(false);
    const [ profileId, setProfileId ] = useState();
    const [ tweetId, setTweetId ] = useState();
    const [ commentId, setCommentId ] = useState();
    const {homeLayout, listsLayout, searching} = useContext(LayoutContext);
    const {session, allUsers, tweets, respondTweetContext, answerContext, likeContext, getProfileInformationContext} = useContext(TweetsContext);
    
    useEffect(() => {
        (async() => {
            await getProfileInformationContext(session[0]?._id);
        })();
    },[]);

    const searchs = (e) => {
        e.preventDefault();
        setSe(e.target.value);
    }
    const a = allUsers.filter((data) => data.userName?.toLowerCase().includes(se.toLowerCase()));
   
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

    const openAnswerLayout = (profileId, tweetId, commentId) => {
        setProfileId(profileId);
        setTweetId(tweetId);
        setCommentId(commentId);
        setAnswerLayout(!answerLayout);
    }


    const like = async (e, profileId, tweetId) => {
        e.preventDefault();
        const likeData = {
            profileId: profileId,
            tweetId: tweetId,
            profileImgLikes: session[0]?.userImg,
            userNameLikes: session[0].userName
        }

        await likeContext(likeData);
    }

    const answer = async (e) => {
        e.preventDefault();
    
        const answerData = {
            profileId: profileId,
            tweetId: tweetId,
            commentId: commentId,
            answerUsername: session[0]?.userName,
            answerProfilesImg: session[0]?.profilePhoto,
            answerPublication: e.target.elements.answer.value
        }
        await answerContext(answerData);
    }

    const Answer = () => {
        return (
            <form className='answer-form' onSubmit={(e) => answer(e)}>
                <textarea type="text" placeholder='Answer comment' name="answer"></textarea>
                <button type="submit">Answer</button>
            </form>
        )
    }

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
                                                <button><img src={hearth} alt=""></img>Comments {tc.comments.length}</button>
                                                <button><img src={hearth} alt=""></img>Retweets {tc.retweets}</button>
                                                <button onClick={(e) => like(e, t._id, tc._id)}><img src={hearth} alt=""></img>Likes {tc.tweetLikess.length}</button>
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
                                        {answerLayout ? <Answer/> : ''}
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
                                                    <button className="deep-comment" onClick={() => openAnswerLayout( t._id, tc._id, c._id)}>Comment</button>
                                            </div>
                                            {c.answerComments.map((ans) => 
                                            <div key={ans._id}>
                                                <div className='answer-comment'>
                                                    <div className='d-flex'>
                                                        <img className='answer-img' src={notUser} alt=""></img>
                                                        <label>{ans.answerArroba}</label>
                                                    </div>
                                                    <div className="answer-width">
                                                        <p>{ans.answerDesc}</p>
                                                    </div>
                                                    <button><img src={hearth} alt=""></img><label>Like</label></button>
                                                </div>
                                            </div>)}
                                        </div>
                                    </div>
                                )}
                               </div>
                                )}
                            </div> 
                            )}
                    </div>
                        {listsLayout ? '' : <TrendAndPeople/>}
                </div>
            </div>
            </div>
    )
}

export default Tweets;