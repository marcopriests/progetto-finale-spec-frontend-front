import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal';
import EditVideoGameModal from '../components/EditVideoGameModal';
import { GlobalContext } from '../context/GlobalContext';

const VideoGameDetail = () => {
    const { favoriteVideoGames, changeFavoritesVG, updateVideoGame, removeVideoGame } = useContext(GlobalContext);

    const [game, setGame] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();

    const fetchGame = () => {
        fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.videogame);
            })
    }

    useEffect(() => {
        fetchGame();
    }, [])

    const handleUpdate = async updatedVideoGame => {
        try {
            await updateVideoGame(updatedVideoGame);
            fetchGame()
            setShowEditModal(false)
        } catch (error) {
            alert(error.message)
        } finally {
            alert('Video Game edited with success!');
        }
    }

    const handleDelete = async () => {
        try {
            await removeVideoGame(game.id);
            changeFavoritesVG(favoriteVideoGames.filter(fav => fav.id !== game.id));
            alert('Video Game deleted with success!');
            navigate('/videogames');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    return (
        <div className='detail-container'>
            {game ? (
                <>
                    <div className="container">
                        <div className="detail-game">
                            <div className="game-info">
                                <div className="detail-title">
                                    <div className="detail-vote">{game.vote_average}</div>
                                    <div>
                                        <div className="game-title">{game.title}
                                            <span className="detail-year">
                                                ({game.released_year})
                                            </span>
                                            <button onClick={() => setShowEditModal(true)}><i className='fa-solid fa-edit'></i></button>
                                            <button onClick={() => setShowDeleteModal(true)}><i className='fa-solid fa-trash'></i></button>
                                        </div>
                                        <div className="detail-category">{game.category}</div>
                                    </div>
                                </div>

                                <div><b>Publisher: </b>{game.publisher}</div>
                                <div><b>Game studio: </b>{game.game_studio}</div>
                                <div className="detail-description">
                                    <h2>Description</h2>
                                    <div>{game.description}</div>
                                </div>
                                <a className='detail-link' href={game.link} target="_blank">Link</a>
                            </div>
                            <div className="game-thumbnail">
                                <img src={game.image} alt={game.title} />
                            </div>
                        </div>
                    </div>

                    <EditVideoGameModal
                        videogame={game}
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleUpdate}

                    />

                    <Modal
                        title="Confirm delete"
                        content={<p>Are you sure you want to delete this game?</p>}
                        show={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={handleDelete}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default VideoGameDetail