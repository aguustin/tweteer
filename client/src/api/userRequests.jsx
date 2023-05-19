import axios from "axios";

export const getAllUsersRequest = async () => axios.get('/getAllUsers');

export const createUserRequest = async (accountData) =>  axios.post('/createUser', accountData);

export const authenticateUserRequest = async (authenticateData) => axios.post('/authenticateUser', authenticateData);

export const editPasswordRequest = async (userName, password, confirmPassword) => axios.put(`/editPassword/${userName}/${password}/${confirmPassword}`);
