import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'

const EditBoardGameModal = ({ show, onClose, boardgame, onSave }) => {
    const [editedBoardGame, setEditedBoardGame] = useState(boardgame);
    const editFormRef = useRef();

    const changeEditedBoardGame = (key, event) => {
        setEditedBoardGame(prev => ({ ...prev, [key]: event.target.value }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSave(editedBoardGame);
    };

    console.log(editFormRef)

    const { title, category, released_year, designer, artist, vote_average, description, min_players, max_players, playtime, min_age, image, link, owner } = editedBoardGame;
    return (
        <Modal
            title='Edit Board Game'
            content={
                <div className='container d-flex'>
                    <form ref={editFormRef} onSubmit={handleSubmit}>
                        <label>
                            Board Game Title:
                            <input
                                className="form-field"
                                type="text"
                                value={title}
                                onChange={(e) => changeEditedBoardGame('title', e)}
                            />
                        </label>

                        <label>
                            Category:
                            <input
                                className="form-field"
                                type="text"
                                value={category}
                                onChange={(e) => changeEditedBoardGame('category', e)}
                            />
                        </label>

                        <label>
                            Released Year:
                            <input
                                className="form-field"
                                type="number"
                                value={released_year}
                                onChange={(e) => changeEditedBoardGame('released_year', e)}
                            />
                        </label>

                        <label>
                            Designer:
                            <input
                                className="form-field"
                                type="text"
                                value={designer}
                                onChange={(e) => changeEditedBoardGame('designer', e)}
                            />
                        </label>

                        <label>
                            Artist:
                            <input
                                className="form-field"
                                type="text"
                                value={artist}
                                onChange={(e) => changeEditedBoardGame('artist', e)}
                            />
                        </label>

                        <label>
                            Average Vote:
                            <input
                                className="form-field"
                                type="number"
                                value={vote_average}
                                onChange={(e) => changeEditedBoardGame('vote_average', e)}
                            />
                        </label>

                        <label>
                            Description:
                            <textarea
                                className='form-field'
                                value={description}
                                onChange={(e) => changeEditedBoardGame('description', e)}
                            />
                        </label>

                        <label>
                            Min Players:
                            <input
                                className="form-field"
                                type="number"
                                value={min_players}
                                onChange={(e) => changeEditedBoardGame('min_players', e)}
                            />
                        </label>

                        <label>
                            Max Players:
                            <input
                                className="form-field"
                                type="number"
                                value={max_players}
                                onChange={(e) => changeEditedBoardGame('max_players', e)}
                            />
                        </label>

                        <label>
                            Playtime:
                            <input
                                className="form-field"
                                type="number"
                                value={playtime}
                                onChange={(e) => changeEditedBoardGame('playtime', e)}
                            />
                        </label>

                        <label>
                            Min Age:
                            <input
                                className="form-field"
                                type="number"
                                value={min_age}
                                onChange={(e) => changeEditedBoardGame('min_age', e)}
                            />
                        </label>

                        <label>
                            Image URL:
                            <input
                                className="form-field"
                                type="text"
                                value={image}
                                onChange={(e) => changeEditedBoardGame('image', e)}
                            />
                        </label>

                        <label>
                            External Link:
                            <input
                                className="form-field"
                                type="string"
                                value={link}
                                onChange={(e) => changeEditedBoardGame('link', e)}
                            />
                        </label>

                        <label>
                            Owner:
                            <input
                                className="form-field"
                                type="string"
                                value={owner}
                                onChange={(e) => changeEditedBoardGame('owner', e)}
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

export default EditBoardGameModal