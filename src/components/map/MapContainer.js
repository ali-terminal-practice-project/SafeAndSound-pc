import React, { Component } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import './MapContainer.css'

class MapComponent extends Component {
  // 构造器
  constructor(props) {
    super()
    this.map = {}
    this.pos = props.position
  }

  // 组件挂载后
  componentDidMount () {
    AMapLoader.load({
      key: "787a6c32c50917e406defe2a97d61504",
      version: "2.0",
      plugins: []
    }).then((AMap) => {
      // 初始化地图
      this.map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 4,
        center: [119.74929875, 35.69405665],
      })
    }).catch(e => {
      console.log(e)
    })
  }

  // 组件更新时
  componentDidUpdate () {
    // 如果map存在
    if (this.map.setCenter && this.pos) {
      this.map.setCenter(this.props.position)
      this.map.setZoom(15)
    }
  }

  render () {
    return (
      <div className='map-all'>
        <div className='map-title'>{this.props.focus}</div>
        <div id="container" className="map" style={{ height: '48vh' }} >
        </div>
      </div>
    )
  }
}

export default MapComponent