import React, { Component } from 'react';
import { Link } from 'dva/router';
import styles from './login.less'
import imgsrc from '../assets/beijing.png'
function Login() {
  function onSubmit(e) {
    e.preventDefault();

  }
  return (
    <div className={styles.login}>
      <div className={styles.position}>
        <div className={styles.bg}></div>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>用户登录</h2>
          <input placeholder="用户名" type="text" />
          <input placeholder="密码" type="password" />
          <div className={styles.remember}><label><input type="checkbox" />记住密码</label></div>
          <Link to="/admin" className={styles.btn}>登录</Link>

        </form>
      </div>
    </div>
  )
}

export default Login;
