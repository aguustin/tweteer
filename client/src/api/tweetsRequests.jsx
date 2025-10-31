import axios from "axios";

export const getProfileInformationRequest = (userId, sessionId) => axios.post('http://localhost:8080/tweeterio', {userId, sessionId});

export const createTweetRequest = async (tweetData) => {
    const form = new FormData()

    for(let key in tweetData){
        form.append(key, tweetData[key])
    }
    return await axios.post('http://localhost:8080/publicTweet', form, {
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
    return await axios.post('http://localhost:8080/respondTweet', form, {
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

    return await axios.post('http://localhost:8080/answerTw', form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
} 

export const retweetRequest = async (tweetId) => axios.post('http://localhost:8080/retweet', {tweetId});

export const saveTweetRequest = async (tweetId, sessionId) => axios.post('http://localhost:8080/saveTweet', {tweetId, sessionId});

export const getSavedTweetsRequest = async (sessionId) => axios.get(`http://localhost:8080/getSavedTweets/${sessionId}`);

export const saveRetweetRequest = async (retweetedData) => axios.post('http://localhost:8080/saveRetweet', retweetedData);

export const exploreTweetsRequest = async (exploreData) => axios.post('http://localhost:8080/exploreTweets', exploreData);

export const searchRequest = (searchData) => axios.post('http://localhost:8080/search', searchData);

export const increaseLikesRequest = (likeData) => axios.post('http://localhost:8080/like', likeData);

export const increaseCommentLikesRequest = (commentLikeData) => axios.post('http://localhost:8080/likeComment', commentLikeData);

export const increaseAnswerLikesRequest = (answerLike) => axios.post('http://localhost:8080/likeAnswer', answerLike);

export const increaseRetweetsRequest = (tweetId) => axios.put(`http://localhost:8080/retweets/${tweetId}`);

export const getPeopleHobbiesRequest = (userId) => axios.get(`http://localhost:8080/hobbies/${userId}`);

export const getAllTendRequest = () => axios.get('http://localhost:8080/getAllTend');

export const getTendenciesRequest = (tendencie) => axios.get(`http://localhost:8080/getTendencies/${tendencie}`);

export const getAllTweetsRequest = () => axios.get('http://localhost:8080/explore');

export const deleteTweetRequest = (tweetObj) => axios.post('http://localhost:8080/deleteTweet', tweetObj)

