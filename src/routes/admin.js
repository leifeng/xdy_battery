import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import Menus from '../components/Menus/index';
import TopBar from '../components/TopBar/index'
import styles from './admin.less';
function Admin(props, {router}) {
    const {dispatch, children, admin} = props
    const {visible, url, openKeys} = admin;
    const topBarProps = {
        visible,
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
        }
    }
    return (
        <div className="clear" className={styles.normal}>
            <div className={styles.left}>
                <Menus router={router} url={url} openKeys={openKeys} />
            </div>
            <div className={styles.right}>
                <TopBar {...topBarProps} >
                    <Breadcrumb {...props} separator="|">
                    </Breadcrumb>
                </TopBar>
                <div className={styles.page}>
                    {children}
                </div>
            </div>
        </div>
    );
}
Admin.contextTypes = {
    router: React.PropTypes.object
};
function mapStateToProps({admin}) {
    return { admin }
}
export default connect(mapStateToProps)(Admin);
