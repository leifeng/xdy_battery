import React from 'react';
import { Modal } from 'antd';
import url from '../../services/api';
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
    const path = this.props.url;
    const { visible } = this.state;
    if (!url) {
      return null
    }
    return (
      <div className={styles.normal}>
        <img src={url + '/upload/image/' + path} onClick={this.openModal} height={30} />
        <Modal
          closable={false}
          visible={visible}
          onCancel={this.onClose}
          width={500}
          footer={null}
        >
          <img src={url + '/upload/image/' + path} onClick={this.openModal} width="100%" />
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
