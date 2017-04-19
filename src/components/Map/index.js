import React, { Component } from 'react';
import styles from './index.less'
class AMAP extends Component {
  constructor() {
    super();
    this.setPoint = this.setPoint.bind(this);
    this.geocoder_CallBack = this.geocoder_CallBack.bind(this);
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.search}><input type="text" id="tip" /></div>
        <div id="amap" className={styles.map}></div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    const { form, lngField, latField, modalType } = nextProps;
    const lng = form.getFieldValue(lngField);
    const lat = form.getFieldValue(latField);
    this.setPoint(lng, lat)
    this.placeSearch.clear()
  }

  componentDidMount() {
    const { form, lngField, latField, modalType,addressField } = this.props;
    const map = this.map = new AMap.Map('amap', {
      resizeEnable: true,
      zoom: 8
    });
    const geocoder = new AMap.Geocoder();

    const marker = this.marker = new AMap.Marker({});
    const lng = form.getFieldValue(lngField);
    const lat = form.getFieldValue(latField);

    this.setPoint(lng, lat)
    map.on('click', (e) => {
      const newData = {};
      newData[latField] = e.lnglat.getLat();
      newData[lngField] = e.lnglat.getLng()
      form.setFieldsValue(newData)
      marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
      marker.setMap(map);

      geocoder.getAddress([e.lnglat.getLng(), e.lnglat.getLat()], (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.geocoder_CallBack(result);
        }
      });
    });
    var auto = new AMap.Autocomplete({ input: 'tip' });
    var placeSearch=this.placeSearch = new AMap.PlaceSearch({
      map: map
    });
    AMap.event.addListener(placeSearch, 'selectChanged', (e) => {
      const newData = {};
      newData[latField] = e.selected.data.location.lat;
      newData[lngField] =  e.selected.data.location.lng
      newData[addressField] =  e.selected.data.address;
      form.setFieldsValue(newData)
    })
    AMap.event.addListener(auto, "select", (e) => {
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name);
    });

  }
  geocoder_CallBack(data) {
    const { form, addressField } = this.props;
    const address = data.regeocode.formattedAddress;
    const newData = {};
    newData[addressField] = address;
    form.setFieldsValue(newData)
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
