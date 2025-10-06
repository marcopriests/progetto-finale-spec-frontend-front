import { NavLink } from "react-router-dom"

function Navbar() {

    return (
        <>
            <div className="navbar">
                <NavLink to={'/'}><h2 className="logo"><span>Your Games</span> Companion</h2></NavLink>
                <div className="dropdown">Board Games
                    <div className="dropdown-content">
                        <NavLink className='link' to='/boardgames'>Board Games List</NavLink>
                        <NavLink className='link' to='boardgames/favorites'>Favorite Board Games</NavLink>
                        <NavLink className='link' to='boardgames/add'>Add New Board Game</NavLink>
                    </div>
                </div>

                <div className="dropdown">Video Games
                    <div className="dropdown-content">
                        <NavLink className='link' to='/videogames'>Video Games List</NavLink>
                        <NavLink className='link' to='videogames/favorites'>Favorite Video Games</NavLink>
                        <NavLink className='link' to='videogames/add'>Add New Video Game</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar