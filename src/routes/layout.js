import React, { Component } from 'react';
import styles from './layout.less';

function Layout({children}) {
  return (
    <div className={styles.normal}>
        {children}
    </div>
  );
}
export default Layout;
