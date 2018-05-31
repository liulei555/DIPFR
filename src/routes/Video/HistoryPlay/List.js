import { Table, Icon, Row, Col } from 'antd';
import * as styles from './Less/index.less';


const List = ({...listProps}) => {
  const columns = [{
    title: '点位',
    dataIndex: 'location',
  }, {
    title: '录像名称',
    dataIndex: 'name',
  }];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      location: `Edward King ${i}`,
      name: `London, Park Lane no. ${i}`,
    });
  }

  return (<div className={styles.list}>
    <Row>
      <Col span={6} offset={2}>
        <span className={styles.title}>回放列表</span>
      </Col>
      <Col span={5} offset={11}>
        <span className={styles.title}>
          <Icon type="arrow-up"/>
          <Icon type="arrow-down"/>
          <Icon type="close"/>
        </span>
      </Col>
      <Col>
        <Table
          rowSelection={() => {
          }}
          pagination={{ pageSize: 10 }}
          columns={columns}
          dataSource={data}
        />
      </Col>
    </Row>
  </div>);
};

export default List;
