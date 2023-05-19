import { Router } from "express";
import { createTweetController, deepRespondController, getProfileInformationController, increaseLikesController, increaseRetweetsController, respondTweetController, searchController, tendenciesController, getPeopleByHobbiesController } from "../controllers/tweetsController.js";

const router = Router();

router.get('/profile/:userName', getProfileInformationController);

router.post('/publicTweet', createTweetController);

router.post('/respondTweet', respondTweetController);

router.post('/responseDeepTw', deepRespondController);

router.post('/search', searchController);

router.get('/tendencies', tendenciesController);

router.put('/likesQuantity/:tweetId', increaseLikesController);

router.put('/retweetsQuantity/:tweetId', increaseRetweetsController);

router.get('/getPeopleByHobbies/:userId', getPeopleByHobbiesController);

export default router;
