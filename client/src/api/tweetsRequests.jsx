import axios from "axios";

export const getProfileInformationRequest = (userId, sessionId) => axios.post('/tweeterio', {userId, sessionId});

export const createTweetRequest = async (tweetData) => {
    const form = new FormData()

    for(let key in tweetData){
        form.append(key, tweetData[key])
    }
    return await axios.post('/publicTweet', form, {
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
    return await axios.post('/respondTweet', form, {
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

    return await axios.post('/answerTw', form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
} 

export const retweetRequest = async (tweetId) => axios.post('/retweet', {tweetId});

export const saveTweetRequest = async (tweetId, sessionId) => axios.post('/saveTweet', {tweetId, sessionId});

export const getSavedTweetsRequest = async (sessionId) => axios.get(`/getSavedTweets/${sessionId}`);

export const saveRetweetRequest = async (retweetedData) => axios.post('/saveRetweet', retweetedData);

export const exploreTweetsRequest = async (exploreData) => axios.post('/exploreTweets', exploreData);

export const searchRequest = (searchData) => axios.post('/search', searchData, console.log(searchData));

export const increaseLikesRequest = (likeData) => axios.post('/like', likeData);

export const increaseCommentLikesRequest = (commentLikeData) => axios.post('/likeComment', commentLikeData);

export const increaseAnswerLikesRequest = (answerLike) => axios.post('/likeAnswer', answerLike);

export const increaseRetweetsRequest = (tweetId) => axios.put(`/retweets/${tweetId}`);

export const getPeopleHobbiesRequest = (userId) => axios.get(`/hobbies/${userId}`);

export const  getTendenciesRequest = () => axios.get('/getTendencies');

