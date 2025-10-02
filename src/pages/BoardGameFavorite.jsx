import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import BoardGameCard from '../components/BoardGameCard';
import Comparator from '../components/Comparator';

const BoardGameFavorite = () => {
    const { favoriteGames, compare } = useContext(GlobalContext);

    return (
        <>
            <div className='header'>
                <div className="container">
                    <h1>Favorite Board Games</h1>
                </div>
            </div>
            <div className='container'>
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

            {/* COMPARE-BAR */}
            {compare.length > 0 && (
                <Comparator />
            )}
        </>
    )
}

export default BoardGameFavorite