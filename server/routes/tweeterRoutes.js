import { Router } from "express";
import {  getProfileController, createTweetController, deepRespondController, getProfileInformationController, increaseLikesController, increaseRetweetsController, respondTweetController, searchController, tendenciesController, getPeopleByHobbiesController } from "../controllers/tweetsController.js";

const router = Router();

router.get('/tweeterio/:userId', getProfileController);

router.get('/profile/:userId', getProfileInformationController);

router.post('/publicTweet', createTweetController);

router.post('/respondTweet', respondTweetController);

router.post('/responseDeepTw', deepRespondController);

router.post('/search', searchController);

router.get('/tendencies', tendenciesController);

router.put('/like/:tweetId', increaseLikesController);

router.put('/retweets/:tweetId', increaseRetweetsController);

router.get('/hobbies/:userId', getPeopleByHobbiesController);

export default router;
