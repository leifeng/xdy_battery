import React from 'react';
import echarts from 'echarts'

class MyChart extends React.Component {
  render() {
    const {width, height} = this.props;
    return <div id="myChart" style={{ width, height }}></div>
  }
  componentWillReceiveProps(nextProps) {
      this.setChartOption()
  }

  componentDidMount() {
    this.myChart = echarts.init(document.getElementById('myChart'));
    this.setChartOption()
  }
  setChartOption() {
    const {title, data} = this.props;
    var option = {
      title: {
        text: title,
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      xAxis: {
        type: 'category',
        name: '时间',
        splitLine: { show: false },
        data: data.map(item => item.monthCode)
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        name: '个'
      },
      series: [
        {
          type: 'bar',
          barWidth:30,
          data: data.map((item) => {
            return item.batsNum
          })
        }
      ]
    };
    this.myChart.setOption(option)
  }
}
MyChart.defaultProps = {
  title: '',
  width: 300,
  height: 300,
  data: []
}
export default MyChart;
