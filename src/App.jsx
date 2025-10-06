import { BrowserRouter, Routes, Route } from "react-router-dom"
import BoardGamesList from "./pages/boardGamesList"
import BoardGameDetail from "./pages/BoardGameDetail"
import DefaultLayout from "./layout/DefaultLayout"
import { GlobalProvider } from "./context/GlobalContext"
import BoardGameFavorite from "./pages/BoardGameFavorite"
import AddBoardGame from "./pages/AddBoardGame"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>

        <Routes>

          <Route element={<DefaultLayout />} >
            <Route index Component={BoardGamesList} />
            <Route path="/boardgames/:id" Component={BoardGameDetail} />
            <Route path="/boardgames/add" Component={AddBoardGame} />
            <Route path="/favorites" Component={BoardGameFavorite} />
          </Route>

        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
