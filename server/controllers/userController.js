import tweets from "../models/tweeterModel.js";
import bcrypt from "bcrypt";
import { profileUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const getUsersController = async (req, res) => {
    const getAllUsers = await tweets.find();
    res.send(getAllUsers);
}

export const createUserController = async (req, res) => {
    const {userMail, userName, password, repitePassword} = req.body;
    const userExist = await tweets.find({userMail: userMail});

    if(userExist.length <= 0){
        if(password === repitePassword){
            const hashedPass = await bcrypt.hash(password, 12);

            if(req.files){
                const createUser = new tweets({
                    userMail: userMail,
                    userName: userName,
                    profilePhoto: profilePhoto,
                    password: hashedPass
                })
                await createUser.save();
                res.send(createUser);
            }else{
                const createUser = new tweets({
                    userMail: userMail,
                    userName: userName,
                    password: hashedPass
                })
                await createUser.save();
                res.send(createUser);
            }

        }else{
            console.log("las contrasenas son diferentes");
            res.sendStatus(401);
        }
    }

    
    
}

export const authenticateUserController = async (req, res) => {
    const {userMail, password} = req.body;
    const usersExist = await tweets.find({userMail: userMail});

    if(usersExist.length !== 0){
        let authenticatePassword = bcrypt.compareSync(password, usersExist[0].password);
        if(authenticatePassword !== 0){
            res.send(usersExist);
        }else{
            console.log("contrasena incorrecta");
            res.sendStatus(400);
        }
    }else{
        console.log("el usuario no existe");
        res.sendStatus(400);
    }
}

export const editProfileController = async (req, res) => {
    const {sessionId, userName, userDesc} = req.body;

    let userPortada;
    let userImg;

    if(req.files.userPortada){
         const result = await profileUploader(req.files.userPortada.tempFilePath);  
         userPortada = result.secure_url; 
         fs.remove(req.files.userPortada.tempFilePath);   
    }
    if(req.files.userImg){
         const result = await profileUploader(req.files.userImg.tempFilePath);
         userImg = result.secure_url;
         fs.remove(req.files.userImg.tempFilePath);
    }

    await tweets.updateOne(
        {_id: sessionId},
        {
            $set:{
                userPortada: userPortada,
                userImg: userImg,
                userName: userName,
                userDesc: userDesc
            }
        }
    )

    const updateProfile = await tweets.find({_id: sessionId});

    res.send(updateProfile);
}

export const editPasswordController = async (req, res) => {
    const {userMail, password, confirmPassword} = req.params;
    const userExist = await tweets.find({userMail: userMail});

    if(userExist.length !== 0){
        if(password === confirmPassword){
                const salt = bcrypt.genSaltSync(12)
                const hash = await bcrypt.hash(password, salt);
                await tweets.updateOne(
                    {userMail: userMail},
                    {
                        $set:{
                            password: hash
                        }
                    }
                    )
                res.sendStatus(200);
        }else{
            console.log("las contrasenas no coinciden");
            res.sendStatus(400);
        }
    }else{
        console.log("verificar credenciales");
        res.sendStatus("400");
    }
}

export const setImageProfileController = async (req, res) => {

    const {userId} = req.params;

    let photo;

    if(req.files){

    const result = await imageUploader(req.files.photo.tempFilePath);
    await fs.remove(req.files.photo.tempFilePath);
    
    photo = {
        url: result.secure_url,
        public_id: result.public_id
    }

    }

        try{
            const userUpdate = await users.updateOne({_id: userId}, 
                {$set : {
                    userImg: photo.url
                }
        })
        
            res.send(userUpdate);
        
        }catch(error){
            console.log(error);
        }
}

export const followingController = async (req, res) => {
    const {followingId, sessionId} = req.params;
    const findFollowedUser = await tweets.find({_id: followingId});
    const findUser = await tweets.find({_id: sessionId});

    await tweets.updateOne(
        {_id: followingId},
        {
            $addToSet:
            {
                 followers: 
                 [{
                    followerImg: findUser[0].userImg,
                    followerName: findUser[0].userName,
                    followerId: sessionId
                 }]
                 
            }
        }  
    )

    await tweets.updateOne(
        {_id: sessionId},
        {
            $addToSet:
            {
                following:
                [{
                    followingImg: findFollowedUser[0].userImg,
                    followingName: findFollowedUser[0].userName,
                    followingId: followingId
                }]
            }
        }
    )

    res.sendStatus(200);
}

export const unFollowController = async (req, res) => {
    const {followingId, sessionId} = req.params;

    await tweets.updateOne(
        {_id: followingId},
        {
            $pull:
            {
                followers:
                {
                  followerId: sessionId  
                }
                
            }
        }
    )

    await tweets.updateOne(
        {_id: sessionId},
        {
            $pull:
            {
                following:
                {
                    followingId: followingId 
                }
                
            }
        }
    )

    res.sendStatus(200);
}

export const checkFollowController = async (req, res) => {  //revisar esto, es el problema de que no aparezca "unfollow" cuando ya se esta siguiendo a un usuario
    const {followingId} = req.params;
    const findFollow = await tweets.find({"following.followingId": followingId});

    if(findFollow){
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }

}

export const deleteAllUsersController = async (req, res) => {
    await tweets.deleteMany({});
    res.sendStatus(200);
}