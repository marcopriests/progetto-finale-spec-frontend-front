import { useState, useEffect, useContext } from 'react'
import BoardGameCard from '../components/BoardGameCard'
import { GlobalContext } from '../context/GlobalContext'
import CompareCard from '../components/CompareCard';

const BoardGamesList = () => {
    const { boardGames, compare, setCompare } = useContext(GlobalContext); // prendo i board games dal context

    const [query, setQuery] = useState(''); // stato per la barra di ricerca
    const [selectedCategory, setSelectedCategory] = useState(''); // stato per il filtro categoria
    const [sortBy, setSortBy] = useState('title a-z'); // 'title a-z', 'title z-a', 'category a-z', 'category z-a'
    const [activeCompare, setActiveCompare] = useState(false);

    // funzione per aggiornare lo stato della query di ricerca
    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    // filtro e ordino i board games in base alla query di ricerca, categoria selezionata e criterio di ordinamento
    const filteredAndSortedBoardGames = boardGames?.filter((game) => {
        return (game.title.toLowerCase().includes(query.toLowerCase())) && (selectedCategory ? game.category === selectedCategory : true)
    }).sort((a, b) => {
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
    });

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
                                value={query}
                                onChange={handleSearch}
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


                <div className='cards-container'>
                    {filteredAndSortedBoardGames && filteredAndSortedBoardGames.map((game) => (
                        <BoardGameCard key={game.id} bg={game} />
                    ))}
                </div>

            </div>
            {compare.length > 0 && (
                <div className={`compare-bar ${compare.length > 0 ? 'compare-active' : ''}`}>
                    <div className="container">
                        <details>
                            <summary
                                onClick={() => setActiveCompare(!activeCompare)}
                                className='compare-title'
                            >
                                Comparator ({compare.length})
                            </summary>
                            <div>
                                <div onClick={() => setCompare([])} className='clear-compare'><i className="fa-solid fa-xmark"></i>Clear comparator</div>
                                <div className='cards-container'>
                                    {compare.map(game => (
                                        <CompareCard key={game.id} bg={game} />
                                    ))}
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            )}
        </>
    )
}

export default BoardGamesList