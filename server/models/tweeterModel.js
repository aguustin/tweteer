import mongoose from "mongoose";

const tweeterSchema = new mongoose.Schema({
    userPortada: {type: String},
    userImg:{ type:String },
    userMail:{ type:String },
    userName:{ type:String },
    userDesc:{ type:String },
    password:{ type:String },
    alias:{ type:String },
    userHobbies:[{
        hobbieA:{ type:String },
        hobbieB:{ type:String },
        hobbieC:{ type:String },
        hobbieD:{ type:String },
        hobbieE:{ type:String },
    }],
    followers:[{
        followerImg: {type: String},
        followerName:{ type: String },
        followerId: { type: String }
    }],
    following:[{
        followingImg: {type: String},
        followingName:{ type: String },
        followingId: { type: String }
    }],
    tweets:[{
        tweetUserId: { type: String },
        tweetUsername:{ type:String },
        tweetDate:{ type: Date },
        tweetProfileImg:{ type:String },
        tweetPublication:{ type:String },
        tweetImg:{ type:String },
        tweetPrivacy:{ type:String },
        tweetLikess:[{ 
            profileImgLikes:{type:String},
            userNameLikes:{type:String} 
        }],
        tweetComments:{ type:Number },
        retweets:{ type:Number },
        comments:[{
            commentsUsers:{ type:String },
            commentsProfilesImg:{ type:String },
            commentsPublication:{ type:String },
            commentsDate:{ type: Date},
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
        }]
    }]
})

export default mongoose.model('tweets', tweeterSchema);
