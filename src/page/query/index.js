import { useState, useEffect } from "react"
import axios from "axios"
import { useSearchParams, Outlet, Link } from "react-router-dom"
import Header from "../../components/header"
import MapComponent from "../../components/map/MapContainer"
import './index.css'

const Query = () => {
  const [params] = useSearchParams()
  const city = params.get('city')

  const [cityNum, setCityNum] = useState(0)
  const [search, setSearch] = useState('hh')

  useEffect(() => {
    const getData = async () => {
      const res = await axios(`https://geoapi.qweather.com/v2/city/lookup?key=c84b6b2163c54e858f5358d77327ccc5&location=${city}&range=cn`)
      setCityNum(res.data.location[0].id)
    }
    getData()
  })

  return (
    <>
      <Header />
      <div className="all">
        <div className="all-map">
          <div className="left-box">
            <div className="next-place">
              您的下一个目的地为:
              <div className="em-place">
                {city}
              </div>
            </div>
            <div className="item-box">
              <Link to={`/query?city=${city}&cityNum=${cityNum}&setSearch=${setSearch}`} className="query-link">😷 疫情防控</Link>
            </div>
            <div className="item-box">
              <Link to={`/query/weather?city=${city}&cityNum=${cityNum}`} className="query-link">☁️ 出行贴士</Link>
            </div>
            <div className="item-box">
              <Link to={`/query/ticket?city=${city}&cityNum=${cityNum}`} className="query-link">🚗 购票跳转</Link>
            </div>
            <div className="item-box">
              <Link to={`/query/accommodation?city=${city}&cityNum=${cityNum}`} className="query-link">🏠 住宿选择</Link>
            </div>
          </div>
        </div>
        <div className="watch">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Query