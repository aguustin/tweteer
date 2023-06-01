import { createContext, useState, useEffect } from "react";
import { authenticateUserRequest, createUserRequest, editPasswordRequest, editProfileRequest, followRequest, checkFollowRequest, unFollowRequest, getAllUsersRequest } from "../api/userRequests";
import { createTweetRequest, respondTweetRequest, searchRequest, answerRequest, retweetRequest, saveRetweetRequest, increaseLikesRequest, increaseCommentLikesRequest, increaseAnswerLikesRequest, getProfileInformationRequest } from "../api/tweetsRequests";

const TweetsContext = createContext();

export const TweetsContextProvider = ({children}) => {

    const [session, setSession] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [retweet, setRetweet] = useState([]);
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
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));

        return 1
    }

    const editProfileContext = async (editData) => {
        const res = await editProfileRequest(editData);
        localStorage.clear();
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
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
        console.log(publicT);
        setChangeHomeLayout(true);
        setTweets(ownTweets.data);
    }

    const seeProfileContext = async (userId) => {
        setPublicT(false);
        const res = await getProfileInformationRequest(userId, session[0]._id); //intentar hacer el controlador de privacidad dentro de este
        const check = await checkFollowRequest(userId);
        console.log(check.status);
        setChangeHomeLayout(false);
        setTweets(res.data);

        if(check.status === 200){
            console.log("asd");  //posibilidad haciendo otro controlador que tenga la funcion de ver si el usuario sigue al otro usuario y  traer todos los tweets o solo los publicos
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
        setTweets(res.data);
    }

    const respondTweetContext = async (commentData) => { 
        const res = await respondTweetRequest(commentData);
        setTweets(res.data);
    }

    const answerContext = async (answerData) => {
        const res = await answerRequest(answerData);
        setTweets(res.data);
    }

    const searchContext = async (searchData) => {
        const res = await searchRequest(searchData);
        setSearchUser(res.data);
    }

    const likeContext = async (likeData) => {
        const res = await increaseLikesRequest(likeData);
        setTweets(res.data);
    }

    const likeCommentContext = async (commentLikeData) => {
        const res = await increaseCommentLikesRequest(commentLikeData);
        setTweets(res.data);
    }

    const answerLikeContext = async (answerLike) => {
        const res = await increaseAnswerLikesRequest(answerLike);
        setTweets(res.data);
    }

    const retweetContext = async (tweetId) => {
        const res = await retweetRequest(tweetId);
        setRetweet(res.data);
        setRetweetLayout(true);
    }

    const saveRetweetContext = async (retweetedData) => {
        const res = await saveRetweetRequest(retweetedData);
        setTweets(res.data);
    }

    const tendenciesContext = async () => {

    }

    const getPeopleByHobbiesContext = async () => {

    }

    return(
        <TweetsContext.Provider value={{
            tweets,
            setTweets,
            searchUser, 
            setSearchUser,
            retweet,
            retweetLayout,
            publicT,
            changeHomeLayout, 
            setChangeHomeLayout,
            followContext,
            unFollowContext,
            createTweetContext,
            respondTweetContext,
            answerContext,
            searchContext,
            likeContext,
            likeCommentContext,
            answerLikeContext,
            retweetContext,
            saveRetweetContext,
            tendenciesContext,
            getPeopleByHobbiesContext,
            session,
            setSession,
            allUsers,
            checkF,
            createUserContext,
            setSessionContext,
            editProfileContext,
            editPasswordContext,
            getProfileInformationContext,
            seeProfileContext
        }}>{children}</TweetsContext.Provider>
    )
}

export default TweetsContext;