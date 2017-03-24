import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import Menus from '../components/Menus/index';
import TopBar from '../components/TopBar/index';
import AlertMessage from '../components/AlertMessage/index'
import styles from './admin.less';

function Admin(props, {router}) {
  const {dispatch, children, admin, menus} = props;
  const {visible, editPwdVisible, editPwdLoading, openKeys,url} = admin;
  const {menuTree} = menus;
  console.log(props)
  const topBarProps = {
    visible,
    editPwdVisible,
    editPwdLoading,
    visibleChangeFN(visible) {
      dispatch({
        type: 'admin/visibleChange',
        payload: visible
      })
    },
    toUrl(url) {
      dispatch({
        type: 'admin/visibleChange',
        payload: false
      })
      router.push(url)
    },
    onSavePwd(data) {
      dispatch({
        type: 'admin/updatePwd',
        args: data
      })
    },
    onClosePwd() {
      dispatch({
        type: 'admin/editPwdVisibleState',
        data: false
      })
    },
    OpenEditPwd() {
      dispatch({
        type: 'admin/editPwdVisibleState',
        data: true
      })
    }
  }
  const alertMessageProps = {
    onChange(url, dir) {
      dispatch({
        type: 'admin/openKeysState',
        data: dir
      })
      router.push(url)
    }
  }
  const menuProps = {
    router,
    data:menuTree,
    openKeys,
    onOpenkeyChange(dir) {
      dispatch({
        type: 'admin/openKeysState',
        data: dir
      })
    },
  }
  return (
    <div className="clear" className={styles.normal}>
      <div className={styles.left}>
        <Menus {...menuProps} />
      </div>
      <div className={styles.right} >
        <TopBar {...topBarProps} >
          <Breadcrumb {...props} separator="|"  >
          </Breadcrumb>
        </TopBar>
        <div className={styles.page} >
          {children}
        </div>
      </div>
      <AlertMessage {...alertMessageProps} />
    </div>
  );
}
Admin.contextTypes = {
  router: React.PropTypes.object
};
function mapStateToProps({admin, menus}) {
  return { admin, menus }
}
export default connect(mapStateToProps)(Admin);
