import { createContext, useState, useEffect } from "react";
import { authenticateUserRequest, createUserRequest, editPasswordRequest, editProfileRequest, followRequest, checkFollowRequest, unFollowRequest, getAllUsersRequest } from "../api/userRequests";
import { createTweetRequest, respondTweetRequest, searchRequest, answerRequest, retweetRequest, saveTweetRequest, saveRetweetRequest, increaseLikesRequest, increaseCommentLikesRequest, increaseAnswerLikesRequest, getProfileInformationRequest, exploreTweetsRequest, getTendenciesRequest, getAllTendRequest, deleteTweetRequest } from "../api/tweetsRequests";

const TweetsContext = createContext();

export const TweetsContextProvider = ({children}) => {
    const [ se, setSe ] = useState("");
    const [session, setSession] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [retweet, setRetweet] = useState([]);
    const [tendencies, setTendencies] = useState([]);
    const [retweetLayout, setRetweetLayout] = useState(false);
    const [searchUser, setSearchUser] = useState([]);
    const [checkF, setCheckF] = useState(0);
    const [publicT, setPublicT] = useState(true);
    const [changeHomeLayout, setChangeHomeLayout] = useState(false);

    useEffect(() => {
        (async () => {
            setSession(JSON.parse(localStorage.getItem("credentials")));
            const res = await getAllUsersRequest();
            setAllUsers(res.data);
        })()
    },[setAllUsers])
   
    const createUserContext = async (accountData) => {
        await createUserRequest(accountData);
    }

    const setSessionContext = async (authenticateData) => {
        const res = await authenticateUserRequest(authenticateData);
        if(res.data !== 2){
            console.log('aca b')
            
            await localStorage.setItem("credentials", JSON.stringify(res.data));
            await setSession(JSON.parse(localStorage.getItem("credentials")));
            
            return res.data
        }else{
            console.log('aca')
            return res.data
        }
    }

    const editProfileContext = async (editData) => {
        const res = await editProfileRequest(editData);
        localStorage.clear();
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const editPasswordContext = async (editAccount) => {
        localStorage.clear();
        const res = await editPasswordRequest(editAccount);
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
    }

    const getProfileInformationContext = async (se) => {
        const ownTweets = await getProfileInformationRequest(se);
        setPublicT(true);
        setChangeHomeLayout(true);
        setTweets(ownTweets.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1))); //ultimo hecho
        setTweets(ownTweets.data);
    }

    const seeProfileContext = async (userId) => {
        setPublicT(false);
        const res = await getProfileInformationRequest(userId, session[0]._id);
        const check = await checkFollowRequest(userId);
        setChangeHomeLayout(false);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);

        if(check.status === 200){
            setCheckF(1);
        }else{
            setCheckF(0);
        }
    }

    const followContext = async (followingId) => {
        await followRequest(followingId, session[0]._id);
        setCheckF(1);
    }

    const unFollowContext = async (followingId) => {
        await unFollowRequest(followingId, session[0]._id);
        setCheckF(0);
    }

    const createTweetContext = async (tweetData) => {
        const res = await createTweetRequest(tweetData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const respondTweetContext = async (commentData) => { 
        const res = await respondTweetRequest(commentData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const answerContext = async (answerData) => {
        const res = await answerRequest(answerData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const searchContext = async (searchData) => {
        const res = await searchRequest(searchData);
        setSearchUser(res.data);
    }

    const likeContext = async (likeData) => {
        const res = await increaseLikesRequest(likeData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const likeCommentContext = async (commentLikeData) => {
        const res = await increaseCommentLikesRequest(commentLikeData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const answerLikeContext = async (answerLike) => {
        const res = await increaseAnswerLikesRequest(answerLike);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const retweetContext = async (tweetId) => {
        const res = await retweetRequest(tweetId);
        setRetweet(res.data);
        setRetweetLayout(true);
    }

    const saveTweetContext = async (tweetId) => {
        await saveTweetRequest(tweetId, session[0]._id);
    }

    const saveRetweetContext = async (retweetedData) => {
        await saveRetweetRequest(retweetedData);
        setRetweetLayout(false);
    }

    const exploreTweetsContext = async (exploreData) => {
        const res = await exploreTweetsRequest(exploreData);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const getAllTendContext = async () => {
        const res = await getAllTendRequest();
        setTendencies(res.data);
        
    }

    const getTendenciesContext = async (tendencie) => {
        const res = await getTendenciesRequest(tendencie);
        setTweets(res.data.map((ta) => ta.tweets.sort((a, b) => a.tweetDate < b.tweetDate ? 1 : -1)));
        setTweets(res.data);
    }

    const deleteTweetContext = async (userId, tweetId) => {
        console.log("eee")
        const tweetObj = {
            userId: userId,
            tweetId: tweetId
        }
        await deleteTweetRequest(tweetObj)
        setTweets(prevUsers => {
            return prevUsers.map(user => ({
              ...user,
              tweets: user.tweets.filter(tweet => tweet._id !== tweetId)
            }));
          });
      
    }

    return(
        <TweetsContext.Provider value={{
            tweets,
            se,
            setSe,
            setTweets,
            searchUser, 
            setSearchUser,
            retweet,
            tendencies,
            retweetLayout,
            publicT,
            changeHomeLayout, 
            setChangeHomeLayout,
            followContext,
            unFollowContext,
            setRetweetLayout,
            createTweetContext,
            respondTweetContext,
            answerContext,
            searchContext,
            likeContext,
            likeCommentContext,
            answerLikeContext,
            retweetContext,
            saveTweetContext,
            saveRetweetContext,
            exploreTweetsContext,
            session,
            setSession,
            allUsers,
            checkF,
            createUserContext,
            setSessionContext,
            editProfileContext,
            editPasswordContext,
            getProfileInformationContext,
            seeProfileContext,
            getAllTendContext,
            getTendenciesContext,
            deleteTweetContext
        }}>{children}</TweetsContext.Provider>
    )
}

export default TweetsContext;