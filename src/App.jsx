import { BrowserRouter, Routes, Route } from "react-router-dom"
import BoardGamesList from "./pages/boardGamesList"
import BoardGameDetail from "./pages/BoardGameDetail"
import DefaultLayout from "./layout/DefaultLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />} >
          <Route index Component={BoardGamesList} />
          <Route path="/boardgames/:id" Component={BoardGameDetail} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
