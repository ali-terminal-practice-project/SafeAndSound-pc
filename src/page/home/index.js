import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header'
import './index.css'

const Home = () => {
  const navigate = useNavigate()

  const [city, setCity] = useState('')

  const goToQuery = () => {
    navigate(`/query?city=${city}`)
  }

  const changeHandler = (e) => {
    setCity(e.target.value)
  }

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      navigate(`/query?city=${city}`)
    }
  }

  return (
    <>
      <div className='home'>
        <Header />
        <div className="search">
          <div className="tips"></div>
          <div className="wrapper">
            <div className="input-data">
              <input type="text"
                className="city-name-search"
                required
                value={city}
                onKeyUp={keyHandler}
                onChange={changeHandler} />
              <div className="underline"></div>
              <label>输入想要查询的城市吧</label>
              <button className="btn-search" onClick={goToQuery}>查询</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home