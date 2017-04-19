import React from 'react';
import { Tree, Modal } from 'antd';
const TreeNode = Tree.TreeNode;

function AuthModal({ visible, data, onOk, onCancel, onChangekeys, checkedKeys, roleName }) {
  function onCheck(info, e) {
    onChangekeys(info, info.concat(e.halfCheckedKeys))
    // onChangekeys((info + '').split(','), (info + (e.halfCheckedKeys.length > 0 ? ',' + e.halfCheckedKeys : [])).split(','))
  }

  const ModalProps = {
    title: roleName + '【权限分配】',
    visible,
    onOk,
    onCancel
  }

  const TreeProps = {
    showLine: true,
    checkable: true,
    checkedKeys: checkedKeys.map((item) => { return item + '' }),
    onCheck,
  }
  return <Modal {...ModalProps}>
    <Tree {...TreeProps}  >
      {data.map((item, index) => {
        return <TreeNode title={item.label} key={item.id}>
          {item.children && item.children.map((v, i) => {
            return <TreeNode title={v.label} key={v.id} >
              {v.children && v.children.map((vv, ii) => {
                return <TreeNode title={vv.label} key={vv.id} />
              })}
            </TreeNode>
          })}
        </TreeNode>
      })}
    </Tree>
  </Modal>
}
AuthModal.defaultProps = {
  data: [],
  checkedKeys: [],
  roleName: ''
}
export default AuthModal;
