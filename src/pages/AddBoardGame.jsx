import React, { useState, useContext, useMemo, useRef } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const AddBoardGame = () => {
    const { addBoardGame } = useContext(GlobalContext);

    const [boardGame, setBoardGame] = useState('');
    const categoryRef = useRef();
    const yearRef = useRef();
    const designerRef = useRef();
    const artistRef = useRef();
    const voteRef = useRef();
    const descriptionRef = useRef();
    const minPlayersRef = useRef();
    const maxPlayersRef = useRef();
    const playtimeRef = useRef();
    const minAgeRef = useRef();
    const imageRef = useRef();
    const linkRef = useRef();
    const ownerRef = useRef();

    const boardGameError = useMemo(() => {
        if (!boardGame.trim()) return "The title can't be empty.";
        return '';
    }, [boardGame]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (boardGameError)
            return;

        const designer = designerRef.current.value.trim().split(', ');
        const artist = artistRef.current.value.trim().split(', ');

        const newBoardGame = {
            title: boardGame.trim().toLowerCase(),
            category: categoryRef.current.value.trim().toLowerCase(),
            released_year: parseInt(yearRef.current.value),
            designer: designer,
            artist: artist,
            vote_average: parseFloat(voteRef.current.value),
            description: descriptionRef.current.value.trim(),
            min_players: parseInt(minPlayersRef.current.value),
            max_players: parseInt(maxPlayersRef.current.value),
            playtime: parseInt(playtimeRef.current.value),
            min_age: parseInt(minAgeRef.current.value),
            image: imageRef.current.value.trim(),
            link: linkRef.current.value.trim(),
            id: 20,
            createdAt: "2024-10-05T12:00:00.000Z",
            updatedAt: "2024-10-05T12:00:00.000Z",
            owner: ownerRef.current.value.trim(),
        };

        try {
            await addBoardGame(newBoardGame);
            alert('Board Game added with success!');
            setBoardGame('');
            categoryRef.current.value = '';
            yearRef.current.value = '';
            designerRef.current.value = '';
            artistRef.current.value = '';
            voteRef.current.value = '';
            descriptionRef.current.value = '';
            minPlayersRef.current.value = '';
            maxPlayersRef.current.value = '';
            playtimeRef.current.value = '';
            minAgeRef.current.value = '';
            imageRef.current.value = '';
            linkRef.current.value = '';
            ownerRef.current.value = '';
        } catch (error) {
            alert('Error occurs during the submit', error.message);
        }
    }

    return (
        <>
            <div className="container">
                <h1>Add new Board Game</h1>
                <form>

                    <div>
                        <label>
                            Board Game Title:
                            <input
                                className="form-field"
                                type="text"
                                value={boardGame}
                                onChange={(e) => setBoardGame(e.target.value)}
                            />
                        </label>
                        {boardGameError &&
                            <p style={{ color: 'red' }}>{boardGameError}</p>
                        }
                    </div>

                    <label>
                        Category:
                        <input
                            className="form-field"
                            type="text"
                            ref={categoryRef}
                            required
                        />
                    </label>

                    <label>
                        Released Year:
                        <input
                            className="form-field"
                            type="number"
                            ref={yearRef}
                            required
                        />
                    </label>

                    <label>
                        Designer:
                        <input
                            className="form-field"
                            type="text"
                            ref={designerRef}
                            required
                        />
                    </label>

                    <label>
                        Artist:
                        <input
                            className="form-field"
                            type="text"
                            ref={artistRef}
                            required
                        />
                    </label>

                    <label>
                        Average Vote:
                        <input
                            className="form-field"
                            type="number"
                            ref={voteRef}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            className='form-field'
                            ref={descriptionRef}
                            required
                        />
                    </label>

                    <label>
                        Min Players:
                        <input
                            className="form-field"
                            type="number"
                            ref={minPlayersRef}
                            required
                        />
                    </label>

                    <label>
                        Max Players:
                        <input
                            className="form-field"
                            type="number"
                            ref={maxPlayersRef}
                            required
                        />
                    </label>

                    <label>
                        Playtime:
                        <input
                            className="form-field"
                            type="number"
                            ref={playtimeRef}
                            required
                        />
                    </label>

                    <label>
                        Min Age:
                        <input
                            className="form-field"
                            type="number"
                            ref={minAgeRef}
                            required
                        />
                    </label>

                    <label>
                        Image URL:
                        <input
                            className="form-field"
                            type="text"
                            ref={imageRef}
                            required
                        />
                    </label>

                    <label>
                        External Link:
                        <input
                            className="form-field"
                            type="string"
                            ref={linkRef}
                            required
                        />
                    </label>

                    <label>
                        Owner:
                        <input
                            className="form-field"
                            type="string"
                            ref={ownerRef}
                        />
                    </label>

                    <button
                        className="btn"
                        type="submit"
                        disabled={boardGameError}
                        onClick={handleSubmit}>
                        Add Board Game
                    </button>

                </form>
            </div>
        </>
    )
}

export default AddBoardGame