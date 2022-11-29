import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductId from './pages/ProductId'
import Purchases from './pages/Purchases'
import LoadingScreen from "./components/LoadingScreen"
import { useSelector } from "react-redux"
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)//con esta intruccion traigo el loading de cargar desde el index hasta mi aPP, useSelector. con el doble ampersan, me permite indicar si esta falso o true.

  return (
    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Container className='my-5'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductId/>}/>
        <Route path='/login' element={<Login/>}/>
       
        <Route element={<ProtectedRoutes/>}>
        <Route path='/purchases' element={<Purchases/>}/>
        </Route>
      </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
