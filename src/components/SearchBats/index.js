import React from 'react';
import { AutoComplete, Modal, Button } from 'antd';
import styles from './index.less'
const column = {
  batKind: '电池包种类',
  batNum: '所含类型数量',
  batType: '所含类型',
  batsCode: "电池包编号",
  batsModel: '电池包型号',
  batsSpecCode: '包规格代码',
  capacity: '额定容量',
  catType: '主要配套车型',
  cycleNum: '循环次数',
  materielId: "物料编码",
  produceAddress: '生产地址',
  produceTime: '生产时间',
  quality: '质量',
  supplier: "供应商名称",
  supplierPhone: '供应商电话',
  sysCode: '系统编号',
  totalModel: "总成型号",
  voltage: '标称电压',
}
export default class SearchBats extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      item: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this)
    this.t = -1;
  }
  render() {
    const { dataSource } = this.props;
    const data = dataSource.map((item) => { return item.batsCode })
    return (
      <div>
        <AutoComplete
          allowClear={true}
          dataSource={data}
          style={{ width: 500 }}
          onChange={this.handleChange}
          onSelect={this.onSelect}
          placeholder="输入电池包编号"
        />
        <Modal
          visible={this.state.visible}
          title="电池包详情"
          onCancel={this.onClose}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.onClose}>
              关闭
            </Button>,
          ]}
        >
          {Object.keys(this.state.item).map((item, index) => {
            return column[item] ? <div className={styles.item} key={index}><label>{column[item]}：</label>{this.state.item[item]?this.state.item[item]:'无'}</div> : null
          })}
        </Modal>
      </div>
    );
  }
  onClose() {
    this.setState({ visible: false })
  }
  onSelect(value, option) {
    const { dataSource } = this.props;
    this.setState({ visible: true, item: dataSource[option.props.index] })
  }
  handleChange(value) {
    const {getData} = this.props;
    clearTimeout(this.t);
    this.t = setTimeout(() => {
      value && getData(value)
    }, 1000)
  }
}
SearchBats.defaultProps = {
  getData: () => { }
}
