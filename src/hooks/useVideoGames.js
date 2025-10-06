import { useState, useEffect, useReducer } from "react";
import videoGamesReducer from "../reducer/videoGamesReducer";

export default function useVideoGames() {
    const [videoGames, dispatchVideoGames] = useReducer(videoGamesReducer, []);

    useEffect(() => {
        fetch(`http://localhost:3001/videogames`)
            .then(res => res.json())
            .then(data => dispatchVideoGames({ type: 'LOAD_VIDEOGAMES', payload: data }))
            .catch(error => console.error(error));
    }, []);

    const addVideoGame = async newVideoGame => {
        const videoGameExist = videoGames.some(t => t.title.toLowerCase() === newVideoGame.title.toLowerCase());
        if (videoGameExist) {
            throw new Error('Esiste già un gioco con questo nome');
        }
        const response = await fetch(`http://localhost:3001/videogames`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVideoGame)

        });
        const { success, message, videogame } = await response.json();
        if (!success) throw new Error(message);

        dispatchVideoGames({ type: 'ADD_VIDEOGAME', payload: videogame });
    }

    const removeVideoGame = async videoGameId => {
        const response = await fetch(`http://localhost:3001/videogames/${videoGameId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        dispatchVideoGames({ type: 'REMOVE_VIDEOGAME', payload: videoGameId });
    }

    const updateVideoGame = async updatedVideoGame => {
        const videoGameWithSameTitle = videoGames.find(t => t.title.toLowerCase() === updatedVideoGame.title.toLowerCase());
        if (videoGameWithSameTitle && videoGameWithSameTitle.id !== updatedVideoGame.id) {
            throw new Error('Esiste già un gioco con questo nome');
        }
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