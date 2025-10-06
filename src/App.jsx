import { BrowserRouter, Routes, Route } from "react-router-dom"
import BoardGamesList from "./pages/boardGamesList"
import BoardGameDetail from "./pages/BoardGameDetail"
import DefaultLayout from "./layout/DefaultLayout"
import { GlobalProvider } from "./context/GlobalContext"
import BoardGameFavorite from "./pages/BoardGameFavorite"
import AddBoardGame from "./pages/AddBoardGame"
import Homepage from "./pages/Homepage"
import VideoGamesList from "./pages/VideoGamesList"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>

        <Routes>

          <Route element={<DefaultLayout />} >
            <Route index Component={Homepage}></Route>

            <Route path="/boardgames" Component={BoardGamesList} />
            <Route path="/boardgames/:id" Component={BoardGameDetail} />
            <Route path="/boardgames/add" Component={AddBoardGame} />
            <Route path="/boardgames/favorites" Component={BoardGameFavorite} />

            <Route path="/videogames" Component={VideoGamesList} />
            <Route path="/videogames/:id" Component={BoardGameDetail} />
            <Route path="/videogames/add" Component={AddBoardGame} />
            <Route path="/videogames/favorites" Component={BoardGameFavorite} />
          </Route>

        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
