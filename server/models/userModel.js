import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userMail:{
        type:String
    },
    userName:{
        type:String
    },
    profilePhoto:{
        type:String
    },
    password:{
        type:String
    },
    alias:{
        type:String
    }
});

export default mongoose.model('users', userSchema);