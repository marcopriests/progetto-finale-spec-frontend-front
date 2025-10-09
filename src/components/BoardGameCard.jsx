import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const BoardGameCard = React.memo(({ bg }) => {
    // recupero le funzioni dal context
    const { favoriteBoardGames, changeFavoritesBG, compare, setCompare } = useContext(GlobalContext);

    // definisco uno stato in cui salverò il gioco
    const [game, setGame] = useState(null);

    // effettuo un fetch per recuperare il gioco al montaggio del componente
    useEffect(() => {
        fetch(`http://localhost:3001/boardgames/${bg.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.boardgame);
            })
    }, []);

    // definisco una funzione per aggiungere/rimuovere il gioco ai preferiti
    const toggleFavorite = () => {
        if (favoriteBoardGames.some(fav => fav.id === game.id)) {
            changeFavoritesBG(favoriteBoardGames.filter(fav => fav.id !== game.id));
        } else {
            changeFavoritesBG([...favoriteBoardGames, game]);
        }
    };

    // definisco una funzione per aggiungere/rimuovere il gioco al comparatore
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
                {favoriteBoardGames.some(fav => fav.id === game?.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
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

export default BoardGameCard