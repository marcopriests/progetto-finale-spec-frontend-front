import { useState } from "react";

export default function useStorage(itemKey, initialValue) {
    const [favoriteGames, setFavoriteGames] = useState(() => {
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue
        }
    });

    const changeFavorites = newState => {
        setFavoriteGames(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }

    return [favoriteGames, changeFavorites]
}