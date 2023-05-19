import users from "../models/userModel.js";
import tweets from "../models/tweeterModel.js";
import bcrypt from "bcrypt";
import { imageUploader } from "../libs/cloudinary.js";
import fs from 'fs-extra';

export const getUsersController = async (req, res) => {
    const getAllUsers = await users.find();
    res.send(getAllUsers);
}

export const createUserController = async (req, res) => {
    const {userMail, password, repitePassword} = req.body;

        if(password === repitePassword){
            const hashedPass = await bcrypt.hash(password, 12);

            if(req.files){
                const createUser = new users({
                    userMail: userMail,
                    profilePhoto: profilePhoto,
                    password: hashedPass
                })
                await createUser.save();
                res.send(createUser);
            }else{
                const createUser = new users({
                    userMail: userMail,
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

export const authenticateUserController = async (req, res) => {
    const {userMail, password} = req.body;
    const usersExist = await users.find({userMail: userMail});

    if(usersExist.length > 0){
        const authenticatePassword = await bcrypt.compare(password, usersExist[0].password);
        if(authenticatePassword > 0){
            const saveOnTweet = await tweets.find({userMail: userMail});
                if(saveOnTweet.length > 0){
                    res.send(usersExist);
                }else{
                    await tweets({
                        userId: usersExist[0]._id,
                        userImg: usersExist[0]?.profilePhoto,
                        userName: usersExist[0].userName
                    })
                    tweets.save();
                }
            res.send(usersExist);
        }else{
            console.log("contrasena incorrecta");
            res.sendStatus(401);
        }
    }else{
        console.log("el usuario no existe");
        res.sendStatus(400);
    }
}

export const editPasswordController = async (req, res) => {
    const {userMail, password, confirmPassword} = req.params;
    const userExist = await users.find({userMail: userMail});

    if(userExist.length > 0){
        if(password === confirmPassword){
                const hash = await bcrypt.hash(password, 12);
                await users.updateOne(
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
                    profilePhoto: photo.url
                }
        })
        
            res.send(userUpdate);
        
        }catch(error){
            console.log(error);
        }
}

export const deleteAllUsersController = async (req, res) => {
    await users.deleteMany({});
    res.sendStatus(200);
}