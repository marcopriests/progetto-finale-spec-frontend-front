import { useState, useCallback, useMemo, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import VideoGameCard from '../components/VideoGameCard';
import Comparator from '../components/Comparator';
import debounce from '../functions/debounce';

const VideoGameFavorite = () => {
    const { favoriteVideoGames, compare } = useContext(GlobalContext);
    return (
        <>
            <div className='header'>
                <div className="container">
                    <h1>Favorite Board Games</h1>
                </div>
            </div>
            <div className='container'>

                <div className='cards-container'>
                    {favoriteVideoGames.length > 0 ? (
                        favoriteVideoGames.map(game => (
                            <VideoGameCard vg={game} key={game.id} />
                        ))
                    ) : (
                        <p>No favorite games found.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default VideoGameFavorite