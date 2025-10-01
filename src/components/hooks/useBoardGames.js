import { useState, useEffect } from "react";

export default function useBoardGames() {
    const [boardGames, setBoardGames] = useState([]);

    // funzione per fetchare i board games dal server
    const fetchBoardGames = async () => {
        const response = await fetch(`http://localhost:3001/boardgames`)
        const data = await response.json()
        setBoardGames(data)
    }

    useEffect(() => {
        fetchBoardGames()
    }, [])

    return { boardGames };
};