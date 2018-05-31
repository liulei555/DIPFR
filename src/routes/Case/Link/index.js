import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import session from '../../../utils/saveStorage/sessionStorage'
import config from '../../../utils/config';
// const {caseUrl} = config

const Index = () => {
  let url = {}
  // if(caseUrl && session.getSession('user')){
  //   url = {src: `${caseUrl}?${session.getSession('user')}&0`}
  //   console.log(url)
  // }
  return (
    <PageHeaderLayout style={{padding: 0,margin: 0}}>
      <iframe {...url} width={'100%'}  height={'800px'}></iframe>
    </PageHeaderLayout>
  );
};

export default Index;
