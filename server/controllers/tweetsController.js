import tweets from "../models/tweeterModel.js";
import { tweetsUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';
import mongoose from "mongoose";

export const getProfileInformationController = async (req, res) => {
   const {userId, sessionId} = req.body;
   
   if(userId && sessionId){
        const userFollows = await tweets.find({_id: userId}, {followers: { _id: sessionId }});  //buscar dentro del userId                                                        
        console.log("asd");
        if(userFollows.length > 0){ 
            console.log("asdasdasA");
            const getProfile = await tweets.find({_id: userId}).sort({"tweets.tweetPublication": -1});
            res.send(getProfile);

        }else{
            console.log("asdasdasB");
            const getEveryoneTweets = await tweets.aggregate([
            {
                $unwind: "$tweets"
            },
            {
                $match: {
                    "tweets.tweetUserId": userId,
                    "tweets.tweetPrivacy": "everyone"
                },
                
            },
            {
                $group: {
                    _id: {
                        _id:"$_id",
                        userName: "$userName"
                    },
                    count: { $sum: 1 },
                    tweets: {
                        $push: "$tweets"
                    },
                    followers: {
                        $push: "$followers"
                    },
                    following: {
                        $push: "$following"
                    }
                }
            },
            { //lo ultimo hecho ----------------------------(NO FUNCIONA LOS FOLLOWERS Y FOLLOWINGS)-------------------------------------
                $project:{
                    _id: "$_id._id",
                    userName: "$_id.userName",
                    tweets: 1,
                    followers: 1,
                    following: 1
                }
            }, //-------------------------------------------------------------------------------------------------------
            {
                $sort:{
                    "tweets.tweetPublication": -1
                }
            }
            ]);
        
            res.send(getEveryoneTweets);
        }
        
   }else{
    console.log("yy");
       const getProfile = await tweets.find({_id: userId});
       res.send(getProfile);
   }
}

export const createTweetController = async (req, res) => {
    const {userId, userImg, userName, publication, tweetPrivacy, tweetDate, hashtag} = req.body;
    const firstTweet = await tweets.find({_id: userId});
    let tweetImg;
    let sumTendencie;
    console.log("el hashtag: ", hashtag);

    if(hashtag.length > 0){
        if(firstTweet.length > 0){
            if(req.files?.tweetImg){
                const result = await tweetsUploader(req.files.tweetImg.tempFilePath);
                tweetImg = result.secure_url;
                await fs.remove(req.files.tweetImg.tempFilePath);
            }
            await tweets.updateOne(
                {_id: userId},
                {
                    $addToSet:{
                        tweets:{
                            tweetUserId: userId,
                            tweetProfileImg: userImg,
                            tweetUsername: userName,
                            tweetPublication: publication,
                            tweetImg: tweetImg,
                            tweetPrivacy: tweetPrivacy,
                            tweetDate: tweetDate,
                            retweets: 0,
                            hashtags:[{ word: hashtag }]
                        }
                    }
                }
                )
            const updateState = await tweets.find({_id: userId});
            res.send(updateState);
            
        }else{
            const saveTweet = new tweets({
                _id: userId,
                userName: userName,
                tweets:[{
                    tweetProfileImg: userImg,
                    tweetUsername: userName,
                    tweetPublication: publication,
                    tweetImg: tweetImg,
                    tweetPrivacy: tweetPrivacy,
                    tweetDate: tweetDate,
                    retweets: 0,
                    hashtags:[{ word: hashtag }] 
                }]
            })
            await saveTweet.save();
            res.send(saveTweet);
        }
        sumTendencie = await tweets.aggregate([
        {
            $project: {
                tweets: {
                $filter: {
                    input: "$tweets",
                    as:"tweets",
                    cond: {
                         $eq: ["$$tweets.hashtags.word", [hashtag]]
                    }
                    },
                }
            }
        },   
        ])

        if(sumTendencie.length > 0){
           const tweetId = sumTendencie[0].tweets[0]?._id.toString();
           const hashtagId = sumTendencie[0].tweets[0]?.hashtags[0]._id.toString();
           
            await tweets.updateOne(
                {_id: sumTendencie[0]._id},
                {
                        $inc:{
                            "tweets.$[t].hashtags.$[i].countH": 1
                        }
                },
                {
                    arrayFilters:[
                       { "t._id": tweetId },
                       { "i._id": hashtagId }
                    ]
                }
            )
        }

    }else{
    
    if(firstTweet.length > 0){
        if(req.files?.tweetImg){
            const result = await tweetsUploader(req.files.tweetImg.tempFilePath);
            tweetImg = result.secure_url;
            await fs.remove(req.files.tweetImg.tempFilePath);
        }
        await tweets.updateOne(
            {_id: userId},
            {
                $addToSet:{
                    tweets:{
                        tweetUserId: userId,
                        tweetProfileImg: userImg,
                        tweetUsername: userName,
                        tweetPublication: publication,
                        tweetImg: tweetImg,
                        tweetPrivacy: tweetPrivacy,
                        tweetDate: tweetDate,
                        retweets: 0
                    }
                }
            }
            )
        const updateState = await tweets.find({_id: userId});
        res.send(updateState);
        
    }else{
        const saveTweet = new tweets({
            _id: userId,
            userName: userName,
            tweets:[{
                tweetProfileImg: userImg,
                tweetUsername: userName,
                tweetPublication: publication,
                tweetImg: tweetImg,
                tweetPrivacy: tweetPrivacy,
                tweetDate: tweetDate,
                retweets: 0
            }]
        })
        await saveTweet.save();
        res.send(saveTweet);
    }
}
}


export const respondTweetController = async (req, res) => {
    const {tweetId, commentsUsers, commentsProfilesImg, commentsPublication, commentsDate} = req.body;
    let commentsImg;

    if(req.files?.commentsImg){
        const result = await tweetsUploader(req.files.commentsImg.tempFilePath);
        commentsImg = result.secure_url;
        await fs.remove(req.files.commentsImg.tempFilePath);
        
    }
   
    await tweets.updateOne(
        {"tweets._id" : tweetId},
        {
            $addToSet:{
                "tweets.$[a].comments":{
                    commentsUsers: commentsUsers,
                    commentsProfilesImg: commentsProfilesImg,
                    commentsPublication: commentsPublication,
                    commentsImg: commentsImg,
                    commentsDate: commentsDate
                }
            }
        },
        {arrayFilters: [
            {"a._id": tweetId}
        ]}
    )

        const actualice = await tweets.find({"tweets._id": tweetId});
        res.send(actualice);
}

export const answerController = async (req, res) => {
    const {profileId, tweetId, commentId, answerUsername, answerProfilesImg, answerPublication} = req.body;
    let answerTweetImg;
    
    if(req.files?.answerTweetImg){
        const result = await tweetsUploader(req.files.answerTweetImg.tempFilePath);
        answerTweetImg = result.secure_url;
        fs.remove(req.files.answerTweetImg.tempFilePath);
    }

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:{
                "tweets.$[t].comments.$[c].answerComments":{
                    answerArroba: answerUsername,
                    answerProfilesImg: answerProfilesImg,
                    answerDesc: answerPublication,
                    answerTweetImg: answerTweetImg
                }
            }
        },
        {arrayFilters:[
            {"t._id": tweetId},
            {"c._id": commentId}
        ]}
        )
    const updateTweets = await tweets.find({_id: profileId});

    res.send(updateTweets);
}

export const retweetController = async (req, res) => {
    const {tweetId} = req.body;
    const i = new mongoose.Types.ObjectId(tweetId);

    const getTweet = await tweets.aggregate([{
        $unwind: "$tweets"
    },
    {
        $match: {
            "tweets._id": i 
        },
        
    },
    {
        $group: {
            _id: "$_id",
            tweets: {
                $push: "$tweets"
            }
        }
    }]);
    res.send(getTweet);
}

export const saveTweetController = async (req, res) => {
    const {tweetId, sessionId} = req.body;

    const findSaveTweet = await tweets.find({
        tweets: { 
            $elemMatch: {
                _id: tweetId,
                    saved: {
                        $elemMatch: {
                            savedSession: sessionId
                        }
                    }
            }
        }
    })

    if(findSaveTweet.length > 0){
        await tweets.updateOne(
            {_id: sessionId},
            {
                $pull:{
                    "tweets.$[i].saved": {savedSession: sessionId}
                }
            },
            {
                arrayFilters:[
                    {"i._id": tweetId}
                ]
            }
        )

        res.sendStatus(200);

    }else{

        await tweets.updateOne(
            {"tweets._id": tweetId},
            {
                $addToSet:
                {
                    "tweets.$[i].saved":{
                        savedSession: sessionId
                    }
                }
            },
            {arrayFilters:[
                {"i._id": tweetId}
            ]}
        )
    
        res.sendStatus(200);
    }

}

export const getSavedTweetController = async (req, res) => { 
    const {sessionId} = req.params;

    const getSavedTweets = await tweets.aggregate([
                   {
                       $project: {
                           tweets: {
                           $filter: {
                               input: "$tweets",
                               as:"tweets",
                               cond: {
                                    $eq: ["$$tweets.saved.savedSession", [sessionId]]
                               }
                               },
                           }
                       }
                   },   
               ])

    res.send(getSavedTweets);
}


export const saveRetweetController = async (req, res) => {  
    const {userId, tweetPublication, tweetProfileImg, retweetedUserName, retweetedPublication, retweetedImg} = req.body;
    const getSessionInfo = await tweets.find({_id: userId});
   
    await tweets.updateOne(
        {_id: userId},
        {
            $addToSet:
            {
                tweets: {
                    tweetProfileImg: getSessionInfo[0].userImg,
                    tweetUsername: getSessionInfo[0].userName,
                    tweetPublication: tweetPublication,
                    tweetPrivacy: "everyone",
                    retweetedAdvice: "Retweeted",
                    profileRetweetedImg: tweetProfileImg,
                    retweetedUserName: retweetedUserName,
                    retweetedPublication: retweetedPublication,
                    retweetedImg: retweetedImg,
                    retweeted: 1
                }
            }
        }
    )

    res.sendStatus(200);
}

export const exploreTweetsController = async (req, res) => {
    const {explore, profileId} = req.body;
    const id = new mongoose.Types.ObjectId(profileId);

    const getTweets = await tweets.aggregate([
                { $match: { _id: id, "tweets.tweetPublication": { $regex: explore, $options: 'i' } } },
                {
                $project: {
                        userPortada: 1,
                        userImg: 1,
                        userName: 1,
                        userDesc: 1,
                        followers: 1,
                        following: 1,
                    tweets: {
                      $filter: {
                        input: "$tweets",
                        cond: {
                              $regexMatch: {
                                input: "$$this.tweetPublication",
                                regex: explore,
                                options: "i"
                              }
                           
                        }
                      }
                    }
                },
            }   
            ])
    
    res.send(getTweets);
}

export const searchController = async (req, res) => {
    const {search} = req.body;
    const findUsers = await tweets.find({userName:{$regex : search, $options: 'i'}});
    res.send(findUsers);
}

export const tendenciesController = async (req, res) => { 
    const findTendencies = await tweets.find().sort({"tweets.retweets":1}).limit(4);
    res.send(findTendencies);
}

export const increaseLikesController = async (req, res) => { //deberia encontrar el 648b04e0d0a79f89cd120d65 dentro de los tweetsLikess
    const { profileId, tweetId, profileImgLikes, userNameLikes, profileIdLikes } = req.body;

    const findLike = await tweets.find({
        tweets: { 
            $elemMatch: {
                _id: tweetId,
                    tweetLikess: {
                        $elemMatch: {
                            profileIdLikes: profileIdLikes
                        }
                    }
            }
        }
      })
  
    if(findLike.length > 0){
        
       await tweets.updateOne(
            {_id: profileId },
            { 
                $pull: {
                   "tweets.$[o].tweetLikess": {profileIdLikes: profileIdLikes}
                }
            },
            {
                arrayFilters:[
                    {"o._id": tweetId},
                ]
            }
        )

    const getProfile = await tweets.find({_id: profileId});
    res.send(getProfile);

    }else{
       
        await tweets.updateOne(
            {"tweets._id": tweetId},
            {
                $addToSet:{
                    "tweets.$[i].tweetLikess":{
                       profileImgLikes:  profileImgLikes,
                       userNameLikes: userNameLikes,
                       profileIdLikes: profileIdLikes
                   }
                }
            },
            {
                arrayFilters:[
                    {"i._id": tweetId}
                ]
            }
        )
        const updateLikes = await tweets.find({_id: profileId});
        res.send(updateLikes);
    }

}

export const increaseCommentLikesController = async (req, res) => {
    const {profileId, tweetId, commentId, commentProfileLikes, commentUserNameLikes} = req.body;
    
    const findCommentLike = await tweets.find({
        tweets:{
            $elemMatch:{
                _id: tweetId,
                    comments:{
                        $elemMatch:{
                            _id: commentId,
                            commentLikes:{
                                $elemMatch:{
                                    commentProfileId: profileId
                                }
                            }
                        }
                    }
            }
        }
    })

    if(findCommentLike.length > 0){
        await tweets.updateOne(
            {_id: profileId},
            {
                $pull:{
                    "tweets.$[i].comments.$[x].commentLikes": {commentProfileId: profileId}
                }
            },
            {
                arrayFilters:[
                    {"i._id": tweetId},
                    {"x._id": commentId}
                ]
            }
        )

        const updateCommentLike = await tweets.find({_id: profileId});
        res.send(updateCommentLike);

    }else{
        await tweets.updateOne(
            {"tweets._id": tweetId},
            {
                $addToSet:
                {
                    "tweets.$[t].comments.$[i].commentLikes":{
                        commentProfileId: profileId,
                        commentProfileLikes: commentProfileLikes,
                        commentUserNameLikes: commentUserNameLikes
                    }
                }
            },
            {
                arrayFilters:[
                    {"t._id": tweetId},
                    {"i._id": commentId}
                ]
            }
        )
        const updateCommentLike = await tweets.find({_id: profileId});
        res.send(updateCommentLike);
    }


}

export const increaseAnswerLikesController = async (req, res) => {
    const {profileId, tweetId, commentId, answerId, answerUserNameLikes} = req.body;
  
    const findAnswerLike = await tweets.find({
        tweets:{
            $elemMatch:{
                _id: tweetId,
                    comments:{
                        $elemMatch:{
                        _id: commentId,
                        answerComments:{
                            $elemMatch:{
                                _id: answerId,
                                answerLikes:{
                                    $elemMatch:{
                                        answerProfileId: profileId
                                    }
                                }
                            }
                        }
                    } 
                }
            }
        }
    })
   

if(findAnswerLike.length > 0){
    
    await tweets.updateOne(
        {_id: profileId},
        {
            $pull:{
                "tweets.$[i].comments.$[x].answerComments.$[a].answerLikes": {answerProfileId: profileId}
            }
        },
        {
            arrayFilters:[
                {"i._id": tweetId},
                {"x._id": commentId},
                {"a._id": answerId}
            ]
        }
    )
    
    const updateCommentLike = await tweets.find({_id: profileId});
    res.send(updateCommentLike);

}else{

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:
            {
                "tweets.$[t].comments.$[c].answerComments.$[a].answerLikes":{
                    answerProfileId: profileId,
                    answerUserNameLikes: answerUserNameLikes
                }
            }
        },
        {
            arrayFilters:[
                {"t._id": tweetId},
                {"c._id": commentId},
                {"a._id": answerId}
            ]
        }
    )
    
    const updateAnswerLike = await tweets.find({_id: profileId});
    res.send(updateAnswerLike);
}


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

export const getAllTendController = async (req, res) => {
    const tendencies = await tweets.aggregate([
        { $unwind: "$tweets" },
        { $match: { "tweets.hashtags.word": { $ne: "null" } } },
        { $group: {
            _id: "$tweets.hashtags",
        }},
        { $limit: 7 }
    ])
  
    res.send(tendencies);

}

export const getTendenciesController = async (req, res) => {
    const {tendencie} = req.params;
    const getTendencies = await tweets.aggregate([{
        $project: {
            tweets: {
            $filter: {
                input: "$tweets",
                as:"tweets",
                cond: {
                     $eq: ["$$tweets.hashtags.word", [tendencie]]
                }
                }
            }
        }
    }
])
    res.send(getTendencies);
}

export const getAllTweetsController = async (req, res) => {
    const getAllTweets = await tweets.find({});
    res.send(getAllTweets);
}

export const deleteAllController = async (req, res) => {
    await tweets.deleteMany();
    res.sendStatus(200);
}