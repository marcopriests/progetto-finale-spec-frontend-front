import { useState, useContext, useCallback, useMemo, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Comparator from '../components/Comparator';
import VideoGameCard from '../components/VideoGameCard';
import debounce from '../functions/debounce';

const VideoGamesList = () => {
    // recupero le funzioni dal context
    const { videoGames, compare, setCompare } = useContext(GlobalContext);

    // resetto il comparatore
    useEffect(() => {
        setCompare([]);
    }, []);

    const [query, setQuery] = useState(''); // stato per la barra di ricerca
    const debouncedSetQuery = useCallback(debounce(setQuery, 500), []); // debounce sulla ricerca

    const [selectedCategory, setSelectedCategory] = useState(''); // stato per il filtro categoria
    const [sortBy, setSortBy] = useState('title a-z'); // 'title a-z', 'title z-a', 'category a-z', 'category z-a'

    const filteredAndSortedVideoGames = useMemo(() => {
        return [...videoGames]
            .filter(game => game.title.toLowerCase().includes(query.toLowerCase()))
            .filter(game => selectedCategory ? game.category.toLowerCase() === selectedCategory.toLowerCase() : true)
            .sort((a, b) => {
                if (sortBy === 'title a-z') {
                    return a.title.localeCompare(b.title); // Ordina in ordine alfabetico crescente per titolo
                }
                if (sortBy === 'title z-a') {
                    return b.title.localeCompare(a.title); // Ordina in ordine alfabetico decrescente per titolo
                }
                if (sortBy === 'category a-z') {
                    return a.category.localeCompare(b.category); // Ordina in ordine alfabetico crescente per categoria
                }
                if (sortBy === 'category z-a') {
                    return b.category.localeCompare(a.category); // Ordina in ordine alfabetico decrescente per categoria
                }
                return 0;
            })
    }, [videoGames, sortBy, query, selectedCategory])
    return (
        <>
            <div className='header'>
                <div className="container">
                    <h1>Video Games</h1>
                </div>
            </div>

            <div className='container'>

                {/* Barra di ricerca e filtro categoria */}
                <div className='filters-container'>
                    {/* searchbar */}
                    <div className="search-filter">
                        <div className='search-bar'>
                            <label className='filter-label'>Search</label>

                            <input
                                type='text'
                                placeholder="Title..."
                                onChange={(e) => debouncedSetQuery(e.target.value)}
                            />
                        </div>
                        {/* filtro categoria */}
                        <div className='category-filter'>
                            <label className='filter-label'>Filter by category</label>
                            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                <option value=''>All categories</option>
                                {
                                    videoGames && videoGames
                                        .filter((game, index, self) =>
                                            index === self.findIndex((g) => (
                                                g.category.toLowerCase() === game.category.toLowerCase()
                                            )))
                                        .sort((a, b) => a.category.localeCompare(b.category))
                                        .map(game => (
                                            <option key={game.id} value={game.category}>{game.category}</option>
                                        ))
                                }
                            </select>
                        </div>
                    </div>
                    {/* sorting */}
                    <div className='sorting'>

                        <label className='filter-label'>Sort by</label>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value='title a-z'>Title, A-Z</option>
                            <option value='title z-a'>Title, Z-A</option>
                            <option value='category a-z'>Category, A-Z</option>
                            <option value='category z-a'>Category, Z-A</option>
                        </select>
                    </div>
                </div>

                {/* video games list */}
                <div className='cards-container'>
                    {filteredAndSortedVideoGames.length > 0
                        ? filteredAndSortedVideoGames.map((game) => (
                            <VideoGameCard key={game.id} vg={game} />
                        ))
                        : <p>No video games found.</p>
                    }
                </div>
            </div>

            {/* COMPARE-BAR */}
            {compare.length > 0 && (
                <Comparator />
            )}
        </>
    )
}

export default VideoGamesList