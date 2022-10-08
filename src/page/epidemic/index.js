import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapComponent from "../../components/map/MapContainer";
import { Segmented } from "antd";
import "./index.css";

const Epidemic = () => {
  // =====================变量申明======================
  // 继承父组件传入的city城市名字参数
  const [params] = useSearchParams();
  const city = params.get("city");
  const cityNum = params.get("cityNum");
  // 设置focus
  const [focus, setFocus] = useState("点击地点查看其所在位置");
  // 获取风险地区名单
  const [highList, setHighList] = useState([]);
  const [middleList, setMiddleList] = useState([]);
  const [lowList, setLowList] = useState([]);
  // 设置搜索城市风险地区名单
  const [high, setHigh] = useState([]);
  const [middle, setMiddle] = useState([]);
  const [low, setLow] = useState([]);
  // 设置聚焦地点坐标
  const [position, setPosition] = useState([]);
  // 设置防疫政策
  const [msgIn, setMsgIn] = useState("");
  const [msgOut, setMsgOut] = useState("");
  // 设置flag
  const [flag, setFlag] = useState(1);

  // 请求获取防疫政策
  useEffect(() => {
    const getData = async () => {
      const data = await axios(
        `https://v2.alapi.cn/api/springTravel/query?token=VcrdLKTIjfO93PYw&from=10020&to=${cityNum}`
      );
      console.log(data);
      setMsgIn(data.data.data.to_info.low_in_desc);
      setMsgOut(data.data.data.to_info.out_desc);
    };
    getData();
  }, [focus]);

  // 请求获取所有风险地区名单
  useEffect(() => {
    const getData = async () => {
      const data = await axios(
        `https://raw.githubusercontent.com/panghaibin/RiskLevelAPI/api/latest.json`
      );
      setHighList(data.data.data.highlist);
      setMiddleList(data.data.data.middlelist);
      setLowList(data.data.data.lowlist);
    };
    getData();
  }, []);

  // 获取聚焦城市坐标
  useEffect(() => {
    const getData = async () => {
      const data = await axios(
        `https://restapi.amap.com/v5/place/text?key=8414293ca3dbbca75e08842b93922470&keywords=${focus}`
      );
      setPosition(data.data.pois[0].location.split(","));
    };
    getData();
  }, [focus]);

  // 获取搜索城市的高风险地区
  useEffect(() => {
    highList.forEach((item) => {
      if (
        item.province === city ||
        item.city === city ||
        item.province.substr(0, item.province.length - 1) === city ||
        item.city.substr(0, item.city.length - 1) === city
      ) {
        item.communitys.forEach((str) => {
          setHigh((highList) => [...highList, str]);
        });
      }
    });
  }, [highList]);

  // 获取搜索城市的中风险地区
  useEffect(() => {
    middleList.forEach((item) => {
      if (
        item.province === city ||
        item.city === city ||
        item.province.substr(0, item.province.length - 1) === city ||
        item.city.substr(0, item.city.length - 1) === city
      ) {
        item.communitys.forEach((str) => {
          setMiddle((middleList) => [...middleList, str]);
        });
      }
    });
  }, [middleList]);

  // 获取搜索城市的低风险地区
  useEffect(() => {
    lowList.forEach((item) => {
      if (
        item.province === city ||
        item.city === city ||
        item.province.substr(0, item.province.length - 1) === city ||
        item.city.substr(0, item.city.length - 1) === city
      ) {
        item.communitys.forEach((str) => {
          setLow((lowList) => [...lowList, str]);
        });
      }
    });
  }, [lowList]);

  return (
    <>
      {/* 防疫政策Tips */}
      <div className="cv-tips">
        <div className="cv-tips-title">❗️ 针对各风险地区的出入防疫政策:</div>
        <Segmented
          options={["进入政策", "离开政策"]}
          onChange={() => setFlag(!flag)}
        />
        <div className={flag ? "plc-box" : "hidden-box"}>{msgIn}</div>
        <div className={!flag ? "plc-box" : "hidden-box"}>{msgOut}</div>
      </div>
      {/* 高风险区域 */}
      <div className="level-title">⚠️ 高风险区域</div>
      {high.map((item) => {
        return (
          <div className="place" onClick={(e) => setFocus(e.target.innerText)}>
            {item}
          </div>
        );
      })}
      {/* 中风险区域 */}
      <div className="level-title">⚠️ 中风险区域</div>
      {middle.map((item) => {
        return (
          <div className="place" onClick={(e) => setFocus(e.target.innerText)}>
            {item}
          </div>
        );
      })}
      {/* 低风险区域 */}
      <div className="level-title">⚠️ 低风险区域</div>
      {low.map((item) => {
        return (
          <div className="place" onClick={(e) => setFocus(e.target.innerText)}>
            {item}
          </div>
        );
      })}
      {/* 地图组件 */}
      <MapComponent className="map" position={position} focus={focus} />
    </>
  );
};

export default Epidemic;
