import tweets from "../models/tweeterModel.js";

export const getProfileInformationController = async (req, res) => {
   const {userName} = req.params;
   const getProfile = await tweets.find({userName: userName});

   res.send(getProfile);
}

export const createTweetController = async (req, res) => {
    const {userId, photo, userName, publication, tweetImg} = req.body;

    const firstTweet = await tweets.find({userId: userId});

    if(firstTweet.length > 0){
        await tweets.updateOne(
            {userId: userId},
            {
                $addToSet:{
                    tweets:{
                        tweetProfileImg: photo,
                        tweetUsername: userName,
                        tweetPublication: publication,
                        tweetImg: tweetImg
                    }
                }
            }
            )
        res.sendStatus(200);
       
    }else{
        const saveTweet = await tweets({
            userId: userId,
            userName: userName,
            tweets:[{
                tweetProfileImg: photo,
                tweetUsername: userName,
                tweetPublication:publication,
                tweetImg: tweetImg
            }]
        })
        await saveTweet.save();
        res.send(saveTweet);
    }
}


export const respondTweetController = async (req, res) => {
    const {tweetId, userComment, commentsProfilesImg, commentsPublication} = req.body;
   
    await tweets.updateOne(
        {"tweets._id" : tweetId},
        {
            $addToSet:{
                "tweets.$[a].comments":{
                    commentsUsers: userComment,
                    commentsProfilesImg: commentsProfilesImg,
                    commentsPublication: commentsPublication
                }
            }
        },
        {arrayFilters: [
            {"a._id": tweetId}
        ]},
        {
        $inc:{ //todavia no funciona
            "tweets.$.tweetCommentsQuantity": 1 
        }
        }
    )
        res.sendStatus(200);
}

export const deepRespondController = async (req, res) => {
    const {tweetId, commentId, deepUsername, deepProfilesImg, deepPublication} = req.body;

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:{
                "tweets.$[t].comments.$[c].deepComments":{
                    commentsQuantity: {$inc: 1},
                    deepArroba: deepUsername,
                    deepProfilesImg: deepProfilesImg,
                    deepDesc: deepPublication
                }
            }
        },
        {arrayFilters:[
            {"t._id": tweetId},
            {"c._id": commentId}
        ]}
        )
        res.sendStatus(200);
}

export const searchController = async (req, res) => {
    const {search} = req.body;
    const findUsers = await tweets.find({userName:{$regex : search, $options: 'i'}});

    res.send(findUsers);
}

export const tendenciesController = async (req, res) => { 
    const findTendencies = await tweets.find(
        {}
    );  //.sort({"tweets.retweets":1}).limit(5)

    res.send(findTendencies);
}

export const increaseLikesController = async (req, res) => {
    const {tweetId} = req.params;

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
           $inc:{
            "tweets.$.tweetLikes": 1
           }
        }
    )
    res.sendStatus(200);
}

export const increaseRetweetsController = async (req, res) => {
    const {tweetId} = req.params;

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
           $inc:{
            "tweets.$.retweets": 1
           }
        }
    )
  
    res.sendStatus(200);
}
