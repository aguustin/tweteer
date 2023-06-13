import mongoose from "mongoose";

const tweeterSchema = new mongoose.Schema({
    userPortada: {type: String},
    userImg:{ type:String },
    userMail:{ type:String },
    userName:{ type:String },
    userDesc:{ type:String },
    password:{ type:String },
    alias:{ type:String },
    followers:[{
        followerImg: {type: String},
        followerName:{ type: String },
        followerId: { type: String },
        followerQuantity: {type: Number}
    }],
    following:[{
        followingImg: {type: String},
        followingName:{ type: String },
        followingId: { type: String },
        followingQuantity: {type: Number}
    }],
    tweets:[{
        tweetUserId: { type: String },
        tweetProfileImg:{ type:String },
        tweetUsername:{ type:String },
        tweetDate:{ type: String },
        tweetPublication:{ type:String },
        tweetImg:{ type:String },
        tweetPrivacy:{ type:String },
        tweetLikess:[{ 
            profileImgLikes:{type:String},
            userNameLikes:{type:String} 
        }],
        retweetedAdvice: {type: String},
        profileRetweetedImg: {type: String},
        retweetedUserName: {type: String},
        retweetedPublication: {type: String},
        retweetedImg: {type: String},
        retweeted: {type: Number},
        retweets:{ type:Number },
        comments:[{
            commentsUsers:{ type:String },
            commentsProfilesImg:{ type:String },
            commentsPublication:{ type:String },
            commentsDate:{ type: String },
            commentsImg:{ type: String},
            commentLikes:[{
                commentProfileLikes:{type:String},
                commentUserNameLikes:{type:String} 
            }],
            answerComments:[{
                    answerArroba:{ type:String },
                    answerProfilesImg:{ type:String },
                    answerDesc:{ type:String },
                    answerTweetImg: {type: String},
                    answerLikes:[{
                        answerUserNameLikes:{ type: String }
                    }]
            }]
        }],
        saved: [{
            savedSession: { type:String }
        }],
        hashtag: { type: String }

    }]
})

export default mongoose.model('tweets', tweeterSchema);
