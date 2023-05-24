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
        followerName:{ type: String },
        userId: { type: String }
    }],
    following:[{
        followingName:{ type: String },
        userId: { type: String }
    }],
    tweets:[{
        tweetUsername:{ type:String },
        tweetDate:{ type: Date },
        tweetProfileImg:{ type:String },
        tweetPublication:{ type:String },
        tweetImg:{ type:String },
        tweetPrivacy:{ type:String },
        tweetLikes:{ type:Number },
        tweetComments:{ type:Number },
        retweets:{ type:Number },
        comments:[{
            commentsUsers:{ type:String },
            commentsProfilesImg:{ type:String },
            commentsPublication:{ type:String },
            commentsDate:{ type: Date},
            deepComments:[{
                    deepArroba:{ type:String },
                    deepProfilesImg:{ type:String },
                    deepDesc:{ type:String }
            }]
        }]
    }]
})

export default mongoose.model('tweets', tweeterSchema);
