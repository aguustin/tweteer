import { createContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutContextProvider = ({children}) => {
    const [homeLayout, setHomeLayout] = useState(true);
    const [listsLayout, setListLayout] = useState(false);
    const [searching, setSearching] = useState(false);

    const layoutHomeContext = (e) => {
        e.preventDefault();
        setSearching(false);
        setListLayout(false);
        setHomeLayout(true);
    }
    const layoutListContext = (e) => {
        e.preventDefault();
        setHomeLayout(false);
        setSearching(false);
        setListLayout(true);
    }
    const layoutSearchContext = (e) => {
        e.preventDefault();
        setHomeLayout(false);
        setListLayout(false);
        setSearching(true);
    }

    return(
        <LayoutContext.Provider value={{homeLayout, layoutHomeContext, listsLayout, layoutListContext, searching, layoutSearchContext}}>{children}</LayoutContext.Provider>
    )
}

export default LayoutContext;