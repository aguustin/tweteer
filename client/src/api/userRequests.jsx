import axios from "axios";

export const getAllUsersRequest = async () => axios.get('http://localhost:8080/getAllUsers');

export const createUserRequest = async (accountData) =>  axios.post('http://localhost:8080/createUser', accountData);

export const authenticateUserRequest = async (authenticateData) => axios.post('http://localhost:8080/authenticateUser', authenticateData);

export const editPasswordRequest = async (userName, password, confirmPassword) => axios.put(`http://localhost:8080/editPassword/${userName}/${password}/${confirmPassword}`);

export const editProfileRequest = async (editData) => {
    const form = new FormData();

    for(let key in editData){
        form.append(key, editData[key]);
    }

    return await axios.post('http://localhost:8080/editProfile', form, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
}

export const followRequest = async (followingId, sessionId) => axios.put(`http://localhost:8080/following/${followingId}/${sessionId}`);

export const checkFollowRequest = async (followingId) => axios.get(`http://localhost:8080/checkFollow/${followingId}`);

export const unFollowRequest = async (followingId, sessionId) => axios.put(`http://localhost:8080/unFollow/${followingId}/${sessionId}`);