import mongoose from "mongoose";

const tweeterSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    userImg:{
        type:String
    },
    userName:{
        type:String
    },
    userDesc:{
        type:String
    },
    tweets:[{
        tweetUsername:{
            type:String
        },
        tweetProfileImg:{
            type:String
        },
        tweetPublication:{
            type:String
        },
        tweetImg:{
            type:String
        },
        tweetLikes:{
            type:Number
        },
        tweetCommentsQuantity:{
            type:Number
        },
        retweets:{
            type:Number
        },
        comments:[{
            commentsUsers:{
                type:String
            },
            commentsProfilesImg:{
                type:String
            },
            commentsPublication:{
                type:String
            },
            commentsQuantity:{
                type:Number
            },
            commentsLikes:{
                type:Number
            },
            deepComments:[{
                    deepArroba:{
                        type:String
                    },
                    deepProfilesImg:{
                        type:String
                    },
                    deepDesc:{
                        type:String
                    },
                    deepLikes:{
                        type:Number
                    }
            }]
        }]
    }]
})

export default mongoose.model('tweets', tweeterSchema);

/* userImg:{
        type:String
    },*/