import React from 'react';
import { Modal } from 'antd';
import styles from './index.less'
export default class CustomImage extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  render() {
    const {url} = this.props;
    const {visible} = this.state;
    if (!url) {
      return null
    }
    return (
      <div className={styles.normal}>
        <img src={'http://10.10.11.190/upload/image/' + url} onClick={this.openModal}  height={30} />
        <Modal
          closable={false}
          visible={visible}
          onCancel={this.onClose}
          width={500}
          footer={null}
        >
          <img src={'http://10.10.11.190/upload/image/' + url} onClick={this.openModal} width="100%" />
        </Modal>
      </div>
    )
  }
  openModal() {
    this.setState({
      visible: true
    })
  }
  onClose() {
    this.setState({
      visible: false
    })
  }
}
