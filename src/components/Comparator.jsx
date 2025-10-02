import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import CompareCard from './CompareCard'

const Comparator = () => {
    const { compare, setCompare } = useContext(GlobalContext)
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
                                <CompareCard key={game.id} bg={game} />
                            ))}
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default Comparator