import { useState } from "react";

export default function useStorage(itemKey, initialValue) {
    // dichiaro uno stato in cui salvare i giochi da tavolo preferiti
    const [favoriteBoardGames, setFavoriteBoardGames] = useState(() => {

        // controllo se esistevano già dei preferiti altrimenti ritorno lo stato iniziale
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue
        }
    });

    // creo una funzione per modificare i preferiti salvati in locale
    const changeFavoritesBG = newState => {
        setFavoriteBoardGames(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }

    // dichiaro uno stato in cui salvare i videogiochi preferiti
    const [favoriteVideoGames, setFavoriteVideoGames] = useState(() => {

        // controllo se esistevano già dei preferiti altrimenti ritorno lo stato iniziale
        const prevState = localStorage.getItem(itemKey);
        if (prevState) {
            return JSON.parse(prevState);
        } else {
            localStorage.setItem(itemKey, JSON.stringify(initialValue));
            return initialValue
        }
    });

    // creo una funzione per modificare i preferiti salvati in locale
    const changeFavoritesVG = newState => {
        setFavoriteVideoGames(newState);
        localStorage.setItem(itemKey, JSON.stringify(newState));
    }

    return [favoriteBoardGames, changeFavoritesBG, favoriteVideoGames, changeFavoritesVG]
}