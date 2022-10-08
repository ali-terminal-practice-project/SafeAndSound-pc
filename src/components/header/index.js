import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const [local, setLocal] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const success = (pos) => {
    const getDate = async () => {
      const crd = pos.coords;
      const la = crd.latitude.toFixed(2);
      const long = crd.longitude.toFixed(2);
      // console.log(la)
      // console.log(long)
      const res = await axios(
        `https://geoapi.qweather.com/v2/city/lookup?key=c84b6b2163c54e858f5358d77327ccc5&location=${long},${la}&range=cn`
      );
      setLocal(`${res.data.location[0].adm1}-${res.data.location[0].name}`);
      // console.log(res)
    };
    getDate();
  };

  const error = () => {
    setLocal("获取地理位置失败");
  };

  const clickHandler = () => {
    navigate(`/`);
  };

  return (
    <div className="header">
      <div className="title" onClick={clickHandler}>
        <svg
          t="1665157471883"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1156"
          width="30"
          height="30"
        >
          <path
            d="M314.1 881.7c30.7 0 55.6-24.9 55.6-55.6H258.6c0 30.7 24.9 55.6 55.5 55.6zM758.7 881.7c30.7 0 55.5-24.9 55.5-55.6H703.1c0 14.7 5.9 28.9 16.3 39.3 10.5 10.5 24.6 16.3 39.3 16.3z"
            fill="#A7B8C6"
            p-id="1157"
          ></path>
          <path
            d="M910.8 834.5H175c-27.4 0-49.7-22.3-49.7-49.7V289c0-27.4 22.3-49.7 49.7-49.7h735.8c27.4 0 49.7 22.3 49.7 49.7v495.8c0 27.4-22.3 49.7-49.7 49.7z"
            fill="#A7B8C6"
            p-id="1158"
          ></path>
          <path
            d="M275 830.6c30.7 0 55.6-24.9 55.6-55.6H219.5c0 30.7 24.8 55.6 55.5 55.6zM719.6 830.6c30.7 0 55.5-24.9 55.5-55.6H664c0 14.7 5.9 28.9 16.3 39.3 10.4 10.4 24.6 16.3 39.3 16.3z"
            fill="#1A1A1A"
            p-id="1159"
          ></path>
          <path
            d="M386.2 163.7v-41.9h222.2v41.9H664v-41.9c0-14.7-5.9-28.9-16.3-39.3-10.4-10.4-24.6-16.3-39.3-16.3H386.2c-14.7 0-28.9 5.9-39.3 16.3-10.4 10.4-16.3 24.6-16.3 39.3v41.9h55.6zM830.2 163.7v-21.1c0-5.9-2.4-11.6-6.6-15.7-4.2-4.2-9.8-6.5-15.7-6.5h-66.7c-12.2 0-22.2 9.9-22.2 22.2v21.1h111.2zM275.6 163.7v-21.1c0-12.3-10-22.2-22.2-22.2h-66.7c-12.2 0-22.2 9.9-22.2 22.2v21.1h111.1z"
            fill="#353334"
            p-id="1160"
          ></path>
          <path
            d="M871 183.7H118.3c-15.3 0-27.7 12.4-27.7 27.7v512.7c0 15.3 12.4 27.7 27.7 27.7H871c15.3 0 27.7-12.4 27.7-27.7V211.4c0-15.3-12.5-27.7-27.7-27.7z"
            fill="#FFFFFF"
            p-id="1161"
          ></path>
          <path
            d="M118.3 183.7c-15.3 0-27.7 12.4-27.7 27.7v512.7c0 15.3 12.4 27.7 27.7 27.7h104.9V183.7H118.3z"
            fill="#EB792F"
            p-id="1162"
          ></path>
          <path
            d="M310.5 183.7h358.2v568.1H310.5z"
            fill="#F4BE4B"
            p-id="1163"
          ></path>
          <path
            d="M871 183.7H756v568.1h115c15.3 0 27.7-12.4 27.7-27.7V211.4c0-15.3-12.5-27.7-27.7-27.7z"
            fill="#EB792F"
            p-id="1164"
          ></path>
          <path
            d="M223.2 183.7h87.3v568.1h-87.3zM668.7 183.7H756v568.1h-87.3z"
            fill="#FFFFFF"
            p-id="1165"
          ></path>
          <path
            d="M871 156.6H118.3c-30.2 0-54.8 24.6-54.8 54.8v512.7c0 30.2 24.6 54.8 54.8 54.8H871c30.2 0 54.8-24.6 54.8-54.8V211.4c0-30.2-24.6-54.8-54.8-54.8z m27.7 567.5c0 15.3-12.4 27.7-27.7 27.7H118.3c-15.3 0-27.7-12.4-27.7-27.7V211.4c0-15.3 12.4-27.7 27.7-27.7H871c15.3 0 27.7 12.4 27.7 27.7v512.7z"
            fill="#1A1A1A"
            p-id="1166"
          ></path>
        </svg>
        Traveling Safe And Sound
      </div>
      <div className="local-position">您目前处于：{local}</div>
    </div>
  );
};

export default Header;
