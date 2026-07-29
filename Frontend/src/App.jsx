import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Reservas from './pages/Reservas.jsx'
import './styles/App.css'
import Dashboard from './pages/Dashboard.jsx'
import CanchaDetalle from './pages/CanchaDetalle.jsx'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/cancha/:id" element={<CanchaDetalle />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
export default App
