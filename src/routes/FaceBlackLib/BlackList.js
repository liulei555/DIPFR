/**
 * 功能描述：黑名单列表
 * 2018.05.09
 * 作者：xiongmeng
 */
import React from 'react';
import { List, Checkbox, Row, Button, Icon } from 'antd';
import moment from 'moment';
import config from '../../config';

const BlackList = ({ ...blackListProps }) => {

  const { onSelect, onSelectAll, onControl, onDelete, onExport, exportLoading, ...listProps } = blackListProps;

  const renderContent = (item, index) => (
    <List.Item
      extra={<img width="100%" height="100%" alt="img" src={config.imgIp + (item.faceImageAddress && item.faceImageAddress.replace('/home',''))}/>}
    >
      <Checkbox className={'list-check'} checked={item.check} onChange={() => onSelect(index)}/>
      <h4><span className={'list-label'}>姓名</span>{item.personName}</h4>
      <h4><span className={'list-label'}>性别</span>{item.personSex === '0' ? '男' : '女'}</h4>
      <h4><span className={'list-label'}>出生日期</span>{item.birthday ? moment(item.birthday).format('YYYY.M.D') : ''}</h4>
      <h4><span className={'list-label'}>区域</span>{item.province || '' + item.city || ''}</h4>
      <h4><span className={'list-label'}>证件号</span>{item.personCertificateNum}</h4>
    </List.Item>
  );

  return (
    <>
      <Row className={'row-space'} type={'flex'} justify={'end'}>
        <Button className={'button-space-large'} onClick={onSelectAll}>
          <Icon type="select" />全选
        </Button>
        <Button className={'button-space-large'} onClick={onControl}>
          <Icon type="exception" />布控
        </Button>
        <Button className={'button-space-large'} onClick={onDelete}>
          <Icon type="delete" style={{color:'red'}}/>删除
        </Button>
        <Button className={'button-space-large'} loading={exportLoading} onClick={onExport}>
          <Icon type="export" />导出本页
        </Button>
      </Row>
      <List
        itemLayout="vertical"
        className={'black-list'}
        grid={{ gutter: 16, column: 4 }}
        renderItem={renderContent}
        {...listProps}
      />
    </>
  );
};

export default BlackList;

