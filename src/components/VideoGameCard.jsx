import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const VideoGameCard = React.memo(({ vg }) => {
    const { favoriteVideoGames, changeFavoritesVG, compare, setCompare } = useContext(GlobalContext);
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/videogames/${vg.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.videogame);
            })
    }, []);

    const toggleFavorite = () => {
        if (favoriteVideoGames.some(fav => fav.id === game.id)) {
            changeFavoritesVG(favoriteVideoGames.filter(fav => fav.id !== game.id));
        } else {
            changeFavoritesVG([...favoriteVideoGames, game]);
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
    return (
        <div className='card' >
            <div className='favorite-icon' onClick={toggleFavorite}>
                {favoriteVideoGames.some(fav => fav.id === game?.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </div>

            <NavLink to={`/videogames/${game?.id}`}>
                <div className='thumbnail-container'>
                    <img className='thumbnail' src={game?.image} alt={game?.title} />
                </div>
            </NavLink>
            <div className='game-title'>{game?.title || 'titolo'}</div>
            <div className='game-category'>{game?.category || 'categoria'}</div>
            <div className='game-publisher'><strong>Publisher:</strong> {game?.publisher}</div>
            <div className='game-studio'><strong>Game Studio:</strong> {game?.game_studio || 'N/A'}</div>
            <div className='game-vote'><strong>Vote:</strong> {game?.vote_average || 'N/A'}</div>
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

export default VideoGameCard