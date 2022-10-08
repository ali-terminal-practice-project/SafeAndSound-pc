import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MapComponent from "../../components/map/MapContainer"
import "./index.css"

const Weather = () => {
  // 从父元素接收参数
  const [params] = useSearchParams()
  const city = params.get("city")
  const cityNumW = params.get("cityNumW")

  // 定义天气的各种状态
  const [weather, setWeather] = useState({})
  const [weather2, setWeather2] = useState({})
  const [lifeNum, setLifeNum] = useState([])
  const [local, setLocal] = useState("")

  // 定位当前城市
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  // 如果成功则发送请求获取数据
  const success = (pos) => {
    const getDate = async () => {
      const crd = pos.coords
      const la = crd.latitude.toFixed(2)
      const long = crd.longitude.toFixed(2)
      const res = await axios(
        `https://geoapi.qweather.com/v2/city/lookup?key=c84b6b2163c54e858f5358d77327ccc5&location=${long},${la}&range=cn`
      )
      setLocal(res.data.location[0].name)
    }
    getDate()
  }

  // 获取查询地点的天气、生活指数
  useEffect(() => {
    const getData = async () => {
      const res1 = await axios(
        `https://www.yiketianqi.com/free/day?appid=36374132&appsecret=JYU4GOcq&unescape=1&vue=1&cityid=${cityNumW}`
      )
      const res2 = await axios(
        `https://devapi.qweather.com/v7/indices/1d?location=${cityNumW}&key=c84b6b2163c54e858f5358d77327ccc5&type=1,3,4,6,8,9,13,14,15,16`
      )
      console.log(res2)
      setWeather(res1.data)
      setLifeNum(res2.data.daily)
    }
    getData()
  }, [cityNumW])

  // 查询当前地点的天气
  useEffect(() => {
    const getData = async () => {
      const res1 = await axios(
        `https://www.yiketianqi.com/free/day?appid=36374132&appsecret=JYU4GOcq&unescape=1&vue=1&city=${local}`
      )
      setWeather2(res1.data)
    }
    getData()
  }, [cityNumW])

  return (
    <>
      <div className="title-box-all">
        <svg
          t="1665150298575"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3516"
          width="45"
          height="45"
        >
          <path
            d="M910.3 836.6H173.1c-27.4 0-49.8-22.3-49.8-49.8V289.9c0-27.4 22.3-49.8 49.8-49.8h737.3c27.4 0 49.8 22.3 49.8 49.8v496.8c-0.1 27.5-22.4 49.9-49.9 49.9z"
            fill="#A7B8C6"
            p-id="3517"
          ></path>
          <path
            d="M272.5 201H118.8c-22.8 0-41.3 18.5-41.3 41.3V756c0 22.8 18.5 41.3 41.3 41.3H873c22.8 0 41.3-18.5 41.3-41.3V242.3c0-22.8-18.5-41.3-41.3-41.3H272.5z"
            fill="#7ACAE7"
            p-id="3518"
          ></path>
          <path
            d="M722.1 206.5L568.6 359.9c-2.8 2.8-7.3 2.8-10 0-2.8-2.8-2.8-7.3 0-10L712 196.4c2.8-2.8 7.3-2.8 10 0 2.8 2.8 2.8 7.3 0.1 10.1zM917.4 576.6L754.3 739.7c-2.8 2.8-7.3 2.8-10 0-2.8-2.8-2.8-7.3 0-10l163.1-163.1c2.8-2.8 7.3-2.8 10 0 2.7 2.7 2.7 7.2 0 10zM283.4 383.2c2.8-2.8 7.3-2.8 10 0 2.8 2.8 2.8 7.3 0 10L139.9 546.7c-2.8 2.8-7.3 2.8-10 0-2.8-2.8-2.8-7.3 0-10M320.1 651.6l-149 149c-2.8 2.8-7.3 2.8-10 0-2.8-2.8-2.8-7.3 0-10l149-149c2.8-2.8 7.3-2.8 10 0 2.7 2.7 2.7 7.2 0 10z"
            fill="#FFFFFF"
            p-id="3519"
          ></path>
          <path
            d="M873 811H118.8c-30.3 0-54.9-24.6-54.9-54.9V242.3c0-30.3 24.6-54.9 54.9-54.9H873c30.3 0 54.9 24.6 54.9 54.9V756c-0.1 30.3-24.7 55-54.9 55zM118.8 214.6c-15.3 0-27.7 12.4-27.7 27.7V756c0 15.3 12.4 27.7 27.7 27.7H873c15.3 0 27.7-12.4 27.7-27.7V242.3c0-15.3-12.4-27.7-27.7-27.7H118.8z"
            fill="#3E3A39"
            p-id="3520"
          ></path>
          <path
            d="M499.8 660.2c4.8 4.3 7.2 10 7.2 16.8 0 6.6-2.5 12.7-7.6 18.3-2.8 3-8.2 7.2-16.1 12.5-7.9 5.2-12.7 9.8-14.4 13.7H507v11.2h-54c0-8 2.6-14.8 7.7-20.6 2.8-3.3 8.8-8 17.8-14.2 4.7-3.3 8.3-6.2 10.6-8.7 3.4-3.8 5.1-7.9 5.1-12.3 0-4.2-1.1-7.3-3.4-9.4-2.2-2-5.6-3-10.1-3-4.8 0-8.4 1.6-10.7 4.9-2.4 3-3.7 7.6-3.9 13.8h-12.7c0.1-8.7 2.7-15.7 7.6-21 5.1-5.6 11.9-8.5 20.2-8.5 7.5 0 13.7 2.1 18.6 6.5zM553.7 655.2v77.5H541v-62.2c-4.7 4.3-10.6 7.4-17.7 9.4v-12.6c3.4-0.9 7.1-2.4 11.2-4.6 3.8-2.3 7.1-4.9 9.7-7.6h9.5zM605.7 646.3c2.8 2.6 4.1 5.9 4.1 9.8 0 3.8-1.4 7-4.1 9.8-2.8 2.8-6 4.1-9.8 4.1-3.9 0-7.2-1.4-9.8-4.1-2.8-2.7-4.1-5.9-4.1-9.8 0-4 1.4-7.2 4.1-9.8 2.5-2.7 5.8-4.1 9.8-4.1 3.9 0 7.1 1.3 9.8 4.1z m-15 4.5c-1.4 1.4-2.2 3.1-2.2 5.2 0 2 0.7 3.8 2.2 5.2 1.4 1.4 3.2 2.2 5.2 2.2 1.9 0 3.6-0.7 5.2-2.2 1.4-1.6 2.2-3.3 2.2-5.2 0-2-0.7-3.8-2.2-5.2-1.4-1.4-3.2-2.2-5.2-2.2-2 0.1-3.8 0.8-5.2 2.2z"
            fill="#FFFFFF"
            p-id="3521"
          ></path>
          <path
            d="M342.7 416.4m-113 0a113 113 0 1 0 226 0 113 113 0 1 0-226 0Z"
            fill="#EEE4AA"
            p-id="3522"
          ></path>
          <path
            d="M342.7 416.4m-86.7 0a86.7 86.7 0 1 0 173.4 0 86.7 86.7 0 1 0-173.4 0Z"
            fill="#F2D31F"
            p-id="3523"
          ></path>
          <path
            d="M622 425.1c-4.7 0-8.9-2.7-10.8-6.8-17.5-38.4-57.7-64.2-103.5-60.4-47.1 3.9-86.2 40.1-93.7 86.8-1 6.1-1 14.7-0.8 22.1 0.2 7.8-5 14.7-12.6 16.5-26.2 6.1-45.9 29.8-45.9 57.8 0 32.7 26.7 59.4 59.4 59.4H622c48.4 0 87.7-39.3 87.7-87.7 0-48.4-39.3-87.7-87.7-87.7z"
            fill="#C1E1EF"
            p-id="3524"
          ></path>
          <path
            d="M604.5 444.6c-3.8 0-7.1-2.1-8.7-5.5-14.1-30.9-46.5-51.7-83.4-48.7-37.9 3.2-69.4 32.3-75.5 69.9-0.8 4.9-0.8 11.8-0.6 17.8 0.2 6.3-4 11.8-10.2 13.3-21.1 4.9-37 24-37 46.6 0 26.3 21.5 47.8 47.8 47.8h167.5c39 0 70.6-31.6 70.6-70.6s-31.5-70.6-70.5-70.6z"
            fill="#E5F2F8"
            p-id="3525"
          ></path>
          <path
            d="M592.9 461.2c-2.8 0-5.4-1.6-6.6-4.2-10.7-23.4-35.2-39.1-63-36.8-28.7 2.4-52.5 24.5-57.1 52.9-0.6 3.7-0.6 9-0.5 13.5 0.1 4.7-3.1 8.9-7.7 10-16 3.7-28 18.2-28 35.2 0 19.9 16.3 36.2 36.2 36.2H592.8c29.5 0 53.4-23.9 53.4-53.4 0.1-29.4-23.8-53.4-53.3-53.4z"
            fill="#FFFFFF"
            p-id="3526"
          ></path>
        </svg>
        出发地与目的地的天气
      </div>
      <div className="weather-all">
        <div className="weather-com">
          <div className="title-box">
            <div className="weather-city-title">{local}</div>
            <div className="dis">的天气状况</div>
          </div>
          <div className="weather-content">
            <div className="dis">更新时间：{weather2.update_time}</div>
            <div className="weather-type-title">{weather2.wea}</div>
            <div className="weather-type">
              <div>
                <strong>实时温度：</strong>
                {weather2.tem}
              </div>
              <div>
                <strong>白天温度：</strong>
                {weather2.tem_day}
              </div>
              <div>
                <strong>晚上温度：</strong>
                {weather2.tem_night}
              </div>
            </div>
            <div className="flex">
              <div className="weather-type-litle">
                <div>
                  <strong>风向：</strong>
                  {weather2.win}
                </div>
                <div>
                  <strong>风速：</strong>
                  {weather2.win_meter}
                </div>
                <div>
                  <strong>风强: </strong>
                  {weather2.win_speed}
                </div>
              </div>
              <div className="weather-type-litle">
                <div>
                  <strong>空气质量：</strong>
                  {weather2.air}
                </div>
                <div>
                  <strong>湿度：</strong>
                  {weather2.humidity}
                </div>
                <div>
                  <strong>气压：</strong>
                  {weather2.pressure}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="change-logo">
          <svg
            t="1665149309425"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2117"
            width="64"
            height="64"
          >
            <path
              d="M942.933333 471.466667l-256-256c-17.066667-17.066667-42.666667-17.066667-59.733333 0s-17.066667 42.666667 0 59.733333l183.466667 183.466667H187.733333v-192c0-23.466667-19.2-42.666667-42.666666-42.666667s-42.666667 19.2-42.666667 42.666667v234.666666c0 23.466667 19.2 42.666667 42.666667 42.666667H810.666667l-183.466667 183.466667c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8l256-256c17.066667-14.933333 17.066667-42.666667 0-59.733333z"
              p-id="2118"
              fill="#707070"
            ></path>
          </svg>
        </div>

        <div className="weather-com">
          <div className="title-box">
            <div className="weather-city-title">{city}</div>
            <div className="dis">的天气状况</div>
          </div>
          <div className="weather-content">
            <div className="dis">更新时间：{weather.update_time}</div>
            <div className="weather-type-title">{weather2.wea}</div>
            <div className="weather-type">
              <div>
                <strong>实时温度：</strong>
                {weather.tem}
              </div>
              <div>
                <strong>白天温度：</strong>
                {weather.tem_day}
              </div>
              <div>
                <strong>晚上温度：</strong>
                {weather.tem_night}
              </div>
            </div>
            <div className="flex">
              <div className="weather-type-litle">
                <div>
                  <strong>风向：</strong>
                  {weather.win}
                </div>
                <div>
                  <strong>风速：</strong>
                  {weather.win_meter}
                </div>
                <div>
                  <strong>风强: </strong>
                  {weather.win_speed}
                </div>
              </div>
              <div className="weather-type-litle">
                <div>
                  <strong>空气质量：</strong>
                  {weather.air}
                </div>
                <div>
                  <strong>湿度：</strong>
                  {weather.humidity}
                </div>
                <div>
                  <strong>气压：</strong>
                  {weather.pressure}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="title-box-all">
        <svg
          t="1665150536551"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1874"
          width="45"
          height="45"
        >
          <path
            d="M910.4 843.8H174.6c-27.4 0-49.7-22.3-49.7-49.7V298.2c0-27.4 22.3-49.7 49.7-49.7h735.8c27.4 0 49.7 22.3 49.7 49.7v495.9c0 27.4-22.3 49.7-49.7 49.7z"
            fill="#A7B8C6"
            p-id="1875"
          ></path>
          <path
            d="M272.1 193.8H118.7c-22.8 0-41.2 18.5-41.2 41.2v512.7c0 22.8 18.5 41.2 41.2 41.2h752.7c22.8 0 41.2-18.5 41.2-41.2V235c0-22.8-18.5-41.2-41.2-41.2H272.1z"
            fill="#FFFFFF"
            p-id="1876"
          ></path>
          <path
            d="M871.4 802.5H118.7c-30.2 0-54.8-24.6-54.8-54.8V235c0-30.2 24.6-54.8 54.8-54.8h752.7c30.2 0 54.8 24.6 54.8 54.8v512.7c0 30.3-24.6 54.8-54.8 54.8zM118.7 207.3c-15.3 0-27.7 12.4-27.7 27.7v512.7c0 15.3 12.4 27.7 27.7 27.7h752.7c15.3 0 27.7-12.4 27.7-27.7V235c0-15.3-12.4-27.7-27.7-27.7H118.7z"
            fill="#3E3A39"
            p-id="1877"
          ></path>
          <path
            d="M302.8 246.7H170.5c-19.6 0-35.6 13.6-35.6 30.3v376.5c0 16.7 15.9 30.3 35.6 30.3h649.1c19.6 0 35.6-13.6 35.6-30.3V277c0-16.7-15.9-30.3-35.6-30.3H302.8z"
            fill="#95D4EB"
            p-id="1878"
          ></path>
          <path
            d="M430.8 683.8L230.3 483.3 135 578.6v105.2z"
            fill="#75BFAB"
            p-id="1879"
          ></path>
          <path
            d="M374.4 394.3m-98.8 0a98.8 98.8 0 1 0 197.6 0 98.8 98.8 0 1 0-197.6 0Z"
            fill="#F9F5B1"
            p-id="1880"
          ></path>
          <path
            d="M855.1 630L551.5 326.4 194.3 683.7h660.8z"
            fill="#57B79C"
            p-id="1881"
          ></path>
          <path
            d="M855.1 521.8l-83-83-245 245h328z"
            fill="#75BFAB"
            p-id="1882"
          ></path>
          <path
            d="M709.9 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5zM774.2 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.6 1.5-1.5 1.5zM838.6 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5z"
            fill="#3E3A39"
            p-id="1883"
          ></path>
        </svg>
        出行指数
      </div>
      {lifeNum.map((item) => {
        return (
          <div className="weather-type-live">
            <div className="live-title">
              <svg
                t="1665151001325"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2621"
                width="25"
                height="25"
              >
                <path
                  d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z"
                  p-id="2622"
                  fill="#515151"
                ></path>
                <path
                  d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z"
                  p-id="2623"
                  fill="#515151"
                ></path>
              </svg>
              {item.name}
            </div>
            <div>{item.text}</div>
          </div>
        )
      })}
      <MapComponent className="map" focus={city} />
    </>
  )
}

export default Weather
