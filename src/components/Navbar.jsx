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
                    </div>
                </div>

                <div className="dropdown">Video Games
                    <div className="dropdown-content">
                        <NavLink className='link' to='/videogames'>Video Games List</NavLink>
                        <NavLink className='link' to='videogames/favorites'>Favorite Video Games</NavLink>
                    </div>
                </div>

                <NavLink className='link add' to='/add'><i className="fa-solid fa-add"></i> Add New Game</NavLink>
            </div>
        </>
    )
}

export default Navbar