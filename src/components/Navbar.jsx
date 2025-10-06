import { NavLink } from "react-router-dom"

function Navbar() {

    return (
        <>
            <div className="navbar">
                <h2 className="logo"><span>Your Games</span> Companion</h2>
                <div className="dropdown">Board Games
                    <div className="dropdown-content">
                        <NavLink className='link' to='/'>Board Games List</NavLink>
                        <NavLink className='link' to='/favorites'>Favorite Board Games</NavLink>
                        <NavLink className='link' to='boardgames/add'>Add New Board Game</NavLink>
                    </div>
                </div>

                <div className="dropdown">Video Games
                    <div className="dropdown-content">
                        <NavLink className='link' to='/'>Board Games List</NavLink>
                        <NavLink className='link' to='/favorites'>Favorite Board Games</NavLink>
                        <NavLink className='link' to='boardgames/add'>Add New Board Game</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar