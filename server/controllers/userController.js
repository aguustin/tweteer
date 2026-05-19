import tweets from "../models/tweeterModel.js";
import bcrypt from "bcrypt";
import { profileUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';
import { emitNotification } from "../sockets/index.js";

export const getUsersController = async (req, res) => {
    const getAllUsers = await tweets.find().sort({followers: -1}).limit(5);
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
            res.status(400).json({ error: "Las contraseñas no coinciden" });
        }
    }
}

export const authenticateUserController = async (req, res) => {
    const {userMail, password} = req.body;
    const usersExist = await tweets.find({userMail: userMail});

    if(usersExist.length !== 0){
        let authenticatePassword = bcrypt.compareSync(password, usersExist[0].password);
        if(authenticatePassword){
            const safeUsers = usersExist.map(u => {
                const { password: _, ...rest } = u.toObject();
                return rest;
            });
            res.send(safeUsers);
        }else{
            res.status(401).json(2)
        }
    }else{
        res.status(401).json(2)
    }

}

export const editProfileController = async (req, res) => {
    const {sessionId, userName, userDesc} = req.body;
    let userPortada;
    let userImg;

    if(req.files.userPortada){
         const result = await profileUploader(req.files.userPortada.tempFilePath);
         userPortada = result.secure_url;
         await fs.remove(req.files.userPortada.tempFilePath);
    }
    if(req.files.userImg){
         const result = await profileUploader(req.files.userImg.tempFilePath);
         userImg = result.secure_url;
         await fs.remove(req.files.userImg.tempFilePath);
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
                const hash = await bcrypt.hash(password, 12);
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
            res.sendStatus(400);
        }
    }else{
        res.sendStatus(400);
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
    const findFollowedUser = await tweets.findOne({_id: followingId});
    const findUser = await tweets.findOne({_id: sessionId});

    if(!findFollowedUser || !findUser) return res.sendStatus(404);

    await tweets.updateOne(
        {_id: followingId},
        {
            $addToSet:
            {
                 followers: {
                    followerImg: findUser.userImg,
                    followerName: findUser.userName,
                    followerId: sessionId
                 }
            }
        }
    )

    await tweets.updateOne(
        {_id: sessionId},
        {
            $addToSet:
            {
                following: {
                    followingImg: findFollowedUser.userImg,
                    followingName: findFollowedUser.userName,
                    followingId: followingId
                }
            }
        }
    )

    emitNotification(followingId, {
        type: "follow",
        fromUser: findUser.userName,
        fromImg: findUser.userImg,
        message: `${findUser.userName} comenzó a seguirte`
    });

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

export const checkFollowController = async (req, res) => {  
    const {followingId} = req.params;
    const findFollow = await tweets.find({"following.followingId": followingId});

    if(findFollow.length !== 0){
        res.sendStatus(200);
    }else{
        res.sendStatus(201);
    }

}

export const deleteAllUsersController = async (req, res) => {
    await tweets.deleteMany({});
    res.sendStatus(200);
}