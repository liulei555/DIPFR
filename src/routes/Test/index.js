import React, { Component } from 'react';
import {wrapAuth} from "../../utils/wrapAuth";
import {connect} from 'dva'
import { Button,Icon } from 'antd'
const AuthButton = wrapAuth(Button);
class Container extends Component {
  render() {
    console.log(this.props.curPowers);
    return (
        <div>
            <AuthButton auth='Add' curpower={this.props.curPowers} type="primary"><Icon type="plus" />Add</AuthButton>
          <AuthButton auth='Update' curpower={this.props.curPowers} type="primary"><Icon type="user" />Update</AuthButton>
          <AuthButton auth='Delete' curpower={this.props.curPowers} type="primary"><Icon type="del" />Delete</AuthButton>
        </div>
    );
  }
}
export default connect(({ sample}) => ({
  curPowers: sample.curPowers
}))(Container);
