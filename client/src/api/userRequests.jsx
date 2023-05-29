import axios from "axios";

export const getAllUsersRequest = async () => axios.get('/getAllUsers');

export const createUserRequest = async (accountData) =>  axios.post('/createUser', accountData);

export const authenticateUserRequest = async (authenticateData) => axios.post('/authenticateUser', authenticateData);

export const editPasswordRequest = async (userName, password, confirmPassword) => axios.put(`/editPassword/${userName}/${password}/${confirmPassword}`);

export const editProfileRequest = async (editData) => axios.post('/editProfile', editData);

export const followRequest = async (followingId, sessionId) => axios.put(`/following/${followingId}/${sessionId}`);

export const checkFollowRequest = async (followingId) => axios.get(`/checkFollow/${followingId}`);

export const unFollowRequest = async (followingId, sessionId) => axios.put(`/unFollow/${followingId}/${sessionId}`);