import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUserRequest, createUserRequest, editPasswordRequest, getAllUsersRequest } from "../api/userRequests";
import { getProfileInformationRequest } from "../api/tweetsRequests";
import TweetsContext from "./tweetsContext";

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [session, setSession] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const {setTweets} = useContext(TweetsContext);

    useEffect(() => {
        (async () => {
            const res = await getAllUsersRequest();
            setAllUsers(res.data);
        })()
    },[setAllUsers])
   
    const createUserContext = async (accountData) => {
        await createUserRequest(accountData);
    }

    const setSessionContext = async (authenticateData) => {
        const res = await authenticateUserRequest(authenticateData);
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
        
        return 1
    }

    const editPasswordContext = async (editAccount) => {
        localStorage.clear();
        const res = await editPasswordRequest(editAccount);
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
    }

    const getProfileInformationContext = async (se) => {
        const ownTweets = await getProfileInformationRequest(se);
        setTweets(ownTweets.data);
    }

    const seeProfileContext = async (userId) => {
        const res = await getProfileInformationRequest(userId);
        setTweets(res.data);
    }

    return(
        <UserContext.Provider value={{
            session,
            setSession,
            allUsers,
            createUserContext,
            setSessionContext,
            editPasswordContext,
            getProfileInformationContext,
            seeProfileContext
        }}>{children}</UserContext.Provider>
    )
} 

export default UserContext;