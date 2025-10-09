import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';

const CompareCard = React.memo(({ location, item }) => {
    // dichiaro uno stato in cui salverò il gioco
    const [game, setGame] = useState(null);

    // recupero le funzioni dal context
    const { compare, setCompare } = useContext(GlobalContext);

    // creo una funzione per definire il path per il fetch
    const getPath = () => {
        if (location.pathname === '/boardgames' || location.pathname === '/boardgames/favorites') {
            return 'boardgames'
        } else if (location.pathname === '/videogames' || location.pathname === '/videogames/favorites') {
            return 'videogames'
        }
    };

    // assegno il risultato della funzione ad una variabile
    const path = getPath();

    // effettuo la chiamata al montaggio del componente
    useEffect(() => {
        fetch(`http://localhost:3001/${path}/${item.id}`)
            .then(response => response.json())
            .then(data => {
                setGame(
                    () => {
                        // se mi trovo in boardgame 
                        if (path === 'boardgames') {
                            return data.boardgame
                        }
                        // se mi trovo in videogame
                        if (path === 'videogames') {
                            return data.videogame
                        }
                    }
                );
            })
    }, []);

    // funzione per aggiungere/rimuovere dal comparatore
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
            <NavLink to={`/${path}/${game?.id}`}>
                <div className='compare-thumbnail-container'>
                    <img className='thumbnail' src={game?.image} alt={game?.title} />
                </div>
            </NavLink>
            <div className='game-title'>{game?.title || 'titolo'}</div>
            <div className='game-category'>{game?.category || 'categoria'}</div>

            {path === 'boardgames' &&
                <>
                    <div className='game-players'><strong>Players:</strong> {game?.min_players} - {game?.max_players}</div>
                    <div className='game-playtime'><strong>Playtime:</strong> {game?.playtime || 'N/A'}min</div>
                </>
            }

            {path === 'videogames' &&
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