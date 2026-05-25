import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./Login"
import Dashboard from "./DashBoard"
import PageNoteFound from "./NotFound"
import User from "./User"
import Produtos from "./Produtos"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/user/create" element={<User/>}></Route>
           <Route path="/produtos" element={<Produtos/>}></Route>
          <Route path="*" element={<PageNoteFound/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
