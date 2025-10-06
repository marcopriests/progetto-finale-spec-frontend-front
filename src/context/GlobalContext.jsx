import { createContext, useState } from "react";
import useBoardGames from "../hooks/useBoardGames";
import useVideoGames from "../hooks/useVideoGames";
import useStorage from "../hooks/useStorage";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [favoriteBoardGames, changeFavoritesBG] = useStorage('favoriteBoardGames', []);
    const [favoriteVideoGames, changeFavoritesVG] = useStorage('favoriteVideoGames', []);
    const [compare, setCompare] = useState([]);
    const boardGameData = useBoardGames();
    const videoGameData = useVideoGames();

    return (
        <GlobalContext.Provider value={{ ...boardGameData, ...videoGameData, favoriteBoardGames, changeFavoritesBG, favoriteVideoGames, changeFavoritesVG, compare, setCompare }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };