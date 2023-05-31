import tweets from "../models/tweeterModel.js";
import { tweetsUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const getProfileInformationController = async (req, res) => {
   const {userId} = req.body;
   const getProfile = await tweets.find({_id: userId});

   res.send(getProfile);
}

export const createTweetController = async (req, res) => {
    const {userId, userImg, userName, publication, tweetPrivacy} = req.body;
    const firstTweet = await tweets.find({_id: userId});
    let tweetImg;

    if(firstTweet.length > 0){
        if(req.files.tweetImg){
            const result = await tweetsUploader(req.files.tweetImg.tempFilePath);
            tweetImg = result.secure_url;
            await fs.remove(req.files.tweetImg.tempFilePath);
        }
        await tweets.updateOne(
            {_id: userId},
            {
                $addToSet:{
                    tweets:{
                        tweetProfileImg: userImg,
                        tweetUsername: userName,
                        tweetPublication: publication,
                        tweetImg: tweetImg,
                        tweetPrivacy: tweetPrivacy,
                        tweetLikes: 0,
                        tweetComments: 0,
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
                tweetLikes: 0,
                tweetComments: 0,
                retweets: 0
            }]
        })
        await saveTweet.save();
        res.send(saveTweet);
    }
}


export const respondTweetController = async (req, res) => {
    const {tweetId, commentsUsers, commentsProfilesImg, commentsPublication} = req.body;
    let commentsImg;

    if(req.files.commentsImg){
        const result = await tweetsUploader(req.files.commentsImg.tempFilePath);
        commentsImg = result.secure_url;
        await fs.remove(req.files.tweetsUploader.tempFilePath);
    }
   
    await tweets.updateOne(
        {"tweets._id" : tweetId},
        {
            $addToSet:{
                "tweets.$[a].comments":{
                    commentsUsers: commentsUsers,
                    commentsProfilesImg: commentsProfilesImg,
                    commentsPublication: commentsPublication,
                    commentsImg: commentsImg
                }
            }
        },
        {arrayFilters: [
            {"a._id": tweetId}
        ]}
    )

        const actualice = await tweets.find({"tweets._id": tweetId});
        console.log(actualice);
        res.send(actualice);
}

export const answerController = async (req, res) => {
    const {profileId, tweetId, commentId, answerUsername, answerProfilesImg, answerPublication} = req.body;
    let answerTweetImg;
    
    if(req.files.answerTweetImg){
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

    const findLike = await tweets.find(
        {"tweets.$[i].tweetLikes": {userNameLikes: userNameLikes}},  //revisar como encontrar si el usuario esta en los likes para no sumarlo nuevamente
        {
            arrayFilters:[
                {"i._id": tweetId}
            ]
        }
    )
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

    /*const findLike = await tweets.find(                             //revisar como encontrar si el usuario esta en los likes para no sumarlo nuevamente
        {"tweets.tweetLikes": {userNameLikes: userNameLikes}}
    )*/

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

export const getPeopleByHobbiesController = async (req, res) => {
    const {userId} = req.params;

    const findUserId = await tweets.find({_id: userId});

    const getPeople = await tweets.find({
        $expr: {
          $gt: [
            {
              $arrayElemAt: [ { $arrayElemAt: [ "userHobbies", 0, 1, 2, 3, 4 ] }, findUserId[0].hobbieA ]
            },
            {
              $arrayElemAt: [ { $arrayElemAt: [ "userHobbies", 0, 1, 2, 3, 4  ] }, findUserId[0].hobbieB ]
            },
            {
                $arrayElemAt: [ { $arrayElemAt: [ "userHobbies", 0, 1, 2, 3, 4 ] }, findUserId[0].hobbieC ]
            },
            {
                $arrayElemAt: [ { $arrayElemAt: [ "userHobbies", 0, 1, 2, 3, 4 ] }, findUserId[0].hobbieD ]
            },
            {
                $arrayElemAt: [ { $arrayElemAt: [ "userHobbies", 0, 1, 2, 3, 4 ] }, findUserId[0].hobbieE ]
            },
          ]
        }
      })

    res.send(getPeople);
}
