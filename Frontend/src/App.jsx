import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import './styles/App.css'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservas" element={<>reservas</>} />
        <Route path="/cancha/:id" element={<>cancha</>} />
        <Route path="/dashboard/" element={<>dashboard</>} />
      </Route>
    </Routes>
  )
}
export default App
