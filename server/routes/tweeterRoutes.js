import { Router } from "express";
import { createTweetController,
     answerController,
     retweetController,
     saveRetweetController, 
     getProfileInformationController, 
     increaseLikesController, 
     increaseCommentLikesController,
     increaseAnswerLikesController, 
     increaseRetweetsController, 
     respondTweetController, 
     exploreTweetsController,
     searchController,
     saveTweetController,
     getSavedTweetController, 
     tendenciesController,
     getTendenciesController 
     } from "../controllers/tweetsController.js";

const router = Router();

router.post('/tweeterio', getProfileInformationController);

router.post('/publicTweet', createTweetController);

router.post('/respondTweet', respondTweetController);

router.post('/answerTw', answerController);

router.post('/retweet', retweetController);

router.post('/saveTweet', saveTweetController);

router.get('/getSavedTweets/:sessionId', getSavedTweetController);

router.post('/saveRetweet', saveRetweetController);

router.post('/exploreTweets', exploreTweetsController);

router.post('/search', searchController);

router.get('/tendencies', tendenciesController);

router.post('/like', increaseLikesController);

router.post('/likeComment', increaseCommentLikesController);

router.post('/likeAnswer', increaseAnswerLikesController);

router.put('/retweets/:tweetId', increaseRetweetsController);

router.get('/getTendencies', getTendenciesController);

export default router;
