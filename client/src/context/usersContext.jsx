import { createContext, useEffect, useState } from "react";
import { authenticateUserRequest, createUserRequest, editPasswordRequest, getAllUsersRequest } from "../api/userRequests";

const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [session, setSession] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        (async () => {
            setSession(JSON.parse(localStorage.getItem("credentials")));
            const res = await getAllUsersRequest();
            setAllUsers(res.data);
        })()
    }, []);

    const createUserContext = async (accountData) => {
        await createUserRequest(accountData);
    }

    const setSessionContext = async (authenticateData) => {
        localStorage.clear();
        const res = await authenticateUserRequest(authenticateData);

        if(res){
            localStorage.setItem("credentials", JSON.stringify(res.data));
            setSession(JSON.parse(localStorage.getItem("credentials")));
        }else{
            console.log("no se encontro el usuario");
            return 0;
        }

    }

    const editPasswordContext = async (editAccount) => {
        const res = await editPasswordRequest(editAccount);
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
    }

    return(
        <UserContext.Provider value={{
            createUserContext,
            setSessionContext,
            editPasswordContext,
            session,
            setSession,
            allUsers
        }}>{children}</UserContext.Provider>
    )
} 

export default UserContext;