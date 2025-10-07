import React, { useState, useContext, useMemo, useRef } from 'react'
import { GlobalContext } from '../context/GlobalContext';

const AddVideoGame = () => {
    const { addVideoGame } = useContext(GlobalContext);

    const [videoGame, setVideoGame] = useState('');
    const categoryRef = useRef();
    const yearRef = useRef();
    const publisherRef = useRef();
    const gameStudioRef = useRef();
    const voteRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const linkRef = useRef();
    const ownerRef = useRef();

    const videoGameError = useMemo(() => {
        if (!videoGame.trim()) return "The title can't be empty.";
        return '';
    }, [videoGame]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (videoGameError)
            return;

        const newVideoGame = {
            title: videoGame.trim().toLowerCase(),
            category: categoryRef.current.value.trim().toLowerCase(),
            released_year: parseInt(yearRef.current.value),
            publisher: publisherRef.current.value.trim().toLowerCase(),
            game_studio: gameStudioRef.current.value.trim().toLowerCase(),
            vote_average: parseFloat(voteRef.current.value),
            description: descriptionRef.current.value.trim(),
            image: imageRef.current.value.trim(),
            link: linkRef.current.value.trim(),
            owner: ownerRef.current.value.trim(),
            id: 0,
            createdAt: "",
            updatedAt: "",
        };

        try {
            await addVideoGame(newVideoGame);
            alert('Video Game added with success!');
            setVideoGame('');
            categoryRef.current.value = '';
            yearRef.current.value = '';
            publisherRef.current.value = '';
            gameStudioRef.current.value = '';
            voteRef.current.value = '';
            descriptionRef.current.value = '';
            imageRef.current.value = '';
            linkRef.current.value = '';
            ownerRef.current.value = '';
        } catch (error) {
            alert('Error occurs during the submit', error.message);
        }
    }

    return (
        <div className="container">
            <h1>Add new Video Game</h1>
            <form>

                <div>
                    <label>
                        Video Game Title:
                        <input
                            className="form-field"
                            type="text"
                            value={videoGame}
                            onChange={(e) => setVideoGame(e.target.value)}
                        />
                    </label>
                    {videoGameError &&
                        <p style={{ color: 'red' }}>{videoGameError}</p>
                    }
                </div>

                <label>
                    Category:
                    <input
                        className="form-field"
                        type="text"
                        ref={categoryRef}
                    />
                </label>

                <label>
                    Released Year:
                    <input
                        className="form-field"
                        type="number"
                        ref={yearRef}
                    />
                </label>

                <label>
                    Publisher:
                    <input
                        className="form-field"
                        type="text"
                        ref={publisherRef}
                    />
                </label>

                <label>
                    Game studio:
                    <input
                        className="form-field"
                        type="text"
                        ref={gameStudioRef}
                    />
                </label>

                <label>
                    Average Vote:
                    <input
                        className="form-field"
                        type="number"
                        ref={voteRef}
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        className='form-field'
                        ref={descriptionRef}
                    />
                </label>

                <label>
                    Image URL:
                    <input
                        className="form-field"
                        type="text"
                        ref={imageRef}
                    />
                </label>

                <label>
                    External Link:
                    <input
                        className="form-field"
                        type="string"
                        ref={linkRef}
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
                    disabled={videoGameError}
                    onClick={handleSubmit}>
                    Add Video Game
                </button>

            </form>
        </div>
    )
}

export default AddVideoGame