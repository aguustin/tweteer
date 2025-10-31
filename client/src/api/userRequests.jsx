import axios from "axios";

export const getAllUsersRequest = async () => axios.get('https://tweteer.onrender.com/getAllUsers');

export const createUserRequest = async (accountData) =>  axios.post('https://tweteer.onrender.com/createUser', accountData);

export const authenticateUserRequest = async (authenticateData) => axios.post('https://tweteer.onrender.com/authenticateUser', authenticateData);

export const editPasswordRequest = async (userName, password, confirmPassword) => axios.put(`https://tweteer.onrender.com/editPassword/${userName}/${password}/${confirmPassword}`);

export const editProfileRequest = async (editData) => {
    const form = new FormData();

    for(let key in editData){
        form.append(key, editData[key]);
    }

    return await axios.post('https://tweteer.onrender.com/editProfile', form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
}

export const followRequest = async (followingId, sessionId) => axios.put(`https://tweteer.onrender.com/following/${followingId}/${sessionId}`);

export const checkFollowRequest = async (followingId) => axios.get(`https://tweteer.onrender.com/checkFollow/${followingId}`);

export const unFollowRequest = async (followingId, sessionId) => axios.put(`https://tweteer.onrender.com/unFollow/${followingId}/${sessionId}`);