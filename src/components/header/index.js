import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const [local, setLocal] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  const success = (pos) => {
    const getDate = async () => {
      const crd = pos.coords
      const la = crd.latitude.toFixed(2)
      const long = crd.longitude.toFixed(2)
      // console.log(la)
      // console.log(long)
      const res = await axios(`https://geoapi.qweather.com/v2/city/lookup?key=c84b6b2163c54e858f5358d77327ccc5&location=${long},${la}&range=cn`)
      setLocal(`${res.data.location[0].adm1}-${res.data.location[0].name}`)
      // console.log(res)
    }
    getDate()
  }

  const error = () => {
    setLocal('获取地理位置失败')
  }

  const clickHandler = () => {
    navigate(`/`)
  }

  return (
    <div className='header'>
      <div className='title' onClick={clickHandler}>Traveling Safe And Sound</div>
      <div className='local-position'>您目前处于：{local}</div>
    </div>
  )
}

export default Header