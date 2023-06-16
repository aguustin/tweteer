import tweets from "../models/tweeterModel.js";
import { tweetsUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';
import mongoose from "mongoose";

export const getProfileInformationController = async (req, res) => {
   const {userId, sessionId} = req.body;
 
   if(sessionId){
        const userFollows = await tweets.find({followers: {_id: sessionId}});                                                          
      
        if(userFollows !== 0){ 
            console.log("follows");
            const getProfile = await tweets.find({_id: userId}).sort({ tweets: { _id: -1 } });
            res.send(getProfile);
        }else{
          
            console.log("no follow");
            const getEveryoneTweets = await tweets.aggregate([{
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
                    _id: "$_id",
                    tweets: {
                        $push: "$tweets"
                    }
                }
            },
            { 
                $sort : { "tweets._id" : -1}
            }]);
        
            res.send(getEveryoneTweets);
        }

   }else{
       const getProfile = await tweets.find({_id: userId});
       res.send(getProfile);
   }
}

export const createTweetController = async (req, res) => {
    const {userId, userImg, userName, publication, tweetPrivacy, tweetDate, hashtag} = req.body;
    const firstTweet = await tweets.find({_id: userId});
    let tweetImg;
    let sumTendencie;

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
                            tweetLikess: 0,
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
                        tweetLikess: 0,
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

export const increaseLikesController = async (req, res) => {
    const { profileId, tweetId, profileImgLikes, userNameLikes } = req.body;

        await tweets.updateOne(
            {"tweets._id": tweetId},
            {
                $addToSet:{
                    "tweets.$[i].tweetLikess":{
                       profileImgLikes:  profileImgLikes,
                       userNameLikes: userNameLikes
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

export const increaseCommentLikesController = async (req, res) => {
    const {profileId, tweetId, commentId, commentProfileLikes, commentUserNameLikes} = req.body;

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:
            {
                "tweets.$[t].comments.$[i].commentLikes":{
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

export const increaseAnswerLikesController = async (req, res) => {
    const {profileId, tweetId, commentId, answerId, answerUserNameLikes} = req.body;

    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:
            {
                "tweets.$[t].comments.$[c].answerComments.$[a].answerLikes":{
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
        /*{
            $sort: { "tweets.hashtags.countH": 1 }
        },*/
        {
            $project:{
                tweets:{
                    $filter:{
                        input:"$tweets",
                        as:"tweets",
                        cond:{
                            $ne: ["$$tweets.hashtags.countH", []]
                        },
                    },
                },
            }
        },
        /*{
            $match: {
                $nor: [
                    { tweets: { $exists: false } },
                    { tweets: { $size: 0 } }
                ]
            }
        },*/
        {
            $limit: 6
        }
    ]).sort({ tweets: { hashtags: { countH: -1 } } });
    //const sortingTendencies = await tendencies.sort()
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

export const deleteAllController = async (req, res) => {
    await tweets.deleteMany();
    res.sendStatus(200);
}