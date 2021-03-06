import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon,Radio } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const RadioGroup = Radio.Group;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    displayWay:0
  };


  handleSubmit = (err, values) => {
    const type = {
      callbackparam: "",
      rememberMe: false,
      type: "",
      ...this.state
    };
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          ...type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };
  displayChange=(e)=>{
    this.setState({
      displayWay: e.target.value,
    });
  };
  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
            {login.status === 'error' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="username" placeholder="用户名" />
            <Password name="password" placeholder="密码" />
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.rememberMe}>
              自动登录
            </Checkbox>
            <RadioGroup onChange={this.displayChange} value={this.state.displayWay}>
              <Radio value={0}>单屏显示</Radio>
              <Radio value={1}>双屏显示</Radio>
            </RadioGroup>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
