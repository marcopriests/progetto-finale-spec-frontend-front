import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import CompareCard from './CompareCard'
import { useLocation } from 'react-router-dom'

const Comparator = () => {
    // recupero le funzioni dal context
    const { compare, setCompare } = useContext(GlobalContext)

    // inizializzo useLocation per capire in che pagina mi trovo
    const location = useLocation();
    return (
        <div className={`compare-bar ${compare.length > 0 ? 'compare-active' : ''}`}>
            <div className="container">
                <details>
                    <summary
                        className='compare-title'
                    >
                        Comparator ({compare.length})
                    </summary>
                    <div>
                        <div onClick={() => setCompare([])} className='clear-compare'><i className="fa-solid fa-xmark"></i>Clear comparator</div>
                        <div className='compare-container'>
                            {compare.map(game => (
                                <CompareCard key={game.id} location={location} item={game} />
                            ))}
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default Comparator