import React from 'react';
import {Button, Message, Row, Input, Tabs, Table, Icon} from 'antd';
import './less/filter.less';

const CustomSortFilter = ({...filerProps}) => {
  const {selectedRowKeys, dataSource, dispatch} = filerProps;
  const changeIndex = (data, index, order) => {
    let target = data.splice(index, 1)[0];
    data.splice(order, 0, target);
    dispatch({
      type: 'video/updateState',
      payload: {
        dataSource: data,
        selectedRowKeys: [order]
      }
    })
  };
  const up = () => {
    let index = parseInt(selectedRowKeys[0]), order = index - 1;
    let newData = [...dataSource];
    if (order < 0 || order > dataSource.length - 1) {
      order = dataSource.length - 1;
    }
    changeIndex(newData, index, order)
  }
  const down = () => {
    let index = parseInt(selectedRowKeys[0]), order = index + 1;
    let newData = [...dataSource]
    if (order < 0 || order > dataSource.length - 1) {
      order = dataSource.length - 1;
    }
    changeIndex(newData, index, order)

  }
  const top = () => {
    let index = parseInt(selectedRowKeys[0]), order = 0;
    let newData = [...dataSource]
    if (index === order) {
      return Message.info('已经到顶!')
    }
    changeIndex(newData, index, order)
  }
  const bottom = () => {
    let index = parseInt(selectedRowKeys[0]), order = dataSource.length - 1;
    let newData = [...dataSource]
    if (index === order) {
      return Message.info('已经到底!')
    }
    changeIndex(newData, index, order)
  }
  const deleteItem = () => {
    let data = [...dataSource], order = parseInt(selectedRowKeys[0]);
    data.splice(order, 1);
    dispatch({
      type: 'video/updateState',
      payload: {
        dataSource: data,
        selectedRowKeys: []
      }
    })
  }
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
          <Icon type="caret-up"/>
        </span>
        <span onClick={bottom}>
          <Icon type="caret-down"/>
        </span>
        <span onClick={deleteItem}>
          <Icon type="close"/>
        </span>
      </div>
    </Row>
  );
};

export default CustomSortFilter;
