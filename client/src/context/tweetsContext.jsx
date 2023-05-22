import { createContext, useContext, useEffect, useState } from "react";
import { createTweetRequest, getOwnProfileRequest, respondTweetRequest } from "../api/tweetsRequests";
import UserContext from "./usersContext";

const TweetsContext = createContext();

export const TweetsContextProvider = ({children}) => {

    const {session} = useContext(UserContext);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        (async() => {
            await getOwnProfileRequest(session[0]?._id);
        })();
    },[]);

    const createTweetContext = async (tweetData) => {
        const res = await createTweetRequest(tweetData);
        setTweets(res.data);
    }

    const respondTweetContext = async (commentData) => { 
        const res = await respondTweetRequest(commentData);
        setTweets(...tweets, res.data);
    }

    const deepRespondContext = async () => {

    }

    const searchContext = async () => {

    }

    const tendenciesContext = async () => {

    }

    const increaseLikesContext = async () => {

    }

    const increaseRetweetsContext = async () => {

    }

    const getPeopleByHobbiesContext = async () => {

    }

    return(
        <TweetsContext.Provider value={{
            tweets,
            createTweetContext,
            respondTweetContext,
            deepRespondContext,
            searchContext,
            tendenciesContext,
            increaseLikesContext,
            increaseRetweetsContext,
            getPeopleByHobbiesContext
        }}>{children}</TweetsContext.Provider>
    )
}

export default TweetsContext;