import { createContext, useContext, useState } from "react";
import TweetsContext from "./tweetsContext";
import { getSavedTweetsRequest, getAllTweetsRequest, getFeedRequest } from "../api/tweetsRequests";

const LayoutContext = createContext();

export const LayoutContextProvider = ({children}) => {
    const [homeLayout, setHomeLayout] = useState(true);
    const [listsLayout, setListLayout] = useState(false);
    const [feedLayout, setFeedLayout] = useState(false);
    const [black, setBlackLayout] = useState(false);
    const [searching, setSearching] = useState(false);
    const [load, setLoad] = useState(false);
    const [explorePage, setExplorePage] = useState(1);
    const [exploreHasMore, setExploreHasMore] = useState(false);
    const [feedPage, setFeedPage] = useState(1);
    const [feedHasMore, setFeedHasMore] = useState(false);
    const [feedTweets, setFeedTweets] = useState([]);
    const {session, setTweets} = useContext(TweetsContext);

    const layoutHomeContext = async (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => setLoad(false), 500);
        setSearching(false);
        setListLayout(false);
        setFeedLayout(false);
        setHomeLayout(true);
    }

    const layoutListContext = async (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => setLoad(false), 500);
        setHomeLayout(false);
        setSearching(false);
        setFeedLayout(false);
        setListLayout(true);
        const res = await getSavedTweetsRequest(session[0]._id);
        setTweets(res.data);
    }

    const layoutSearchContext = async () => {
        setLoad(true);
        setTimeout(() => setLoad(false), 500);
        setHomeLayout(false);
        setListLayout(false);
        setFeedLayout(false);
        setSearching(true);
        setExplorePage(1);
        const res = await getAllTweetsRequest(1);
        setTweets(res.data.data);
        setExploreHasMore(res.data.hasMore);
    }

    const loadMoreExplore = async () => {
        const next = explorePage + 1;
        const res = await getAllTweetsRequest(next);
        setTweets(prev => [...prev, ...res.data.data]);
        setExplorePage(next);
        setExploreHasMore(res.data.hasMore);
    }

    const layoutFeedContext = async () => {
        setLoad(true);
        setTimeout(() => setLoad(false), 500);
        setHomeLayout(false);
        setListLayout(false);
        setSearching(false);
        setFeedLayout(true);
        setFeedPage(1);
        const res = await getFeedRequest(1);
        setFeedTweets(res.data.data);
        setFeedHasMore(res.data.hasMore);
    }

    const loadMoreFeed = async () => {
        const next = feedPage + 1;
        const res = await getFeedRequest(next);
        setFeedTweets(prev => [...prev, ...res.data.data]);
        setFeedPage(next);
        setFeedHasMore(res.data.hasMore);
    }

    return(
        <LayoutContext.Provider value={{
            homeLayout, layoutHomeContext,
            listsLayout, layoutListContext,
            searching, layoutSearchContext,
            feedLayout, layoutFeedContext, feedTweets, feedHasMore, loadMoreFeed,
            load, setBlackLayout, black,
            exploreHasMore, loadMoreExplore
        }}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutContext;