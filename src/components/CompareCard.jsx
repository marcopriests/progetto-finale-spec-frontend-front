import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';

const CompareCard = React.memo(({ location, item }) => {
    const [game, setGame] = useState(null);
    const [isBoardgame, setIsBoardgame] = useState(false);
    const [isVideogame, setIsVideogame] = useState(false);
    const { compare, setCompare } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`http://localhost:3001${location.pathname}/${item.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(
                    () => {
                        if (location.pathname === '/boardgames') {
                            setIsBoardgame(true);
                            setIsVideogame(false);
                            return data.boardgame
                        }
                        if (location.pathname === '/videogames') {
                            setIsVideogame(true);
                            setIsBoardgame(false);
                            return data.videogame
                        }
                    }
                );
            })
    }, []);

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
        <div className='compare-card' >
            <NavLink to={`${location.pathname}/${game?.id}`}>
                <div className='compare-thumbnail-container'>
                    <img className='thumbnail' src={game?.image} alt={game?.title} />
                </div>
            </NavLink>
            <div className='game-title'>{game?.title || 'titolo'}</div>
            <div className='game-category'>{game?.category || 'categoria'}</div>

            {isBoardgame &&
                <>
                    <div className='game-players'><strong>Players:</strong> {game?.min_players} - {game?.max_players}</div>
                    <div className='game-playtime'><strong>Playtime:</strong> {game?.playtime || 'N/A'}min</div>
                </>
            }

            {isVideogame &&
                <>
                    <div className='game-publisher'><strong>Publisher:</strong> {game?.publisher}</div>
                    <div className='game-studio'><strong>Game studio:</strong> {game?.game_studio}</div>
                </>
            }

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