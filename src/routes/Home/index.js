import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import config from '../../utils/config';

const {api} = config



export default class Action extends Component {
  render() {
    return (
      <PageHeaderLayout>
        <div>
          <Button href={api.downOcx} type="primary" htmlType="button">
            下载客户端
          </Button>
        </div>
      </PageHeaderLayout>
    );
  }
}
