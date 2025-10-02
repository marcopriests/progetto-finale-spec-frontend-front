import { createContext, useState } from "react";
import useBoardGames from "../hooks/useBoardGames";
import useStorage from "../hooks/useStorage";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [favoriteGames, changeFavorites] = useStorage('favoriteBoardGames', []);
    const [compare, setCompare] = useState([]);
    const boardGameData = useBoardGames();

    return (
        <GlobalContext.Provider value={{ ...boardGameData, favoriteGames, changeFavorites, compare, setCompare }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };