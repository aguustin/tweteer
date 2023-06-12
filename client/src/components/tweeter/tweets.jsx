import './tweets.css';
import HomeLayout from './homeLayout';
import ListLayout from './listsLayout';
import SearchLayout from './searchLayout';
import RetweetLayout from '../form/retweetForm';
import PublicTweet from './publicTweet';
import TrendAndPeople from './trendAndPeople';
import hearth from "../../imgs/hearth.png";
import twImg from "../../imgs/photo.png";
import chat from "../../imgs/chat.png";
import retweet from "../../imgs/retweet.png";
import save from "../../imgs/save.png";
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
    let fecha = new Date();
    let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const commentsDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;
    const {homeLayout, listsLayout, searching} = useContext(LayoutContext);
    const {session, allUsers, tweets, retweetLayout, respondTweetContext, answerContext, likeContext, likeCommentContext, answerLikeContext, retweetContext, saveTweetContext, getProfileInformationContext} = useContext(TweetsContext);
    
    useEffect(() => {
        (async() => {
            await getProfileInformationContext(session[0]?._id);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            commentsImg: e.target.elements.respondTweetImg.files[0],
            commentsPublication: e.target.elements.respondTweet.value,
            commentsDate: commentsDate
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

    const commentLike = async (profileId, tweetId, commentId) => {

        const commentLikeData = {
            profileId: profileId,
            tweetId: tweetId,
            commentId: commentId,
            commentProfileLikes: session[0].userImg,
            commentUserNameLikes: session[0].userName
        };

        await likeCommentContext(commentLikeData);
    }

    const answerLike = async (profileId, tweetId, commentId, answerId) => {

        const answerLikeData = {
            profileId: profileId,
            tweetId: tweetId,
            commentId: commentId,
            answerId: answerId,
            answerUserNameLikes: session[0].userName
        };

        await answerLikeContext(answerLikeData);
    }

    const answer = async (e) => {
        e.preventDefault();
    
        const answerData = {
            profileId: profileId,
            tweetId: tweetId,
            commentId: commentId,
            answerUsername: session[0]?.userName,
            answerProfilesImg: session[0]?.profilePhoto,
            answerPublication: e.target.elements.answer.value,
            answerTweetImg: e.target.elements.answerTweetImg.files[0]
        }
        await answerContext(answerData);
    }

    const retweeted = async (e, tweetId) => {
        e.preventDefault();
        await retweetContext(tweetId);
    }

    const saveTweet = async (e, tweetId) => {
        e.preventDefault();
        await saveTweetContext(tweetId);
    }

    const Answer = () => {
        return (
            <form className='answer-form' onSubmit={(e) => answer(e)}>
                <textarea type="text" placeholder='Answer comment' name="answer"></textarea>
                <input type="file" name="answerTweetImg"></input>
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
            {retweetLayout ? <RetweetLayout/> : ''}
                {homeLayout ? <HomeLayout/> : ''}
                <div className='lists-publications-container mx-auto'>
                    {listsLayout ? <ListLayout/> : '' }
                    <div className='publications'>
                        {homeLayout ? <PublicTweet/> : ''}
                        {tweets.map((t) =>
                            <div key={t._id}>
                        {t.tweets.map((tc) => 
                                <div className='mt-4'>
                        {tc.retweeted === 1 ?  
                        <div className='retweets'>
                        <div className='retweets-info d-flex'>
                            { tc.tweetProfileImg ? <img src={tc.tweetProfileImg} alt=""></img> : <img src={notUser} alt=""></img> }
                            <div>
                                <div className='d-flex'>
                                    <p>{tc.tweetUsername}</p>
                                    <label>retweeted</label>
                                </div>
                                <p>{tc.tweetPublication}</p>
                            </div>
                            <label>{tc.tweetDate}</label>
                        </div>
                        <div key={tc._id} className='tweetDesc-img border border-info p-4 mt-2' >
                            <div className='tweetProfileData'>
                                <div>
                                {tc.profileRetweetedImg ? <img id='tweetProfileImg' src={tc.profileRetweetedImg} alt=""></img> : <img id='tweetProfileImg' src={notUser} alt=""></img>}
                                </div>
                                <div>
                                    <p>{tc.retweetedUserName}</p>
                                    <p>{tc.retweetedPublication}</p>
                                </div>
                            </div>
                            {tc.retweetedImg ? <img className='tweetImg' src={tc.retweetedImg} alt=""></img> : ''}
                        </div>
                        <li className='tweet-actions d-flex'>         
                            <button><img src={hearth} alt=""></img>Comments {tc.comments?.length}</button>
                            <button onClick={(e) => retweeted(e, tc._id)}><img src={retweet} alt="" ></img>Retweets {tc.retweets}</button>
                            <button onClick={(e) => like(e, t._id, tc._id)}><img src={hearth} alt=""></img>Likes {tc.tweetLikess?.length}</button>
                        </li>
                    </div> 
                    
                    : 
                                    
                                    <div className='tweet'>
                                        <div key={tc._id} className='tweetDesc-img'>
                                            <div className='tweetProfileData'>
                                                <div>
                        {tc.tweetProfileImg ? <img id='tweetProfileImg' src={tc.tweetProfileImg} alt=""></img> : <img id='tweetProfileImg' src={notUser} alt=""></img>}
                                                </div>
                                                <div>
                                                    <p>{tc.tweetUsername}</p>
                                                    <label>{tc.tweetDate}</label>
                                                    <p id="tweetPublication">{tc.tweetPublication}</p>
                                                </div>
                                            </div>
                                            {tc.tweetImg ? <img className='tweetImg' src={tc.tweetImg} alt=""></img> : ''}
                                            <li className='tweet-actions d-flex'>
    {/**cantidad de com,ret,likes */}           
                                                    <button><img src={chat} alt=""></img>Comments {tc.comments?.length}</button>
                                                    <button onClick={(e) => retweeted(e, tc._id)}><img src={retweet} alt="" ></img>Retweets {tc.retweets}</button>
                                                    <button onClick={(e) => like(e, t._id, tc._id)}><img src={hearth} alt=""></img>Likes {tc.tweetLikess?.length}</button>
                                                    <button onClick={(e) => saveTweet(e, tc._id)}><img src={save} alt=""></img>Save</button>
                                                
                                            </li>
                                        </div>
                                    </div>
                                }
                                    <div>
 {/**formulario de comentarios */}      <form className='comments-form mt-2' encType='multipart/form-data' onSubmit={(e) => respondTweet(e, tc._id)}>
                                            <div className='d-flex'>
                                                {session[0].profilePhoto ? <img src={session[0].profilePhoto} alt=""></img> : <img src={notUser} alt=""></img>}
                                               <textarea id="respondTweet" type="text" name="respondTweet" placeholder='Tweet your reply'></textarea>
                                            </div>
                                            <div className='cImgComment'>
                                                <input id="respondTweetImg" type="file" name="respondTweetImg"></input>
                                                <label for="respondTweetImg"><img id="labelImg" src={twImg} alt=""></img></label>
                                                <button id="commButton" type="submit">Comment</button>
                                            </div> 
                                        </form>
{/**for respuestas a comentarios */}{answerLayout ? <Answer/> : ''}
                                    </div>
                                    {tc.comments.map((c) => 
                                    <div key={c._id} className='comments-container d-flex mt-3 '>
                                        <img id="comment-image-profile" src={notUser} alt=""></img>
                                        <div className='w-100'>
 {/**vista de los comentarios */}           <div className='comment'>
                                                <div className='d-flex'>
                                                    <p>{c.commentsUsers}</p>
                                                    <label>{c.commentsDate}</label>
                                                </div>
                                                <div className="comment-width">
                                                    <p>{c.commentsPublication}</p>
                                                    {c.commentsImg ? <img src={c.commentsImg} alt=""></img> : ''}
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                    <button id="like-comment" onClick={() => commentLike(t._id, tc._id, c._id)}><img src={hearth} alt=""></img>Like</button>
                                                    <label>{c.commentLikes?.length} Likes</label>
                                                    <label>{c.answerComments?.length} Answers</label>
                                                    <button className="deep-comment" onClick={() => openAnswerLayout(t._id, tc._id, c._id)}>Comment</button>
                                            </div>
                                            {c.answerComments.map((ans) => 
/**vista de las respuestas */               <div key={ans._id}>
                                                <div className='answer-comment'>
                                                    <div className='d-flex'>
                                                        <img className='answer-img' src={notUser} alt=""></img>
                                                        <label>{ans.answerArroba}</label>
                                                    </div>
                                                    <div className="answer-width">
                                                        <p>{ans.answerDesc}</p>
                                                        <div>
                                                            {ans.answerTweetImg ? <img id="answer-img" src={ans.answerTweetImg} alt=""></img> : ''}
                                                        </div>    
                                                    </div>
                                                    <div className='answerLike'>
                                                        <button onClick={() => answerLike(t._id, tc._id, c._id, ans._id)}><img src={hearth} alt=""></img><label>Like</label></button>
                                                        <label>{ans.answerLikes?.length} likes</label>
                                                    </div>
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