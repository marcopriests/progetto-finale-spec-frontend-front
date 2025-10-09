import { useEffect, useReducer } from "react";
import videoGamesReducer from "../reducer/videoGamesReducer";

export default function useVideoGames() {
    // importo stato e dispatch dal reducer
    const [videoGames, dispatchVideoGames] = useReducer(videoGamesReducer, []);

    useEffect(() => {
        // effettuo il fetch degli elementi
        fetch(`http://localhost:3001/videogames`)
            .then(res => res.json())
            .then(data => dispatchVideoGames({ type: 'LOAD_VIDEOGAMES', payload: data }))
            .catch(error => console.error(error));
    }, []);

    // funzione per aggiungere un gioco
    const addVideoGame = async newVideoGame => {
        // controllo se esiste già un gioco con lo stesso nome
        const videoGameExist = videoGames.some(t => t.title.toLowerCase() === newVideoGame.title.toLowerCase());
        if (videoGameExist) {
            throw new Error('A game with same title already exist!');
        }

        // effettuo la chiamata in post
        const response = await fetch(`http://localhost:3001/videogames`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVideoGame)

        });
        const { success, message, videogame } = await response.json();
        if (!success) throw new Error(message);

        dispatchVideoGames({ type: 'ADD_VIDEOGAME', payload: videogame });
    }

    // funzione per rimuovere un gioco
    const removeVideoGame = async videoGameId => {

        // effettuo la chiamata in delete
        const response = await fetch(`http://localhost:3001/videogames/${videoGameId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        dispatchVideoGames({ type: 'REMOVE_VIDEOGAME', payload: videoGameId });
    }

    // funzione per modificare un gioco
    const updateVideoGame = async updatedVideoGame => {
        // controllo se il gioco appena modificato ha il titolo uguale ad un altro già esistente
        const videoGameWithSameTitle = videoGames.find(t => t.title.toLowerCase() === updatedVideoGame.title.toLowerCase());
        if (videoGameWithSameTitle && videoGameWithSameTitle.id !== updatedVideoGame.id) {
            throw new Error('A game with same title already exist!');
        }
        // effettuo la chiamata in put
        const response = await fetch(`http://localhost:3001/videogames/${updatedVideoGame.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVideoGame)

        });
        const { success, message, videogame } = await response.json();
        if (!success) throw new Error(message);

        dispatchVideoGames({ type: 'UPDATE_VIDEOGAME', payload: videogame })
    }

    return { videoGames, addVideoGame, updateVideoGame, removeVideoGame };
};