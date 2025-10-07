import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal';
import EditBoardGameModal from '../components/EditBoardGameModal';
import { GlobalContext } from '../context/GlobalContext';

const BoardGameDetail = () => {
    const { favoriteBoardGames, changeFavoritesBG, updateBoardGame, removeBoardGame } = useContext(GlobalContext);

    const [game, setGame] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();

    const fetchGame = () => {
        fetch(`http://localhost:3001/boardgames/${id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.boardgame);
            })
    }

    useEffect(() => {
        fetchGame();
    }, [])

    const handleUpdate = async updatedBoardGame => {
        try {
            await updateBoardGame(updatedBoardGame)
            fetchGame()
            setShowEditModal(false)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleDelete = async () => {
        try {
            await removeBoardGame(game.id);
            changeFavoritesBG(favoriteBoardGames.filter(fav => fav.id !== game.id));
            alert('Board Game deleted with success!');
            navigate('/boardgames');
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
                                <div className="detail-info">
                                    <div>{game.min_players}-{game.max_players} Players</div>
                                    <div className="detail-info-separator"></div>
                                    <div>{game.playtime} Min</div>
                                    <div className="detail-info-separator"></div>
                                    <div>Age: {game.min_age}+</div>
                                </div>
                                <div><b>Designer: </b>{game.designer}</div>
                                <div><b>Artist: </b>{game.artist}</div>
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

                    <EditBoardGameModal
                        boardgame={game}
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

export default BoardGameDetail