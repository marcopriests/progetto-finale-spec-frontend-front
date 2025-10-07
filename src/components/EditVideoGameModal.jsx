import { useState, useRef } from 'react'
import Modal from './Modal'

const EditVideoGameModal = ({ show, onClose, videogame, onSave }) => {
    const [editedVideoGame, setEditedVideoGame] = useState(videogame);
    const editFormRef = useRef();

    const changeEditedVideoGame = (key, event) => {
        setEditedVideoGame(prev => {
            if (key === 'released_year') {
                return { ...prev, [key]: parseInt(event.target.value) }
            }

            if (key === 'vote_average') {
                return { ...prev, [key]: parseFloat(event.target.value) }
            }

            return { ...prev, [key]: event.target.value }
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedVideoGame);
    };

    const { title, category, released_year, publisher, game_studio, vote_average, description, image, link, owner } = editedVideoGame;
    return (
        <Modal
            title='Edit Video Game'
            content={
                <div className='container d-flex'>
                    <form ref={editFormRef} onSubmit={handleSubmit}>
                        <label>
                            Video Game Title:
                            <input
                                className="form-field"
                                type="text"
                                value={title}
                                onChange={(e) => changeEditedVideoGame('title', e)}
                            />
                        </label>

                        <label>
                            Category:
                            <input
                                className="form-field"
                                type="text"
                                value={category}
                                onChange={(e) => changeEditedVideoGame('category', e)}
                            />
                        </label>

                        <label>
                            Released Year:
                            <input
                                className="form-field"
                                type="number"
                                value={released_year}
                                onChange={(e) => changeEditedVideoGame('released_year', e)}
                            />
                        </label>

                        <label>
                            Publisher:
                            <input
                                className="form-field"
                                type="text"
                                value={publisher}
                                onChange={(e) => changeEditedVideoGame('publisher', e)}
                            />
                        </label>

                        <label>
                            Game studio:
                            <input
                                className="form-field"
                                type="text"
                                value={game_studio}
                                onChange={(e) => changeEditedVideoGame('game_studio', e)}
                            />
                        </label>

                        <label>
                            Average Vote:
                            <input
                                className="form-field"
                                type="number"
                                value={vote_average}
                                onChange={(e) => changeEditedVideoGame('vote_average', e)}
                            />
                        </label>

                        <label>
                            Description:
                            <textarea
                                className='form-field'
                                value={description}
                                onChange={(e) => changeEditedVideoGame('description', e)}
                            />
                        </label>

                        <label>
                            Image URL:
                            <input
                                className="form-field"
                                type="text"
                                value={image}
                                onChange={(e) => changeEditedVideoGame('image', e)}
                            />
                        </label>

                        <label>
                            External Link:
                            <input
                                className="form-field"
                                type="string"
                                value={link}
                                onChange={(e) => changeEditedVideoGame('link', e)}
                            />
                        </label>

                        <label>
                            Owner:
                            <input
                                className="form-field"
                                type="string"
                                value={owner}
                                onChange={(e) => changeEditedVideoGame('owner', e)}
                            />
                        </label>
                    </form>
                </div>
            }
            confirmText='Save'
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}

export default EditVideoGameModal