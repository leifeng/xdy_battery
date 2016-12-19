import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './login.less'
import imgsrc from '../assets/beijing.png'
function Login({dispatch, login}) {
  const {errMsg} = login;
  function onSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'login/query',
      args: {
        userName: e.target.userName.value,
        password: e.target.password.value
      }
    })
  }

  return (
    <div className={styles.login}>
      <div className={styles.position}>
        <div className={styles.bg}></div>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>用户登录</h2>
          <input placeholder="用户名" type="text" name="userName" />
          <input placeholder="密码" type="password" name="password" />
          <div className={styles.remember}><label><input type="checkbox" />记住密码</label></div>
          <button type="submit" className={styles.btn}>登录</button>
          <div className={styles.errMsg}>{errMsg}</div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

function mapStateToProps({login}) {
  return { login }
}
export default connect(mapStateToProps)(Login);
