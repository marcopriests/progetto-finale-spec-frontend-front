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

    // const removeTask = async taskId => {
    //     const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
    //         method: 'DELETE'
    //     });
    //     const { success, message } = await response.json();
    //     if (!success) throw new Error(message);

    //     dispatchTasks({ type: 'REMOVE_TASK', payload: taskId });
    // }

    // const updateTask = async updatedTask => {
    //     const taskWithSameTitle = tasks.find(t => t.title.toLowerCase() === updatedTask.title.toLowerCase());
    //     if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
    //         throw new Error('Esiste già una task con questo nome');
    //     }
    //     const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(updatedTask)

    //     });
    //     const { success, message, task } = await response.json();
    //     if (!success) throw new Error(message);

    //     dispatchTasks({ type: 'UPDATE_TASK', payload: task })
    // }

    return { boardGames, addBoardGame };
};
