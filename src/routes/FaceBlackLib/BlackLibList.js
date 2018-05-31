/**
 * 功能描述：黑名单库列表
 * 2018.05.09
 * 作者：xiongmeng
 */
import React from 'react';
import { Table, Row, Icon, Button } from 'antd';

const BlackLibList = ({ ...blackLibListProps }) => {

  const { addLib, deleteLib, ...tableProps} = blackLibListProps;

  const columns = [{
    title: <Row>
      <h4>人脸黑名单库</h4>
      <Row type={'flex'} justify={'start'}>
        <Button onClick={addLib} className={'button-space button-left'}><Icon type="plus"/>新建</Button>
        <Button onClick={deleteLib} className={'button-space'}><Icon type="delete" style={{color:'red'}}/>删除</Button>
      </Row>
    </Row>,
    dataIndex: 'PERSON_BLACKLIB_NAME',
    width: '100%',
  }];

  return (
    <Table style={styles.table} columns={columns}  {...tableProps} />
  );
};

const styles = {
  table: {
    backgroundColor: '#fff',
  },
};

export default BlackLibList;

