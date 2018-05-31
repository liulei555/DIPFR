import React from 'react';
import {Button, Card, Row, Input, Tabs, Table, Icon} from 'antd';
import './less/filter.less';

const Filter = ({...filerProps}) => {
  const {up, down, top, bottom} = filerProps
  return (
    <Row>
      <div className="controlBtn">
        <span onClick={up}>
          <Icon type="up"/>
        </span>
        <span onClick={down}>
         <Icon type="down"/>
        </span>
        <span onClick={top}>
          <Icon type="arrow-down"/>
        </span>
        <span onClick={bottom}>
          <Icon type="arrow-down"/>
        </span>
        <span>删除</span>
      </div>
    </Row>
  );
};

export default Filter;
