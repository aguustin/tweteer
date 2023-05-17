import { createContext } from "react";

const TweetsContext = createContext();

export const TweetsContextProvider = ({children}) => {
    return(
        <TweetsContext.Provider>{children}</TweetsContext.Provider>
    )
}

export default TweetsContext;