import axios from "axios";

console.log(process.env.BACK_URL)

export const getAllUsersRequest = async () => axios.get(`${process.env.REACT_APP_BACK_URL}/getAllUsers`);

export const createUserRequest = async (accountData) =>  axios.post(`${process.env.REACT_APP_BACK_URL}/createUser`, accountData);

export const authenticateUserRequest = async (authenticateData) => axios.post(`${process.env.REACT_APP_BACK_URL}/authenticateUser`, authenticateData);

export const editPasswordRequest = async (userName, password, confirmPassword) => axios.put(`${process.env.REACT_APP_BACK_URL}/editPassword/${userName}/${password}/${confirmPassword}`);

export const editProfileRequest = async (editData) => {
    const form = new FormData();

    for(let key in editData){
        form.append(key, editData[key]);
    }

    return await axios.post(`${process.env.REACT_APP_BACK_URL}/editProfile`, form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
}

export const followRequest = async (followingId, sessionId) => axios.put(`${process.env.REACT_APP_BACK_URL}/following/${followingId}/${sessionId}`);

export const checkFollowRequest = async (followingId) => axios.get(`${process.env.REACT_APP_BACK_URL}/checkFollow/${followingId}`);

export const unFollowRequest = async (followingId, sessionId) => axios.put(`${process.env.REACT_APP_BACK_URL}/unFollow/${followingId}/${sessionId}`);