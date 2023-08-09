import { createContext, useContext, useState } from "react";
import TweetsContext from "./tweetsContext";
import { getSavedTweetsRequest, getAllTweetsRequest } from "../api/tweetsRequests";

const LayoutContext = createContext();

export const LayoutContextProvider = ({children}) => {
    const [homeLayout, setHomeLayout] = useState(true);
    const [listsLayout, setListLayout] = useState(false);
    const [black, setBlackLayout] = useState(false);
    const [searching, setSearching] = useState(false);
    const [load, setLoad] = useState(false);
    const {session, setTweets} = useContext(TweetsContext);

    const layoutHomeContext = async (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        },500);
        setSearching(false);
        setListLayout(false);
        setHomeLayout(true);
    }
    const layoutListContext = async (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        },500);
        setHomeLayout(false);
        setSearching(false);
        setListLayout(true);

        const res = await getSavedTweetsRequest(session[0]._id);
        setTweets(res.data);

    }
    const layoutSearchContext = async (e) => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        },500);
        setHomeLayout(false);
        setListLayout(false);
        setSearching(true);
        const res = await getAllTweetsRequest();
        setTweets(res.data);
    }

    return(
        <LayoutContext.Provider value={{homeLayout, layoutHomeContext, listsLayout, layoutListContext, searching, layoutSearchContext, load, setBlackLayout, black}}>{children}</LayoutContext.Provider>
    )
}

export default LayoutContext;