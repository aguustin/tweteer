import { Router } from "express";
import { createTweetController,
     answerController, 
     getProfileInformationController, 
     increaseLikesController, 
     increaseCommentLikesController,
     increaseAnswerLikesController, 
     increaseRetweetsController, 
     respondTweetController, 
     searchController, 
     tendenciesController, 
     getPeopleByHobbiesController } from "../controllers/tweetsController.js";

const router = Router();

router.post('/tweeterio', getProfileInformationController);

router.post('/publicTweet', createTweetController);

router.post('/respondTweet', respondTweetController);

router.post('/answerTw', answerController);

router.post('/search', searchController);

router.get('/tendencies', tendenciesController);

router.post('/like', increaseLikesController);

router.post('/likeComment', increaseCommentLikesController);

router.post('/likeAnswer', increaseAnswerLikesController);

router.put('/retweets/:tweetId', increaseRetweetsController);

router.get('/hobbies/:userId', getPeopleByHobbiesController);

export default router;
