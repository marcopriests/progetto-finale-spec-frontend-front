import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import BoardGameCard from '../components/BoardGameCard';

const BoardGameFavorite = () => {
    const { favoriteGames } = useContext(GlobalContext);

    return (
        <div className='container'>
            <h1>Favorite Board Games</h1>
            <div className='cards-container'>
                {favoriteGames.length > 0 ? (
                    favoriteGames.map(game => (
                        <BoardGameCard bg={game} key={game.id} />
                    ))
                ) : (
                    <p>No favorite games found.</p>
                )}
            </div>
        </div>
    )
}

export default BoardGameFavorite