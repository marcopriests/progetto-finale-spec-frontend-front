import { useEffect, useReducer } from "react";
import boardGamesReducer from "../reducer/boardGamesReducer";

export default function useBoardGames() {
    // importo stato e dispatch dal reducer
    const [boardGames, dispatchBoardGames] = useReducer(boardGamesReducer, []);

    useEffect(() => {
        // effettuo il fetch degli elementi
        fetch(`http://localhost:3001/boardgames`)
            .then(res => res.json())
            .then(data => dispatchBoardGames({ type: 'LOAD_BOARDGAMES', payload: data }))
            .catch(error => console.error(error));
    }, []);

    // funzione per aggiungere un gioco
    const addBoardGame = async newBoardGame => {
        // controllo se esiste già un gioco con lo stesso nome
        const boardGameExist = boardGames.some(t => t.title.toLowerCase() === newBoardGame.title.toLowerCase());
        if (boardGameExist) {
            throw new Error('A game with same title already exist!');
        }

        // effettuo la chiamata in post
        const response = await fetch(`http://localhost:3001/boardgames`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBoardGame)

        });

        const { success, message, boardgame } = await response.json();
        if (!success) throw new Error(message);

        dispatchBoardGames({ type: 'ADD_BOARDGAME', payload: boardgame });
    }

    // funzione per rimuovere un gioco
    const removeBoardGame = async boardGameId => {

        // effettuo la chiamata in delete
        const response = await fetch(`http://localhost:3001/boardgames/${boardGameId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);

        dispatchBoardGames({ type: 'REMOVE_BOARDGAME', payload: boardGameId });
    }

    // funzione per modificare un gioco
    const updateBoardGame = async updatedBoardGame => {
        // controllo se il gioco appena modificato ha il titolo uguale ad un altro già esistente
        const boardGameWithSameTitle = boardGames.find(t => t.title.toLowerCase() === updatedBoardGame.title.toLowerCase());
        if (boardGameWithSameTitle && boardGameWithSameTitle.id !== updatedBoardGame.id) {
            throw new Error('A game with same title already exist!');
        }
        // effettuo la chiamata in put
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