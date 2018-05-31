import React from 'react';
import {Input, Table, Row, Col} from 'antd';


const Operatable = ({...tableProps}) => {
  const {onChange, dataSource, columns, rowSelection} = tableProps;
  console.log(tableProps, 'tabprops')
  return (
    <Row>
      <Table className="playList" pagination={{pageSize: 10}}  {...tableProps} />
    </Row>
  )
};

export default Operatable;
