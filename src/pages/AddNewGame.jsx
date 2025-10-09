import React, { useState, useContext, useMemo, useRef } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const AddNewGame = () => {
    // stato per identificare che tipologia di gioco voglio aggiungere
    const [selectedType, setSelectedType] = useState('')

    // recupero le funzioni per aggiungere i giochi dal context
    const { addBoardGame, addVideoGame } = useContext(GlobalContext);

    // definisco due stati booleani che cambiano solo al variare di selectedType per definire se voglio aggiungere un boardgame oppure un videogame
    const isBoardgame = useMemo(() => selectedType === 'boardgame', [selectedType]);
    const isVideogame = useMemo(() => selectedType === 'videogame', [selectedType]);

    // definisco i campi comuni
    const [game, setGame] = useState('');
    const categoryRef = useRef();
    const yearRef = useRef();
    const voteRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const linkRef = useRef();
    const ownerRef = useRef();

    // definisco i campi boardgame
    const designerRef = useRef();
    const artistRef = useRef();
    const minPlayersRef = useRef();
    const maxPlayersRef = useRef();
    const playtimeRef = useRef();
    const minAgeRef = useRef();

    // definisco i campi video game    
    const publisherRef = useRef();
    const gameStudioRef = useRef();

    // controllo per evitare che il titolo rimanga vuoto
    const gameError = useMemo(() => {
        if (!game.trim()) return "The title can't be empty.";
        return '';
    }, [game]);

    // funzione che avviene al submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // se il title è vuoto ritorno un errore
        if (gameError)
            return;

        // trasformo i campi designer e artist in array
        const designer = isBoardgame && designerRef.current.value.trim().split(', ');
        const artist = isBoardgame && artistRef.current.value.trim().split(', ');

        // creo l'oggetto newGame da aggiungere al db
        const gameObject = () => {
            if (isBoardgame) {
                return {
                    id: 0,
                    createdAt: "",
                    updatedAt: "",
                    title: game.trim().toLowerCase(),
                    category: categoryRef.current.value.trim().toLowerCase(),
                    released_year: parseInt(yearRef.current.value),
                    vote_average: parseFloat(voteRef.current.value),
                    description: descriptionRef.current.value.trim(),
                    image: imageRef.current.value.trim(),
                    link: linkRef.current.value.trim(),
                    owner: ownerRef.current.value.trim(),
                    designer: designer,
                    artist: artist,
                    min_players: parseInt(minPlayersRef.current.value),
                    max_players: parseInt(maxPlayersRef.current.value),
                    playtime: parseInt(playtimeRef.current.value),
                    min_age: parseInt(minAgeRef.current.value)
                }
            }
            if (isVideogame) {
                return {
                    id: 0,
                    createdAt: "",
                    updatedAt: "",
                    title: game.trim().toLowerCase(),
                    category: categoryRef.current.value.trim().toLowerCase(),
                    released_year: parseInt(yearRef.current.value),
                    vote_average: parseFloat(voteRef.current.value),
                    description: descriptionRef.current.value.trim(),
                    image: imageRef.current.value.trim(),
                    link: linkRef.current.value.trim(),
                    owner: ownerRef.current.value.trim(),
                    publisher: publisherRef.current.value.trim(),
                    game_studio: gameStudioRef.current.value.trim(),
                }
            }
        };

        const newGame = gameObject();

        try {
            // aggiungo il newGame al db a seconda se selectedType è uguale a boardgame oppure videogame
            if (isBoardgame) {
                // effettuo il controllo per i campi vuoti
                if (
                    categoryRef.current.value === '' ||
                    descriptionRef.current.value === '' ||
                    imageRef.current.value === '' ||
                    linkRef.current.value === '' ||
                    ownerRef.current.value === '' ||
                    designer.length === 0 ||
                    artist.length === 0
                ) {
                    throw Error('Compile all fields before continue.');
                }

                // effettuo il controllo sui campi numerici
                if (
                    isNaN(parseInt(yearRef.current.value)) ||
                    isNaN(parseFloat(voteRef.current.value)) ||
                    isNaN(parseInt(minPlayersRef.current.value)) ||
                    isNaN(parseInt(maxPlayersRef.current.value)) ||
                    isNaN(parseInt(playtimeRef.current.value)) ||
                    isNaN(parseInt(minAgeRef.current.value))
                ) {
                    throw Error('Invalid characters in numeric fields.')
                }

                // invio la richiesta per aggiungere il gioco da tavolo
                await addBoardGame(newGame);
            }

            if (isVideogame) {
                // effettuo il controllo per i campi vuoti
                if (
                    categoryRef.current.value === '' ||
                    descriptionRef.current.value === '' ||
                    imageRef.current.value === '' ||
                    linkRef.current.value === '' ||
                    ownerRef.current.value === '' ||
                    publisherRef.current.value === '' ||
                    gameStudioRef.current.value === ''
                ) {
                    throw Error('Compile all fields before continue.');
                }

                // effettuo il controllo sui campi numerici
                if (
                    isNaN(parseInt(yearRef.current.value)) ||
                    isNaN(parseFloat(voteRef.current.value))
                ) {
                    throw Error('Invalid characters in numeric fields.')
                }

                // invio la richiesta per aggiungere il videogioco
                await addVideoGame(newGame);
            }

            alert('Game added with success!');

            // resetto tutti i campi
            setGame('');
            categoryRef.current.value = '';
            yearRef.current.value = '';
            voteRef.current.value = '';
            descriptionRef.current.value = '';
            imageRef.current.value = '';
            linkRef.current.value = '';
            ownerRef.current.value = '';

            if (isBoardgame) {
                designerRef.current.value = '';
                artistRef.current.value = '';
                minPlayersRef.current.value = '';
                maxPlayersRef.current.value = '';
                playtimeRef.current.value = '';
                minAgeRef.current.value = '';
            }

            if (isVideogame) {
                publisherRef.current.value = '';
                gameStudioRef.current.value = '';
            }
        } catch (error) {
            // catturo eventuali errori e li inserisco in un alert
            alert(error.message);
        }
    }

    return (
        <>
            <div className="container">
                <h1 className='form-title'>Add New Game</h1>

                {/* select per definire che tipologia di gioco si vuole aggiungere */}
                <label>
                    Select Game Type:
                    <select className='form-field type-select' value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value=''>Select type</option>
                        <option value='boardgame'>Board game</option>
                        <option value='videogame'>Video game</option>
                    </select>
                </label>

                {selectedType &&
                    <form>
                        <div>
                            <label>
                                Game Title:
                                <input
                                    className="form-field"
                                    type="text"
                                    value={game}
                                    onChange={(e) => setGame(e.target.value)}
                                />
                            </label>
                            {gameError &&
                                <p style={{ color: 'red' }}>{gameError}</p>
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

                        {/* Campi visibili solo se si vuole aggiungere un board game */}
                        {isBoardgame &&
                            <>
                                <label>
                                    Designer:
                                    <input
                                        className="form-field"
                                        type="text"
                                        ref={designerRef}
                                    />
                                </label>

                                <label>
                                    Artist:
                                    <input
                                        className="form-field"
                                        type="text"
                                        ref={artistRef}
                                    />
                                </label>

                                <label>
                                    Min Players:
                                    <input
                                        className="form-field"
                                        type="number"
                                        ref={minPlayersRef}
                                    />
                                </label>

                                <label>
                                    Max Players:
                                    <input
                                        className="form-field"
                                        type="number"
                                        ref={maxPlayersRef}
                                    />
                                </label>

                                <label>
                                    Playtime:
                                    <input
                                        className="form-field"
                                        type="number"
                                        ref={playtimeRef}
                                    />
                                </label>

                                <label>
                                    Min Age:
                                    <input
                                        className="form-field"
                                        type="number"
                                        ref={minAgeRef}
                                    />
                                </label>
                            </>
                        }

                        {/* Campi visibili solo se si vuole aggiungere un video game */}
                        {isVideogame &&
                            <>
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
                            </>
                        }

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
                            disabled={gameError}
                            onClick={handleSubmit}>
                            Add Game
                        </button>

                    </form>
                }
            </div>
        </>
    )
}

export default AddNewGame