import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "drmcrdf4r",
    api_key: "521116467426574",
    api_secret: "IyZYzTmTrxIpuEHp04kZ6lWk40g"
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