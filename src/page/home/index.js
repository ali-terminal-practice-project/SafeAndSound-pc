import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cascader } from "antd";
import Header from "../../components/header";
import "./index.css";
import cityNumList from "./city-num.json";

const contentStyle = {
  height: "200px",
  color: "#fff",
  lineHeight: "200px",
  textAlign: "center",
  background: "#cfcfcf",
};

const Home = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [cityNum, setCityNum] = useState(0);
  const [detail, setDetail] = useState("");

  const goToQuery = () => {
    if (city) {
      navigate(`/query?city=${city}&cityNum=${cityNum}&detail=${detail}`);
    }
  };

  const keyHandler = (e) => {
    if (e.keyCode === 13 && city) {
      navigate(`/query?city=${city}&cityNum=${cityNum}&detail=${detail}`);
    }
  };

  const options = cityNumList.data;
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setCity(value[0]);
    setDetail(value[1]);
    setCityNum(selectedOptions[1].city_id);
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.city.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <>
      <div className="home">
        <Header />
        <div class="Light_text">
          <h2>
            <text className="Tr">Traveling</text> <br />
            <span>
              <text className="Sa">Safe</text> <br />
            </span>
            <text className="And"> And</text>
            <span>
              <text className="So"> Sound</text>
            </span>
          </h2>
        </div>
        <div className="search">
          <div className="wrapper">
            <div className="input-data">
              <Cascader
                showSearch={{
                  filter,
                }}
                size="large"
                className="select-box"
                fieldNames={{
                  label: "city",
                  value: "city",
                  children: "cities",
                }}
                options={options}
                onChange={onChange}
                placeholder="请选择你要去往的城市"
                onKeyUp={keyHandler}
              />
              <div className="underline"></div>
              <div class="searchBox">
                <div class="shadow"></div>
                <button class="searchButton" onClick={goToQuery}>
                  查询
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
