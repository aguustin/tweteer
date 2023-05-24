import { createContext, useState } from "react";
import { createTweetRequest, respondTweetRequest, searchRequest } from "../api/tweetsRequests";

const TweetsContext = createContext();

export const TweetsContextProvider = ({children}) => {
    const [tweets, setTweets] = useState([]);
    const [searchUser, setSearchUser] = useState([]);

    const createTweetContext = async (tweetData) => {
        const res = await createTweetRequest(tweetData);
        setTweets(res.data);
    }

    const respondTweetContext = async (commentData) => { 
        const res = await respondTweetRequest(commentData);
        setTweets(res.data);
    }

    const deepRespondContext = async () => {

    }

    const searchContext = async (searchData) => {
        const res = await searchRequest(searchData);
        setSearchUser(res.data);
    }

    const tendenciesContext = async () => {

    }

    const increaseRetweetsContext = async () => {

    }

    const getPeopleByHobbiesContext = async () => {

    }

    return(
        <TweetsContext.Provider value={{
            tweets,
            setTweets,
            searchUser, 
            setSearchUser,
            createTweetContext,
            respondTweetContext,
            deepRespondContext,
            searchContext,
            tendenciesContext,
            increaseRetweetsContext,
            getPeopleByHobbiesContext
        }}>{children}</TweetsContext.Provider>
    )
}

export default TweetsContext;