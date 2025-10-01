import { useState, useEffect } from 'react'
import BoardGameCard from '../components/BoardGameCard'

const BoardGamesList = () => {
    const [boardGames, setBoardGames] = useState(null); // stato per memorizzare i board games
    const [query, setQuery] = useState(''); // stato per la barra di ricerca
    const [selectedCategory, setSelectedCategory] = useState(''); // stato per il filtro categoria
    const [sortBy, setSortBy] = useState('title a-z'); // 'title a-z', 'title z-a', 'category a-z', 'category z-a'

    // funzione per aggiornare lo stato della query di ricerca
    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    // funzione per fetchare i board games dal server
    const fetchBoardGames = async () => {
        const response = await fetch('http://localhost:3001/boardgames')
        const data = await response.json()
        setBoardGames(data)
    }

    useEffect(() => {
        fetchBoardGames()
    }, [])

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

    return (
        <div className='container'>
            <h1>Board Games List Page</h1>

            {/* Barra di ricerca e filtro categoria */}
            <div>
                {/* searchbar */}
                <div className='search-bar'>
                    <input
                        type='text'
                        placeholder='Search board games...'
                        value={query}
                        onChange={handleSearch}
                    />
                </div>
                {/* filtro categoria */}
                <div className='category-filter'>
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value=''>Filter by category</option>
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
                {/* sorting */}
                <div className='sorting'>
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
    )
}

export default BoardGamesList