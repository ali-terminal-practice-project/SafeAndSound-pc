import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MapComponent from "../../components/map/MapContainer"
import './index.css'

const Weather = () => {
  const [params] = useSearchParams()
  const city = params.get('city')
  const cityNum = params.get('cityNum')
  const [weather, setWeather] = useState({})
  const [lifeNum, setLifeNum] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res1 = await axios(`https://www.yiketianqi.com/free/day?appid=36374132&appsecret=JYU4GOcq&unescape=1&vue=1&cityid=${cityNum}`)
      const res2 = await axios(`https://devapi.qweather.com/v7/indices/1d?location=${cityNum}&key=c84b6b2163c54e858f5358d77327ccc5&type=1,3,4,6,8,9,13,14,15,16`)
      console.log(res2)
      setWeather(res1.data)
      setLifeNum(res2.data.daily)
    }
    getData()
  }, [cityNum])

  return (
    <div>
      <div className="title-box">
        {city}的天气状况
      </div>
      <div className="weather-content">
        <div>
          截止最后更新时间：{weather.update_time}，{city}的天气状况为：
        </div>
        <div className="weather-type">
          天气：{weather.wea}
        </div>
        <div className="weather-type">
          <div>
            实时温度：{weather.tem}
          </div>
          <div>
            白天温度：{weather.tem_day}
          </div>
          <div>
            晚上温度：{weather.tem_night}
          </div>
        </div>
        <div className="weather-type">
          <div>
            风向：{weather.win}
          </div>
          <div>
            风速：{weather.win_meter}
          </div>
          <div>
            风强: {weather.win_speed}
          </div>
        </div>
        <div className="weather-type">
          <div>
            空气质量：{weather.air}
          </div>
          <div>
            湿度：{weather.humidity}
          </div>
          <div>
            气压：{weather.pressure}
          </div>
        </div>
      </div>

      <div className="title-box">
        出行指数
      </div>
      {lifeNum.map((item) => {
        return (
          <div className="weather-type">
            <div>
              {item.name}
            </div>
            <div>
              {item.text}
            </div>
          </div>
        )
      })}
      <MapComponent className='map' focus={city} />
    </div>
  )
}

export default Weather