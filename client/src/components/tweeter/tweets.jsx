import './tweets.css';
import HomeLayout from './homeLayout';
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
import deletePng from '../../imgs/close.png';
import { formatRelativeTime } from '../../utils/formatDate';
import TweetSkeleton from '../loading/TweetSkeleton';

const Tweets = () => {
    const [answerLayout, setAnswerLayout] = useState(false);
    const [black, setBlackLayout] = useState(false);
    const [profileId, setProfileId] = useState();
    const [tweetId, setTweetId] = useState();
    const [commentId, setCommentId] = useState();
    const [shareToast, setShareToast] = useState("");
    const [loadingTweets, setLoadingTweets] = useState(false);
    const [openComments, setOpenComments] = useState({});
    const [openAnswers, setOpenAnswers] = useState({});
    const [commentPreviews, setCommentPreviews] = useState({});
    const [answerImgPreview, setAnswerImgPreview] = useState(null);

    let fecha = new Date();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const commentsDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;

    const { homeLayout, listsLayout, searching, exploreHasMore, loadMoreExplore, feedLayout, feedTweets, feedHasMore, loadMoreFeed } = useContext(LayoutContext);
    const { session, allUsers, tweets, se, setSe, retweetLayout, respondTweetContext, answerContext, likeContext, likeCommentContext, answerLikeContext, retweetContext, saveTweetContext, getProfileInformationContext, getAllTendContext, deleteTweetContext, getTendenciesContext } = useContext(TweetsContext);

    useEffect(() => {
        (async() => {
            if (session) {
                setLoadingTweets(true);
                await getProfileInformationContext(session?.[0]?._id);
                await getAllTendContext();
                setLoadingTweets(false);
            }
        })();
        // eslint-disable-next-line
    }, [session]);

    const searchs = (e) => {
        e.preventDefault();
        setSe(e.target.value);
    }

    // Si la búsqueda empieza con #, filtra por hashtag en vez de por usuario
    const isHashtagSearch = se.startsWith('#') && se.length > 1;
    const hashtagQuery = isHashtagSearch ? se.slice(1) : "";
    const a = isHashtagSearch
        ? []
        : allUsers.filter((data) => data.userName?.toLowerCase().includes(se.toLowerCase()));

    useEffect(() => {
        if (!isHashtagSearch || !hashtagQuery) return;
        const timer = setTimeout(() => {
            getTendenciesContext(hashtagQuery);
        }, 400);
        return () => clearTimeout(timer);
    // eslint-disable-next-line
    }, [hashtagQuery, isHashtagSearch]);

    const respondTweet = async (e, tweetId) => {
        e.preventDefault();
        const commentData = {
            tweetId: tweetId,
            commentsUsers: session[0]?.userName,
            commentsProfilesImg: session[0]?.userImg,
            commentsImg: e.target.elements.respondTweetImg.files[0] || undefined,
            commentsPublication: e.target.elements.respondTweet.value,
            commentsDate: commentsDate
        }
        e.target.reset();
        setCommentPreviews(prev => ({ ...prev, [tweetId]: null }));
        await respondTweetContext(commentData);
    }

    const openAnswerLayout = (profileId, tweetId, commentId) => {
        setProfileId(profileId);
        setTweetId(tweetId);
        setCommentId(commentId);
        setAnswerLayout(!answerLayout);
        setBlackLayout(true);
    }

    const like = async (e, profileId, tweetId) => {
        e.preventDefault();
        const likeData = {
            profileId: profileId,
            tweetId: tweetId,
            profileImgLikes: session[0]?.userImg,
            userNameLikes: session[0].userName,
            profileIdLikes: session[0]._id
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
        setAnswerLayout(!answerLayout);
        setBlackLayout(!black);
        setAnswerImgPreview(null);
        const answerData = {
            profileId: profileId,
            tweetId: tweetId,
            commentId: commentId,
            answerUsername: session[0]?.userName,
            answerProfilesImg: session[0]?.userImg,
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

    const closeAnswerLayout = () => {
        setAnswerLayout(!answerLayout);
        setBlackLayout(!black);
    }

    const deleteTweet = async (userId, tweetId) => {
        await deleteTweetContext(userId, tweetId);
    }

    const handleCommentImgChange = (tweetId, file) => {
        setCommentPreviews(prev => ({ ...prev, [tweetId]: file ? URL.createObjectURL(file) : null }));
    }

    const handleAnswerImgChange = (file) => {
        setAnswerImgPreview(file ? URL.createObjectURL(file) : null);
    }

    const toggleComments = (tweetId) => {
        setOpenComments(prev => ({ ...prev, [tweetId]: !prev[tweetId] }));
    }

    const toggleAnswers = (commentId) => {
        setOpenAnswers(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    }

    const shareTweet = (tweetId) => {
        const url = `${window.location.origin}/tweet/${tweetId}`;
        navigator.clipboard.writeText(url).then(() => {
            setShareToast("¡Enlace copiado!");
            setTimeout(() => setShareToast(""), 2500);
        });
    }

    // Render @mentions as bold colored spans
    const renderPublication = (text) => {
        if (!text) return null;
        const parts = text.split(/(@\w+)/g);
        return parts.map((part, i) =>
            part.match(/^@\w+$/)
                ? <span key={i} className="mention-highlight">{part}</span>
                : part
        );
    }

    return(
        <div>
            {black ? <div className='i'></div> : ''}
            {answerLayout && (
                <form className='answer-form' onSubmit={(e) => answer(e)}>
                    <textarea type="text" placeholder='Answer comment' name="answer"></textarea>
                    {answerImgPreview && (
                        <div className="img-preview-wrapper">
                            <img src={answerImgPreview} alt="preview" className="img-preview" />
                            <button type="button" className="img-preview-close" onClick={() => setAnswerImgPreview(null)}>✕</button>
                        </div>
                    )}
                    <div className='ansfile'>
                        <div className='sepIn'>
                            <label htmlFor="answerTweetImg"><img id="labelAnsImg" src={twImg} alt=""></img></label>
                            <input id="answerTweetImg" type="file" name="answerTweetImg" onChange={(e) => handleAnswerImgChange(e.target.files[0])}></input>
                        </div>
                        <div className='sepB'>
                            <button type="button" onClick={() => closeAnswerLayout()}>Cancel</button>
                            <button type="submit">Answer</button>
                        </div>
                    </div>
                </form>
            )}
            {shareToast && <div className="share-toast">{shareToast}</div>}
            <Nav/>
            <div className='tweets'>
                {searching ? (
                    <div className='search'>
                        <form className='d-flex'>
                            <input value={se} onChange={searchs} type="text" placeholder='Buscar usuario o #hashtag'></input>
                            <button>Buscar</button>
                        </form>
                        {isHashtagSearch
                            ? <p className="hashtag-search-label">Mostrando tweets con #{hashtagQuery}</p>
                            : <SearchLayout users={a}/>
                        }
                    </div>
                ) : ''}
                {retweetLayout ? <RetweetLayout/> : ''}
                {homeLayout ? <HomeLayout/> : ''}
                <div className='lists-publications-container mx-auto'>
                    <div className='publications'>
                        {homeLayout ? <PublicTweet/> : ''}

                        {feedLayout && (
                            <>
                                <div className="feed-header">
                                    <p>Feed global</p>
                                    <span>Últimos tweets de todos</span>
                                </div>
                                {feedTweets.map((item) => (
                                    <div key={item.tweet._id} className='t-backg'>
                                        {session?.[0]._id === item._id && (
                                            <button className='deleteTweet' onClick={() => deleteTweet(item._id, item.tweet._id)}>
                                                <img src={deletePng} alt=""/>
                                            </button>
                                        )}
                                        <div className='tweet'>
                                            <div className='tweetDesc-img'>
                                                <div className='tweetProfileData'>
                                                    <div>
                                                        {item.tweet.tweetProfileImg
                                                            ? <img id='tweetProfileImg' src={item.tweet.tweetProfileImg} alt=""/>
                                                            : <img id='tweetProfileImg' src={notUser} alt=""/>}
                                                    </div>
                                                    <div>
                                                        <div className='d-flex'>
                                                            <p>{item.tweet.tweetUsername}</p>
                                                            <label className="tweet-date">{formatRelativeTime(item.tweet.tweetDate)}</label>
                                                        </div>
                                                        <p id="tweetPublication">{renderPublication(item.tweet.tweetPublication)}</p>
                                                    </div>
                                                </div>
                                                {item.tweet.tweetImg && <img className='tweetImg' src={item.tweet.tweetImg} alt=""/>}
                                                <li className='tweet-actions d-flex'>
                                                    <button><img src={chat} alt=""/>{item.tweet.comments?.length}</button>
                                                    <button onClick={(e) => retweeted(e, item.tweet._id)}><img src={retweet} alt=""/>{item.tweet.retweets}</button>
                                                    <button onClick={(e) => like(e, item._id, item.tweet._id)}><img src={hearth} alt=""/>{item.tweet.tweetLikess?.length}</button>
                                                    <button onClick={(e) => saveTweet(e, item.tweet._id)}><img src={save} alt=""/></button>
                                                    <button className='share-btn' onClick={() => shareTweet(item.tweet._id)} title="Copiar enlace">🔗</button>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {feedHasMore && (
                                    <div className="load-more-container">
                                        <button className="load-more-btn" onClick={loadMoreFeed}>Cargar más</button>
                                    </div>
                                )}
                            </>
                        )}

                        {!feedLayout && loadingTweets ? (
                            <>
                                <TweetSkeleton />
                                <TweetSkeleton />
                                <TweetSkeleton />
                            </>
                        ) : !feedLayout && (
                        tweets.map((t) =>
                        <div key={t._id}>
                        {t.tweets.map((tc) =>
                        <div key={tc._id} className='t-backg'>
                        {session?.[0]._id === t._id && <button className='deleteTweet' onClick={() => deleteTweet(session?.[0]?._id, tc._id)}><img src={deletePng} alt=""></img></button>}
                        {tc.retweeted === 1 ?
                        <div className='retweets'>
                            <div className='retweets-info d-flex'>
                                {tc.tweetProfileImg ? <img src={tc.tweetProfileImg} alt=""></img> : <img src={notUser} alt=""></img>}
                                <div>
                                    <div className='d-flex'>
                                        <p>{tc.tweetUsername}</p>
                                        <label>retweeted</label>
                                    </div>
                                    <p>{renderPublication(tc.tweetPublication)}</p>
                                </div>
                                <label className="tweet-date">{formatRelativeTime(tc.tweetDate)}</label>
                            </div>
                            <div className='tweetDesc-img border border-info p-4 mt-2'>
                                <div className='tweetProfileData'>
                                    <div>
                                        {tc.profileRetweetedImg ? <img id='tweetProfileImg' src={tc.profileRetweetedImg} alt=""></img> : <img id='tweetProfileImg' src={notUser} alt=""></img>}
                                    </div>
                                    <div>
                                        <p>{tc.retweetedUserName}</p>
                                        <p>{renderPublication(tc.retweetedPublication)}</p>
                                    </div>
                                </div>
                                {tc.retweetedImg ? <img className='tweetImg' src={tc.retweetedImg} alt=""></img> : ''}
                            </div>
                            <li key={tc._id} className='tweet-actions d-flex'>
                                <button className='mx-auto' onClick={(e) => retweeted(e, tc._id)}><img src={retweet} alt=""></img>{tc.retweets}</button>
                                <button className='mx-auto' onClick={(e) => like(e, t._id, tc._id)}><img src={hearth} alt=""></img>{tc.tweetLikess?.length}</button>
                                <button className='mx-auto' onClick={(e) => saveTweet(e, tc._id)}><img src={save} alt=""></img></button>
                                <button className='mx-auto share-btn' onClick={() => shareTweet(tc._id)} title="Copiar enlace">🔗</button>
                            </li>
                        </div>

                        :

                        <div className='tweet'>
                            <div className='tweetDesc-img'>
                                <div className='tweetProfileData'>
                                    <div>
                                        {tc.tweetProfileImg ? <img id='tweetProfileImg' src={tc.tweetProfileImg} alt=""></img> : <img id='tweetProfileImg' src={notUser} alt=""></img>}
                                    </div>
                                    <div>
                                        <div className='d-flex'>
                                            <p>{tc.tweetUsername}</p>
                                            <label className="tweet-date">{formatRelativeTime(tc.tweetDate)}</label>
                                        </div>
                                        <p id="tweetPublication">{renderPublication(tc.tweetPublication)}</p>
                                    </div>
                                </div>
                                {tc.tweetImg ? <img className='tweetImg' src={tc.tweetImg} alt=""></img> : ''}
                                <li className='tweet-actions d-flex'>
                                    <button onClick={() => toggleComments(tc._id)}><img src={chat} alt=""></img>{tc.comments?.length}</button>
                                    <button onClick={(e) => retweeted(e, tc._id)}><img src={retweet} alt=""></img>{tc.retweets}</button>
                                    <button onClick={(e) => like(e, t._id, tc._id)}><img src={hearth} alt=""></img>{tc.tweetLikess?.length}</button>
                                    <button onClick={(e) => saveTweet(e, tc._id)}><img src={save} alt=""></img></button>
                                    <button className='share-btn' onClick={() => shareTweet(tc._id)} title="Copiar enlace">🔗</button>
                                </li>
                            </div>
                        </div>
                        }
                        {openComments[tc._id] && (
                        <div>
                            {listsLayout ? '' :
                                <form className='comments-form mt-2' encType='multipart/form-data' onSubmit={(e) => respondTweet(e, tc._id)}>
                                    <div className='d-flex'>
                                        {session[0].userImg ? <img src={session[0].userImg} alt=""></img> : <img src={notUser} alt=""></img>}
                                        <div className="comment-form-right">
                                            <textarea id="respondTweet" type="text" name="respondTweet" placeholder='Tweet your reply'></textarea>
                                            {commentPreviews[tc._id] && (
                                                <div className="img-preview-wrapper">
                                                    <img src={commentPreviews[tc._id]} alt="preview" className="img-preview" />
                                                    <button type="button" className="img-preview-close" onClick={() => setCommentPreviews(prev => ({ ...prev, [tc._id]: null }))}>✕</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='cImgComment'>
                                        <label htmlFor="respondTweetImg"><img id="labelImg" src={twImg} alt=""></img></label>
                                        <input id="respondTweetImg" type="file" name="respondTweetImg" accept="image/*" onChange={(e) => handleCommentImgChange(tc._id, e.target.files[0])}></input>
                                        <button id="commButton" type="submit">Comment</button>
                                    </div>
                                </form>}
                            {tc.comments.map((c) =>
                            <div key={c._id} className='comments-container d-flex mt-3'>
                                {c.commentsProfilesImg !== "undefined" ? <img id="comment-image-profile" src={c.commentsProfilesImg} alt=""></img> : <img id="comment-image-profile" src={notUser} alt=""></img>}
                                <div className='w-100'>
                                    <div className='comment'>
                                        <div className='d-flex'>
                                            <p>{c.commentsUsers}</p>
                                            <label>{c.commentsDate}</label>
                                        </div>
                                        <div className="comment-width">
                                            <p>{renderPublication(c.commentsPublication)}</p>
                                            {c.commentsImg ? <img src={c.commentsImg} alt=""></img> : ''}
                                        </div>
                                    </div>
                                    <div className='like-comment-container mt-2'>
                                        <button id="like-comment" onClick={() => commentLike(t._id, tc._id, c._id)}><img src={hearth} alt=""></img>{c.commentLikes?.length}</button>
                                        <button id="toggle-answers" onClick={() => toggleAnswers(c._id)}><img src={chat} alt=""></img>{c.answerComments?.length}</button>
                                        <button className="answer-comment text-secondary" onClick={() => openAnswerLayout(t._id, tc._id, c._id)}>Comment</button>
                                    </div>
                                    {openAnswers[c._id] && c.answerComments.map((ans) =>
                                    <div key={ans._id}>
                                        <div className='answer-comment'>
                                            <div className='d-flex'>
                                                {ans.answerProfilesImg !== "undefined" ? <img className='answer-img' src={ans.answerProfilesImg} alt=""></img> : <img className='answer-img' src={notUser} alt=""></img>}
                                                <label>{ans.answerArroba}</label>
                                            </div>
                                            <div className="answer-width">
                                                <p>{renderPublication(ans.answerDesc)}</p>
                                                <div>
                                                    {ans.answerTweetImg && ans.answerTweetImg !== "undefined" ? <img id="answer-img" src={ans.answerTweetImg} alt=""></img> : ''}
                                                </div>
                                            </div>
                                            <div className='answerLike'>
                                                <button onClick={() => answerLike(t._id, tc._id, c._id, ans._id)}><img src={hearth} alt=""></img></button>
                                                <label className='mt-1'>{ans.answerLikes?.length} likes</label>
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
                        )
                        )}

                        {!feedLayout && searching && exploreHasMore && (
                            <div className="load-more-container">
                                <button className="load-more-btn" onClick={loadMoreExplore}>
                                    Cargar más
                                </button>
                            </div>
                        )}
                    </div>
                    {homeLayout ? <TrendAndPeople/> : ''}
                </div>
            </div>
        </div>
    )
}

export default Tweets;
