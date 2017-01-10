import React, { Component } from 'react';
import styles from './index.less'
class AMAP extends Component {
  constructor() {
    super();
    this.setPoint = this.setPoint.bind(this);
  }
  render() {
    return <div id="amap" className={styles.map}></div>
  }
  componentWillReceiveProps(nextProps) {
    const {form, lngField, latField, modalType} = nextProps;
    const lng = form.getFieldValue(lngField);
    const lat = form.getFieldValue(latField);
    this.setPoint(lng, lat)
  }

  componentDidMount() {
    const {form, lngField, latField, modalType} = this.props;
    const map = this.map = new AMap.Map('amap', {
      resizeEnable: true,
      zoom: 8
    });
    const marker = this.marker = new AMap.Marker({});
    const lng = form.getFieldValue(lngField);
    const lat = form.getFieldValue(latField);

    this.setPoint(lng, lat)
    map.on('click', function (e) {
      const newData = {};
      newData[latField] = e.lnglat.getLat();
      newData[lngField] = e.lnglat.getLng()
      form.setFieldsValue(newData)
      marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
      marker.setMap(map);
    });
  }
  setPoint(lng, lat) {

    if (lng == '' || lat == '') {
      this.map.setZoomAndCenter(8, [116.397428, 39.90923]);
      this.marker.setPosition([116.397428, 39.90923]);
    } else {
      this.map.setCenter([lng, lat])
      this.marker.setPosition([lng, lat]);
    }
    this.marker.setMap(this.map);

  }
  componentWillUnmount() {
    this.map.destroy()
  }

}
AMAP.defaultProps = {
  lng: '',
  lat: '',
  latField: '',
  lngField: ''
}
export default AMAP;
