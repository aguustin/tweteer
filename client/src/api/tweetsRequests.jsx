import axios from "axios";

export const getProfileInformationRequest = (userId) => axios.post('/tweeterio', {userId});

export const createTweetRequest = (tweetData) => {
    const form = new FormData()

    for(let key in tweetData){
        form.append(key, tweetData[key])
    }
    axios.post('/publicTweet', tweetData);               // SEGUIR DESDE ACAA --------------------------------------------------------------------------------------
}

export const respondTweetRequest = (commentData) => axios.post('/respondTweet', commentData);

export const answerRequest = (answerData) => axios.post('/answerTw', answerData);

export const searchRequest = (searchData) => axios.post('/search', searchData, console.log(searchData));

export const increaseLikesRequest = (likeData) => axios.post('/like', likeData);

export const increaseRetweetsRequest = (tweetId) => axios.put(`/retweets/${tweetId}`);

export const getPeopleHobbiesRequest = (userId) => axios.get(`/hobbies/${userId}`);
