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
                    <div className="container">
                        <div className="detail-game">
                            <div className="game-info">
                                <div className="detail-title">
                                    <div className="detail-vote">{game.vote_average}</div>
                                    <div>
                                        <div className="game-title">{game.title} <span className="detail-year">({game.released_year})</span></div>
                                        <div className="detail-category">{game.category}</div>
                                    </div>
                                </div>
                                <div className="detail-info">
                                    <div>{game.min_players}-{game.max_players} Players</div>
                                    <div className="detail-info-separator"></div>
                                    <div>{game.playtime} Min</div>
                                    <div className="detail-info-separator"></div>
                                    <div>Age: {game.min_age}+</div>
                                </div>
                                <div><b>Designer: </b>{game.designer}</div>
                                <div><b>Artist: </b>{game.artist}</div>
                                <div className="detail-description">
                                    <h2>Description</h2>
                                    <div>{game.description}</div>
                                </div>
                                <a className='detail-link' href={game.link} target="_blank">Link</a>
                            </div>
                            <div className="game-thumbnail">
                                <img src={game.image} alt={game.title} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default BoardGameDetail