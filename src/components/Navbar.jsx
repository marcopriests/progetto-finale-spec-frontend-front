import { NavLink } from "react-router-dom"

function Navbar() {

    return (
        <>
            <div className="navbar">
                <h2 className="logo"><span>Board Games</span> Companion</h2>
                <NavLink className='link' to='/'>Board Games</NavLink>
                <NavLink className='link' to='/favorites'>Favorite Games</NavLink>
            </div>
        </>
    )
}

export default Navbar