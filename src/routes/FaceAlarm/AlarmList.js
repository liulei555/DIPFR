/**
 * 功能描述：黑名单列表
 * 2018.05.09
 * 作者：xiongmeng
 */
import React from 'react';
import { List, Col, Row, Button, Icon } from 'antd';
import moment from 'moment';

const AlarmList = ({ ...alarmListProps }) => {

  const { onExport, exportLoading, ...listProps } = alarmListProps;

  const renderContent = (item, index) => (
    <div className={'list-item'} onClick={()=>{alert(index)}}>
      <List.Item>
        <Col>
          <img className={'list-img'} alt="img" src={'http://b.hiphotos.baidu.com/image/pic/item/eaf81a4c510fd9f9bebab92f292dd42a2934a4c3.jpg'}/>
          <h4><span className={'list-label'}>摄像头</span>{item.personName}</h4>
          <h4><span className={'list-label'}>抓拍时间</span>{item.personCertificateNum}</h4>
        </Col>
        <Col className={'align-center'}>
          <div className={'circle'}>40%</div>
        </Col>
        <Col>
          <img className={'list-img'} alt="img" src={'http://b.hiphotos.baidu.com/image/pic/item/eaf81a4c510fd9f9bebab92f292dd42a2934a4c3.jpg'}/>
          <h4><span className={'list-label'}>姓名</span>{item.personName}</h4>
          <h4><span className={'list-label'}>证件号</span>{item.personCertificateNum}</h4>
        </Col>
      </List.Item>
    </div>
  );

  return (
    <>
      <Row className={'row-space'} type={'flex'} justify={'end'}>
        <Button className={'button-space-large'} loading={exportLoading} onClick={onExport}>
          <Icon type="export" />导出本页
        </Button>
      </Row>
      <List
        itemLayout="vertical"
        className={'alarm-list'}
        grid={{ column: 3 }}
        renderItem={renderContent}
        {...listProps}
      />
    </>
  );
};

export default AlarmList;

