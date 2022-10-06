import Home from './page/home/index'
import Query from './page/query/index'
import Weather from './page/weather'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Epidemic from './page/epidemic'
import Ticket from './page/ticket'
import Accommodation from './page/accommodation'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/query' element={<Query />}>
            <Route path='/query/weather' element={<Weather />}></Route>
            <Route path='/query' element={<Epidemic />}></Route>
            <Route path='/query/ticket' element={<Ticket />}></Route>
            <Route path='/query/accommodation' element={<Accommodation />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
