import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal';
import EditVideoGameModal from '../components/EditVideoGameModal';
import { GlobalContext } from '../context/GlobalContext';

const VideoGameDetail = () => {
    // importo le funzioni dal context
    const { favoriteVideoGames, changeFavoritesVG, updateVideoGame, removeVideoGame } = useContext(GlobalContext);

    // dichiaro uno stato in cui salverò il gioco
    const [game, setGame] = useState(null);

    // dichiaro gli stati per gestire le modali di edit e delete
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // recupero l'id del gioco per la chiamata fetch
    const id = useParams().id;

    // inizializzo useNavigate
    const navigate = useNavigate();

    const fetchGame = () => {
        fetch(`http://localhost:3001/videogames/${id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data.videogame);
            })
    }

    // effettuo la funzione fetch al montaggio della pagina
    useEffect(() => {
        fetchGame();
    }, [])

    // funzione per la modifica del gioco
    const handleUpdate = async updatedVideoGame => {
        try {
            // eseguo la funzione che modifica il gioco
            await updateVideoGame(updatedVideoGame);

            // eseguo un nuovo fetch per mostrare le modifiche
            fetchGame()

            // chiudo la modale
            setShowEditModal(false)
        } catch (error) {
            alert(error.message)
        } finally {
            alert('Video Game edited with success!');
        }
    }

    // funzione per l'eliminazione del gioco
    const handleDelete = async () => {
        try {
            // eseguo la funzione per eliminare il gioco
            await removeVideoGame(game.id);

            // rimuovo il gioco dai preferiti qualora ne facesse parte
            changeFavoritesVG(favoriteVideoGames.filter(fav => fav.id !== game.id));
            alert('Video Game deleted with success!');

            // rimando l'utente alla lista dei giochi
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
                                            {/* bottoni per modali */}
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

                    {/* modifica gioco */}
                    <EditVideoGameModal
                        videogame={game}
                        show={showEditModal}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleUpdate}

                    />

                    {/* elimina gioco */}
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