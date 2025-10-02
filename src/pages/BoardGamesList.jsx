import { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import BoardGameCard from '../components/BoardGameCard'
import { GlobalContext } from '../context/GlobalContext'
import CompareCard from '../components/CompareCard';
import Comparator from '../components/Comparator';

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
};

const BoardGamesList = () => {
    const { boardGames, compare, setCompare } = useContext(GlobalContext); // prendo i board games dal context

    const [query, setQuery] = useState(''); // stato per la barra di ricerca
    const debouncedSetQuery = useCallback(debounce(setQuery, 500), []); // debounce sulla ricerca

    const [selectedCategory, setSelectedCategory] = useState(''); // stato per il filtro categoria
    const [sortBy, setSortBy] = useState('title a-z'); // 'title a-z', 'title z-a', 'category a-z', 'category z-a'

    const filteredAndSortedBoardGames = useMemo(() => {
        return [...boardGames]
            .filter(game => game.title.toLowerCase().includes(query.toLowerCase()))
            .filter(game => selectedCategory ? game.category === selectedCategory : true)
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
    }, [boardGames, sortBy, query, selectedCategory])

    console.log('BoardGamesList rerender'); // Controllo i rerender

    return (
        <>
            <div className='header'>
                <div className="container">
                    <h1>Board Games</h1>
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
                                    boardGames && boardGames.filter((game, index, self) =>
                                        index === self.findIndex((g) => (
                                            g.category === game.category
                                        ))
                                    ).sort((a, b) => a.category.localeCompare(b.category)).map(game => (
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

                {/* board games list */}
                <div className='cards-container'>
                    {filteredAndSortedBoardGames.length > 0
                        ? filteredAndSortedBoardGames.map((game) => (
                            <BoardGameCard key={game.id} bg={game} />
                        ))
                        : <p>No boards games found.</p>
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

export default BoardGamesList