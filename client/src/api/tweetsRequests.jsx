import axios from "axios";

export const getProfileInformationRequest = (userId) => axios.post('/tweeterio', {userId});

export const createTweetRequest = (tweetData) => axios.post('/publicTweet', tweetData);

export const respondTweetRequest = (commentData) => axios.post('/respondTweet', commentData);

export const deepRespondRequest = (deepRespondData) => axios.post('/responseDeepTw', deepRespondData);

export const searchRequest = (searchData) => axios.post('/search', searchData, console.log(searchData));

export const increaseLikesRequest = (tweetId) => axios.put(`/like/${tweetId}`);

export const increaseRetweetsRequest = (tweetId) => axios.put(`/retweets/${tweetId}`);

export const gerPeopleHobbiesRequest = (userId) => axios.get(`/hobbies/${userId}`);
