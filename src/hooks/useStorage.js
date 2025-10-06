import { useState } from "react";

export default function useStorage(itemKey, initialValue) {
    const [favoriteBoardGames, setFavoriteBoardGames] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue
        }
    });

    const changeFavoritesBG = newState => {
        setFavoriteBoardGames(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }

    const [favoriteVideoGames, setFavoriteVideoGames] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue
        }
    });

    const changeFavoritesVG = newState => {
        setFavoriteVideoGames(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }

    return [favoriteBoardGames, changeFavoritesBG, favoriteVideoGames, changeFavoritesVG]
}