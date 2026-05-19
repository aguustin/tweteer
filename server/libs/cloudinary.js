import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


export const tweetsUploader = async filePath => {

    return await cloudinary.uploader.upload(filePath, {
        folder: 'tweeter'
    })

}

export const profileUploader = async filePath => {

    return await cloudinary.uploader.upload(filePath, {
        folder: 'profiles'
    })

}