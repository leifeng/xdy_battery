import React from 'react';
import { Modal } from 'antd';
const ListPopUp = (props) => {
  const { children, visible,  handleCancel } = props;
  return <Modal
    width={800}
    title="详情"
    visible={visible}
    onCancel={handleCancel}
    footer={null}
  >
    {children}
  </Modal>
}
export default ListPopUp;
