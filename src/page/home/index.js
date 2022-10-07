import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cascader } from 'antd'
import Header from '../../components/header'
import './index.css'
import cityNumList from './city-num.json'

const Home = () => {
  const navigate = useNavigate()

  const [city, setCity] = useState('')
  const [cityNum, setCityNum] = useState(0)
  const [detail, setDetail] = useState('')

  const goToQuery = () => {
    navigate(`/query?city=${city}&cityNum=${cityNum}&detail=${detail}`)
  }

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      navigate(`/query?city=${city}&cityNum=${cityNum}&detail=${detail}`)
    }
  }

  const options = cityNumList.data
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
    setCity(value[0])
    setDetail(value[1])
    setCityNum(selectedOptions[1].city_id)
  }

  return (
    <>
      <div className='home'>
        <Header />
        <div className="search">
          <div className="tips"></div>
          <div className="wrapper">
            <div className="input-data">
              <Cascader
                size='large'
                className='select-box'
                fieldNames={{ label: 'city', value: 'city', children: 'cities' }}
                options={options}
                onChange={onChange}
                placeholder="请选择你要去往的城市吧"
                onSearch={(value) => console.log(value)}
                onKeyUp={keyHandler}
              />
              <div className="underline"></div>
              <button className="btn-search" onClick={goToQuery}>查询</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home