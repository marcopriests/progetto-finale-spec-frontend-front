import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

function DefaultLayout() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default DefaultLayout