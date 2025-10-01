import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const BoardGameCard = ({ bg }) => {
    const [game, setGame] = useState(null);
    const { favoriteGames, setFavoriteGames, compare, setCompare } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`http://localhost:3001/boardgames/${bg.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.boardgame);
            })
    }, [])

    const toggleFavorite = () => {
        if (favoriteGames.some(fav => fav.id === game.id)) {
            setFavoriteGames(favoriteGames.filter(fav => fav.id !== game.id));
        } else {
            setFavoriteGames([...favoriteGames, game]);
        }
    };

    const toggleCompare = () => {
        if (compare.some(comp => comp.id === game.id)) {
            setCompare(compare.filter(comp => comp.id !== game.id));
        } else if (compare.length < 2) {
            setCompare([...compare, game]);
        } else {
            alert('You can only compare up to 2 games at a time.');
        }
    };

    console.log('Lunghezza array compare:', compare.length);

    console.log('ciao');
    return (
        <div className='card' >
            <div className='favorite-icon' onClick={toggleFavorite}>
                {favoriteGames.some(fav => fav.id === game?.id) ? '❤️' : '🤍'}
            </div>
            <div className='compare-icon' onClick={toggleCompare}>
                {compare.some(comp => comp.id === game?.id) ? '🔄' : '🔁'}
            </div>
            <NavLink to={`/boardgames/${game?.id}`}>
                <div className='thumbnail-container'>
                    <img className='thumbnail' src={game?.image} alt={game?.title} />
                </div>
            </NavLink>
            <div className='game-title'>{game?.title || 'titolo'}</div>
            <div className='game-category'>{game?.category || 'categoria'}</div>
            <div className='game-players'><strong>Players:</strong> {game?.min_players} - {game?.max_players}</div>
            <div className='game-duration'><strong>Playtime:</strong> {game?.playtime || 'N/A'}min</div>
            <div className='game-vote'><strong>Voto:</strong> {game?.vote_average || 'N/A'}</div>
        </div >


    )
}

export default BoardGameCard