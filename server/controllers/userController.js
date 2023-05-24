import tweets from "../models/tweeterModel.js";
import bcrypt from "bcrypt";
import { imageUploader } from "../libs/cloudinary.js";
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

export const deleteAllUsersController = async (req, res) => {
    await tweets.deleteMany({});
    res.sendStatus(200);
}