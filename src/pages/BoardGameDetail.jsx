import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BoardGameDetail = () => {
    const [game, setGame] = useState(null);
    const id = useParams().id;

    useEffect(() => {
        fetch(`http://localhost:3001/boardgames/${id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.boardgame);
            })
    }, [])

    return (
        <div className='detail-container'>
            {game ? (
                <>
                    <div className='detail-image'>
                        <img src={game.image} alt={game.title} />
                    </div>

                    <div className='detail-info'>
                        <h2>{game.vote_average}</h2>
                        <h2>{game.title}</h2>
                        <p>{game.released_year}</p>
                        <p><strong>Category:</strong> {game.category}</p>
                        <p><strong>Players:</strong> {game.min_players} - {game.max_players}</p>
                        <p><strong>Playing time:</strong> {game.playtime} min</p>
                        <p><strong>Age:</strong> {game.min_age}</p>
                        <p><strong>Designer:</strong> {game.designer}</p>
                        <p><strong>Artist:</strong> {game.artist}</p>

                        <p>{game.description}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default BoardGameDetail