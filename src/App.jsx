import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { GlobalProvider } from "./context/GlobalContext";

import Homepage from "./pages/Homepage";

import BoardGamesList from "./pages/BoardGamesList";
import BoardGameDetail from "./pages/BoardGameDetail";
import BoardGameFavorite from "./pages/BoardGameFavorite";
import AddBoardGame from "./pages/AddBoardGame";

import VideoGamesList from "./pages/VideoGamesList";
import VideoGameDetail from "./pages/VideoGameDetail";
import VideoGameFavorite from "./pages/VideoGameFavorite";
import AddVideoGame from "./pages/AddVideoGame";

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
            <Route path="/videogames/:id" Component={VideoGameDetail} />
            <Route path="/videogames/add" Component={AddVideoGame} />
            <Route path="/videogames/favorites" Component={VideoGameFavorite} />
          </Route>

        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
