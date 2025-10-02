import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';

const CompareCard = React.memo(({ bg }) => {
    const [game, setGame] = useState(null);
    const { favoriteGames, setFavoriteGames, compare, setCompare } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`http://localhost:3001/boardgames/${bg.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.boardgame);
            })
    }, []);

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
        } else if (compare.length < 5) {
            setCompare([...compare, game]);
        } else {
            alert('You can only compare up to 5 games at a time.');
        }
    };

    console.log('BoardGameCard rerender'); // Controllo i rerender
    return (
        <div className='compare-card' >
            <div className='favorite-icon' onClick={toggleFavorite}>
                {favoriteGames.some(fav => fav.id === game?.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </div>

            <NavLink to={`/boardgames/${game?.id}`}>
                <div className='compare-thumbnail-container'>
                    <img className='thumbnail' src={game?.image} alt={game?.title} />
                </div>
            </NavLink>
            <div className='game-title'>{game?.title || 'titolo'}</div>
            <div className='game-category'>{game?.category || 'categoria'}</div>
            <div className='game-players'><strong>Players:</strong> {game?.min_players} - {game?.max_players}</div>
            <div className='game-duration'><strong>Playtime:</strong> {game?.playtime || 'N/A'}min</div>
            <div className='game-vote'><strong>Voto:</strong> {game?.vote_average || 'N/A'}</div>
            <div className='compare-button' onClick={toggleCompare}>
                {compare.some(comp => comp.id === game?.id)
                    ? <div className='remove-compare'>
                        <i className="fa-regular fa-square-minus"></i>
                        <span>Remove</span>
                    </div>
                    : <div>
                        <i className="fa-regular fa-square-plus"></i>
                        <span>Compare</span>
                    </div>}
            </div>
        </div >
    )
})

export default CompareCard