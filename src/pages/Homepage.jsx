import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import BoardGameCard from '../components/BoardGameCard';
import VideoGameCard from '../components/VideoGameCard'

const Homepage = () => {
    // recupero le funzioni dal context
    const { boardGames, videoGames } = useContext(GlobalContext);

    // definisco un array di 10 giochi da tavolo randomici
    const bgArray = boardGames.reduce((acc, curr) => {
        if (acc.length < 12) {
            if (Math.random() * 1 < 0.5) {
                return [...acc, curr]
            }
        }
        return acc
    }, []);

    // definisco un array di 10 videogiochi randomici
    const vgArray = videoGames.reduce((acc, curr) => {
        if (acc.length < 12) {
            if (Math.random() * 1 < 0.5) {
                return [...acc, curr]
            }
        }
        return acc
    }, []);
    return (
        <>
            <div className='header'>
                <div className="container">
                    <h1>Homepage</h1>
                </div>
            </div>
            <div className="container">
                {/* giochi da tavolo */}
                <h2 className='homepage-title'>Board Games</h2>
                <div className="cards-container">
                    {bgArray.map(game => {
                        return <BoardGameCard key={game.id} bg={game} />
                    })}
                </div>

                {/* videogiochi */}
                <h2 className='homepage-title'>Video Games</h2>
                <div className="cards-container">
                    {vgArray.map(game => {
                        return <VideoGameCard key={game.id} vg={game} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Homepage