import tweets from "../models/tweeterModel.js";
import { tweetsUploader } from "../libs/cloudinary.js";

export const getProfileInformationController = async (req, res) => {
   const {userId} = req.body;
   const getProfile = await tweets.find({_id: userId});

   res.send(getProfile);
}

export const createTweetController = async (req, res) => {
    const {userId, userImg, userName, publication, tweetImg, tweetPrivacy} = req.body;
    const firstTweet = await tweets.find({_id: userId});

    if(firstTweet.length > 0){
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
   
    await tweets.updateOne(
        {"tweets._id" : tweetId},
        {
            $addToSet:{
                "tweets.$[a].comments":{
                    commentsUsers: commentsUsers,
                    commentsProfilesImg: commentsProfilesImg,
                    commentsPublication: commentsPublication
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
    console.log(profileId, " ", tweetId, " ", commentId, " ", answerUsername);
    await tweets.updateOne(
        {"tweets._id": tweetId},
        {
            $addToSet:{
                "tweets.$[t].comments.$[c].answerComments":{
                    answerArroba: answerUsername,
                    answerProfilesImg: answerProfilesImg,
                    answerDesc: answerPublication
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
    const findTendencies = await tweets.find(
        {}
    );  //.sort({"tweets.retweets":1}).limit(5)

    res.send(findTendencies);
}

export const increaseLikesController = async (req, res) => {
    const { profileId, tweetId, profileImgLikes, userNameLikes } = req.body;

    const findLike = await tweets.find(
        {"tweets.tweetLikes": {userNameLikes: userNameLikes}}
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
            {arrayFilters:[
                {"i._id": tweetId}
            ]}
        )

        const updateLikes = await tweets.find({_id: profileId});
        res.send(updateLikes);
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
