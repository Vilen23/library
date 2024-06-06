import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyBookShelf from './pages/MyBookShelf'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/mybookshelf' element={<MyBookShelf/>}/>
      </Routes>
    </>
  )
}

export default App
