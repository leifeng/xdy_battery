import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './login.less'
function Login({dispatch, login}) {
  const {errMsg} = login;


  function onSubmit(e) {
    console.log(e.target.remember)
    e.preventDefault();
    dispatch({
      type: 'login/query',
      args: {
        userName: e.target.userName.value,
        password: e.target.password.value,
        rememberMe: e.target.rememberMe.checked,
      }
    })
  }

  return (
    <div className={styles.normal}>
      <div className={styles.dian}></div>
      <div className={styles.logo}></div>
      <div className='login'>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>xxxxx</h2>
          <h3>用户登录</h3>
          <input placeholder="请输入用户名" type="text" name="userName" />
          <input placeholder="请输入密码" type="password" name="password" />
          <div className={styles.remember}><input type="checkbox" id="rememberMe" name="rememberMe"/><label htmlFor="rememberMe">记住密码</label></div>
          <button type="submit" className={styles.btn}>登录</button>
          <div className={styles.errMsg}>{errMsg}</div>
        </form>
        <div className={styles.hua}></div>

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
