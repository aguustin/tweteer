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
const sortTweetsByDate = (data) => {
  if (!Array.isArray(data)) return data;
  return data.map(user => ({
    ...user,
    tweets: [...(user.tweets || [])].sort((a, b) => {
        const dateA = new Date(a.tweetDate).getTime();
      const dateB = new Date(b.tweetDate).getTime();
      return dateB - dateA; 
    }),
  }));
};

// --- Context functions ---

const editProfileContext = async (editData) => {
  const res = await editProfileRequest(editData);
  localStorage.clear();
  localStorage.setItem("credentials", JSON.stringify(res.data));
  setSession(res.data);
  setTweets(sortTweetsByDate(res.data));
};

const editPasswordContext = async (editAccount) => {
  const res = await editPasswordRequest(editAccount);
  localStorage.clear();
  localStorage.setItem("credentials", JSON.stringify(res.data));
  setSession(res.data);
};

const getProfileInformationContext = async (se) => {
  const res = await getProfileInformationRequest(se);
  setPublicT(true);
  setChangeHomeLayout(true);
  setTweets(sortTweetsByDate(res.data));
};

const seeProfileContext = async (userId) => {
  const [res, check] = await Promise.all([
    getProfileInformationRequest(userId, session[0]._id),
    checkFollowRequest(userId),
  ]);

  setPublicT(false);
  setChangeHomeLayout(false);
  setTweets(sortTweetsByDate(res.data));
  setCheckF(check.status === 200 ? 1 : 0);
};

const followContext = async (followingId) => {
  await followRequest(followingId, session[0]._id);
  setCheckF(1);
};

const unFollowContext = async (followingId) => {
  await unFollowRequest(followingId, session[0]._id);
  setCheckF(0);
};

const createTweetContext = async (tweetData) => {
  const res = await createTweetRequest(tweetData);
  const updatedUser = res.data;

  setTweets((prev) =>
    prev.map((user) =>
      user._id === updatedUser._id
        ? {
            ...updatedUser,
            tweets: [...updatedUser.tweets].sort(
              (a, b) => new Date(b.tweetDate) - new Date(a.tweetDate)
            ),
          }
        : user
    )
  );
};

const respondTweetContext = async (commentData) => {
  const res = await respondTweetRequest(commentData);
  setTweets(sortTweetsByDate(res.data));
};

const answerContext = async (answerData) => {
  const res = await answerRequest(answerData);
  setTweets(sortTweetsByDate(res.data));
};

const searchContext = async (searchData) => {
  const res = await searchRequest(searchData);
  setSearchUser(res.data);
};

const likeContext = async (likeData) => {
  const res = await increaseLikesRequest(likeData);
  setTweets(sortTweetsByDate(res.data));
};

const likeCommentContext = async (commentLikeData) => {
  const res = await increaseCommentLikesRequest(commentLikeData);
  setTweets(sortTweetsByDate(res.data));
};

const answerLikeContext = async (answerLike) => {
  const res = await increaseAnswerLikesRequest(answerLike);
  setTweets(sortTweetsByDate(res.data));
};

const retweetContext = async (tweetId) => {
  const res = await retweetRequest(tweetId);
  setRetweet(res.data);
  setRetweetLayout(true);
};

const saveTweetContext = async (tweetId) => {
  await saveTweetRequest(tweetId, session[0]._id);
};

const saveRetweetContext = async (retweetedData) => {
  await saveRetweetRequest(retweetedData);
  setRetweetLayout(false);
};

const exploreTweetsContext = async (exploreData) => {
  const res = await exploreTweetsRequest(exploreData);
  setTweets(sortTweetsByDate(res.data));
};

const getAllTendContext = async () => {
  const res = await getAllTendRequest();
  setTendencies(res.data);
};

const getTendenciesContext = async (tendencie) => {
  const res = await getTendenciesRequest(tendencie);
  setTweets(sortTweetsByDate(res.data));
};

const deleteTweetContext = async (userId, tweetId) => {
  await deleteTweetRequest({ userId, tweetId });
  setTweets((prev) =>
    prev.map((user) =>
      user._id === userId
        ? { ...user, tweets: user.tweets.filter((t) => t._id !== tweetId) }
        : user
    )
  );
};

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