import React from 'react';
import { Icon, Popover, Button } from 'antd';
import styles from './index.less';
import Cookies from 'js-cookie';
function TopBar({visible, visibleChangeFN, toUrl, children}) {
  const userName = Cookies.get('userName')
  const content = (
    <div className={styles.pop}>
      <a onClick={() => { toUrl('/admin/password') } }>修改密码</a>
      <a onClick={() => { toUrl('/login') } }>退出</a>
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
    </div>
  )
}

export default TopBar;
