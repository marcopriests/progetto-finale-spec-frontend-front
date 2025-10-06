import { useState, useEffect, useReducer } from "react";
import boardGamesReducer from "../reducer/boardGamesReducer";

export default function useBoardGames() {
    const [boardGames, dispatchBoardGames] = useReducer(boardGamesReducer, []);

    useEffect(() => {
        // Fetch boardgames from an API or local storage
        fetch(`http://localhost:3001/boardgames`)
            .then(res => res.json())
            .then(data => dispatchBoardGames({ type: 'LOAD_BOARDGAMES', payload: data }))
            .catch(error => console.error(error));
    }, []);

    const addBoardGame = async newBoardGame => {
        const boardGameExist = boardGames.some(t => t.title.toLowerCase() === newBoardGame.title.toLowerCase());
        if (boardGameExist) {
            throw new Error('Esiste già un gioco con questo nome');
        }
        const response = await fetch(`http://localhost:3001/boardgames`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBoardGame)

        });
        const { success, message, boardgame } = await response.json();
        if (!success) throw new Error(message);

        dispatchBoardGames({ type: 'ADD_BOARDGAME', payload: boardgame });
    }

    const removeBoardGame = async boardGameId => {
        const response = await fetch(`http://localhost:3001/boardgames/${boardGameId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        dispatchBoardGames({ type: 'REMOVE_BOARDGAME', payload: boardGameId });
    }

    const updateBoardGame = async updatedBoardGame => {
        const boardGameWithSameTitle = boardGames.find(t => t.title.toLowerCase() === updatedBoardGame.title.toLowerCase());
        if (boardGameWithSameTitle && boardGameWithSameTitle.id !== updatedBoardGame.id) {
            throw new Error('Esiste già un gioco con questo nome');
        }
        const response = await fetch(`http://localhost:3001/boardgames/${updatedBoardGame.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBoardGame)

        });
        const { success, message, boardgame } = await response.json();
        if (!success) throw new Error(message);

        dispatchBoardGames({ type: 'UPDATE_BOARDGAME', payload: boardgame })
    }

    return { boardGames, addBoardGame, updateBoardGame, removeBoardGame };
};
