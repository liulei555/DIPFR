/**
 * 功能描述：黑名单库列表
 */
import React from 'react';
import { Table, Row, Col,Icon, Button } from 'antd';
import style from './BalckLibList.less'
const BlackLibList = ({ ...blackLibListProps }) => {

  const { addLib, deleteLib,dataSource, ...tableProps} = blackLibListProps;
  const columns = [{
    title:<Row>
    <h4>车辆黑名单库</h4>
    <Row type={'flex'} justify={'start'}>
      <Button onClick={addLib} className={'button-space button-left'}><Icon type="plus"/>新建</Button>
      <Button onClick={deleteLib} className={'button-space'}><Icon type="delete" style={{color:'red'}}/>删除</Button>
    </Row>
  </Row>,
    dataIndex: 'vehicleBlacklibName',
    width: '100%',
  }];

  return (
    <Table className={style.carBlackLib} columns={columns} dataSource={dataSource} {...blackLibListProps} />
  );
};

// const styles = {
//   table: {
//     backgroundColor: '#fff',
//   },
// };

export default BlackLibList;

