import React from 'react';
import { Icon, Popover, Button } from 'antd';
import styles from './index.less';
import Cookies from 'js-cookie';
import { logout } from '../../services/login'
import EditPwd from '../../components/EditPwd';

function TopBar({ visible, visibleChangeFN, editPwdVisible, editPwdLoading, toUrl, onSavePwd, onClosePwd, OpenEditPwd, children }) {

  const userName = Cookies.get('userName')
  const content = (
    <div className={styles.pop}>
      <a onClick={() => OpenEditPwd()}>修改密码</a>
      <a onClick={async () => {
        const r = await logout();
        toUrl('/loginPage')
      }}>退出</a>
    </div>
  )
  const PopoverProps = {
    visible,
    content,
    trigger: 'click',
    placement: "bottomRight",
    overlayClassName: 'Popover',
    onVisibleChange: visibleChangeFN
  }

  const editPwdProps = {
    editPwdLoading,
    editPwdVisible,
    onSavePwd,
    onClosePwd
  }

  return (
    <div className={styles.normal}>
      <div className={styles.breadcrumb}>
        {children}
      </div>
      <Popover {...PopoverProps}>
        <Button type="primary">
          <Icon type="user" />{userName}
        </Button>
      </Popover>
      <EditPwd {...editPwdProps} />

    </div>
  )
}

export default TopBar;
