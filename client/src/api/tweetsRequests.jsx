import axios from "axios";

export const getProfileInformationRequest = (userId, sessionId) => axios.post(`${process.env.REACT_APP_BACK_URL}/tweeterio`, {userId, sessionId});

export const createTweetRequest = async (tweetData) => {
    const form = new FormData()

    for (let key in tweetData) {
    if (key === "hashtag" && Array.isArray(tweetData[key])) {
     
      form.append(key, JSON.stringify(tweetData[key]));
    } else if (tweetData[key] !== undefined && tweetData[key] !== null) {
     
      form.append(key, tweetData[key]);
    }
  }

  return await axios.post(
    `${process.env.REACT_APP_BACK_URL}/publicTweet`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export const respondTweetRequest = async (commentData) => {
    const form = new FormData();

    for(let key in commentData){
        form.append(key, commentData[key])
    }
    return await axios.post(`${process.env.REACT_APP_BACK_URL}/respondTweet`, form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
} 
    

export const answerRequest = async (answerData) => {
    const form = new FormData();

    for(let key in answerData){
        form.append(key, answerData[key]);
    }

    return await axios.post(`${process.env.REACT_APP_BACK_URL}/answerTw`, form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
} 

export const retweetRequest = async (tweetId) => axios.post(`${process.env.REACT_APP_BACK_URL}/retweet`, {tweetId});

export const saveTweetRequest = async (tweetId, sessionId) => axios.post(`${process.env.REACT_APP_BACK_URL}/saveTweet`, {tweetId, sessionId});

export const getSavedTweetsRequest = async (sessionId) => axios.get(`${process.env.REACT_APP_BACK_URL}/getSavedTweets/${sessionId}`);

export const saveRetweetRequest = async (retweetedData) => axios.post(`${process.env.REACT_APP_BACK_URL}/saveRetweet`, retweetedData);

export const exploreTweetsRequest = async (exploreData) => axios.post(`${process.env.REACT_APP_BACK_URL}/exploreTweets`, exploreData);

export const searchRequest = (searchData) => axios.post(`${process.env.REACT_APP_BACK_URL}/search`, searchData);

export const increaseLikesRequest = (likeData) => axios.post(`${process.env.REACT_APP_BACK_URL}/like`, likeData);

export const increaseCommentLikesRequest = (commentLikeData) => axios.post(`${process.env.REACT_APP_BACK_URL}/likeComment`, commentLikeData);

export const increaseAnswerLikesRequest = (answerLike) => axios.post(`${process.env.REACT_APP_BACK_URL}/likeAnswer`, answerLike);

export const increaseRetweetsRequest = (tweetId) => axios.put(`${process.env.REACT_APP_BACK_URL}/retweets/${tweetId}`);

export const getPeopleHobbiesRequest = (userId) => axios.get(`${process.env.REACT_APP_BACK_URL}/hobbies/${userId}`);

export const getAllTendRequest = () => axios.get(`${process.env.REACT_APP_BACK_URL}/getAllTend`);

export const getTendenciesRequest = (tendencie) => axios.get(`${process.env.REACT_APP_BACK_URL}/getTendencies/${tendencie}`);

export const getAllTweetsRequest = (page = 1) => axios.get(`${process.env.REACT_APP_BACK_URL}/explore?page=${page}&limit=20`);

export const getFeedRequest = (page = 1) => axios.get(`${process.env.REACT_APP_BACK_URL}/feed?page=${page}&limit=30`);

export const deleteTweetRequest = (tweetObj) => axios.post(`${process.env.REACT_APP_BACK_URL}/deleteTweet`, tweetObj)

