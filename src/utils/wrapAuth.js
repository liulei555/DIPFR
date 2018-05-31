import React, {Component} from 'react';
import {checkPower} from './index'
export const wrapAuth = (ComposedComponent) =>class WrapComponent extends Component {
  // 构造
  constructor(props) {
    super(props);
  }
  render() {
    if (checkPower(this.props.auth,this.props.curpower)) {
      return <ComposedComponent { ...this.props} />;
    } else {
      return <ComposedComponent disabled={true} { ...this.props} />;
    }
  }
};
//export default wrapAuth
