import { createContext, useState } from "react";
import useBoardGames from "../components/hooks/useBoardGames";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [favoriteGames, setFavoriteGames] = useState([]);
    const boardGameData = useBoardGames();

    return (
        <GlobalContext.Provider value={{ ...boardGameData, favoriteGames, setFavoriteGames }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };