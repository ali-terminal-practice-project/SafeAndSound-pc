import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MapComponent from "../../components/map/MapContainer"
import './index.css'
import cityNumList from './city-num.json'

const Epidemic = () => {
  // =====================变量申明======================
  // 继承父组件传入的city城市名字参数
  const [params] = useSearchParams()
  const city = params.get('city')
  // 设置focus
  const [focus, setFocus] = useState('点击地点查看其所在位置')
  // 获取风险地区名单
  const [highList, setHighList] = useState([])
  const [middleList, setMiddleList] = useState([])
  const [lowList, setLowList] = useState([])
  // 设置搜索城市风险地区名单
  const [high, setHigh] = useState([])
  const [middle, setMiddle] = useState([])
  const [low, setLow] = useState([])
  // 设置聚焦地点坐标
  const [position, setPosition] = useState([])
  // 设置城市代码
  const [cityNum, setCityNum] = useState([])

  // 请求获取所有风险地区名单
  useEffect(() => {
    const getData = async () => {
      const data = await axios(`https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json`)
      setHighList(data.data.data.highlist)
      setMiddleList(data.data.data.middlelist)
      setLowList(data.data.data.lowlist)
    }
    getData()
  }, [])

  // 获取聚焦城市坐标
  useEffect(() => {
    const getData = async () => {
      const data = await axios(`https://restapi.amap.com/v5/place/text?key=8414293ca3dbbca75e08842b93922470&keywords=${focus}`)
      setPosition(data.data.pois[0].location.split(','))
    }
    getData()
  }, [focus])

  // 获取搜索城市的高风险地区
  useEffect(() => {
    highList.forEach((item) => {
      if (item.province === city || item.city === city) {
        item.communitys.forEach((str) => {
          setHigh(highList => ([...highList, str]))
        })
      }
    })
  }, [highList])

  // 获取搜索城市的中风险地区
  useEffect(() => {
    middleList.forEach((item) => {
      if (item.province === city || item.city === city) {
        item.communitys.forEach((str) => {
          setMiddle(middleList => ([...middleList, str]))
        })
      }
    })
  }, [middleList])

  // 获取搜索城市的低风险地区
  useEffect(() => {
    lowList.forEach((item) => {
      if (item.province === city || item.city === city) {
        item.communitys.forEach((str) => {
          setLow(lowList => ([...lowList, str]))
        })
      }
    })
  }, [lowList])

  return (
    <>
      {/* 防疫政策Tips */}
      <div className="cv-tips">
        <div className="cv-tips-title">
          ❗️针对各风险地区的出入防疫政策:
        </div>
        <div className="cv-tip">
          （1）对7天内有高风险区旅居史的入长返长人员，赋红码，实施7天集中隔离医学观察措施，在第1、2、3、5、7天各开展一次核酸检测。
        </div>
        <div className="cv-tip">
          （2）对7天内有中风险区旅居史的入长返长人员，赋黄码，实施7天居家隔离医学观察措施，在第1、4、7天各开展一次核酸检测。
        </div>
        <div className="cv-tip">
          （3）对7天内有低风险区旅居史的入长返长人员，经研判，可参照中风险区旅居史人员防控要求采取相应措施。
        </div>
        <div className="cv-tip">
          （4）对7天内有重点涉疫地区旅居史的入长返长人员，参照中风险区旅居史人员防控要求采取相应措施（其中高、中风险区的执行我市既定的高、中风险区人员分类管控措施）。
        </div>
        <div className="cv-tip">
          （5）对入境人员，严格实施“7天集中隔离医学观察+3天居家健康监测”管控措施。集中隔离医学观察的第1、2、3、5、7天各开展一次核酸检测，解除集中隔离后，落实点对点闭环管理，实施居家健康监测，并于居家健康监测的第3天开展一次核酸检测。
        </div>
      </div>
      {/* 高风险区域 */}
      <div className='level-title'>高风险区域</div>
      {high.map((item) => {
        return (<div className='place' onClick={(e) => setFocus(e.target.innerText)}>
          {item}
        </div>)
      })}
      {/* 中风险区域 */}
      <div className='level-title'>中风险区域</div>
      {middle.map((item) => {
        return (<div className='place' onClick={(e) => setFocus(e.target.innerText)}>
          {item}
        </div>)
      })}
      {/* 低风险区域 */}
      <div className='level-title'>低风险区域</div>
      {low.map((item) => {
        return (<div className='place' onClick={(e) => setFocus(e.target.innerText)}>
          {item}
        </div>)
      })}
      {/* 地图组件 */}
      <MapComponent className='map' position={position} focus={focus} />
    </>
  )
}

export default Epidemic