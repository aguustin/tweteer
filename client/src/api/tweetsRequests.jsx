import axios from "axios";

export const getProfileInformationRequest = (userId, sessionId) => axios.post('https://tweteer.onrender.com/tweeterio', {userId, sessionId});

export const createTweetRequest = async (tweetData) => {
    const form = new FormData()

    for(let key in tweetData){
        form.append(key, tweetData[key])
    }
    return await axios.post('https://tweteer.onrender.com/publicTweet', form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const respondTweetRequest = async (commentData) => {
    const form = new FormData();

    for(let key in commentData){
        form.append(key, commentData[key])
    }
    return await axios.post('https://tweteer.onrender.com/respondTweet', form, {
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

    return await axios.post('https://tweteer.onrender.com/answerTw', form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
} 

export const retweetRequest = async (tweetId) => axios.post('https://tweteer.onrender.com/retweet', {tweetId});

export const saveTweetRequest = async (tweetId, sessionId) => axios.post('https://tweteer.onrender.com/saveTweet', {tweetId, sessionId});

export const getSavedTweetsRequest = async (sessionId) => axios.get(`https://tweteer.onrender.com/getSavedTweets/${sessionId}`);

export const saveRetweetRequest = async (retweetedData) => axios.post('https://tweteer.onrender.com/saveRetweet', retweetedData);

export const exploreTweetsRequest = async (exploreData) => axios.post('https://tweteer.onrender.com/exploreTweets', exploreData);

export const searchRequest = (searchData) => axios.post('https://tweteer.onrender.com/search', searchData);

export const increaseLikesRequest = (likeData) => axios.post('https://tweteer.onrender.com/like', likeData);

export const increaseCommentLikesRequest = (commentLikeData) => axios.post('https://tweteer.onrender.com/likeComment', commentLikeData);

export const increaseAnswerLikesRequest = (answerLike) => axios.post('https://tweteer.onrender.com/likeAnswer', answerLike);

export const increaseRetweetsRequest = (tweetId) => axios.put(`https://tweteer.onrender.com/retweets/${tweetId}`);

export const getPeopleHobbiesRequest = (userId) => axios.get(`https://tweteer.onrender.com/hobbies/${userId}`);

export const getAllTendRequest = () => axios.get('https://tweteer.onrender.com/getAllTend');

export const getTendenciesRequest = (tendencie) => axios.get(`https://tweteer.onrender.com/getTendencies/${tendencie}`);

export const getAllTweetsRequest = () => axios.get('https://tweteer.onrender.com/explore');

export const deleteTweetRequest = (tweetObj) => axios.post('https://tweteer.onrender.com/deleteTweet', tweetObj)

