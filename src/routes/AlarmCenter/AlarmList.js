/**
 * 功能描述：告警list
 * 2018.05.15
 * 作者：xiongmeng
 */
import React from 'react';
import { List, Card, Button, Icon } from 'antd';
import config from '../../config';
import moment from 'moment';

const AlarmList = ({ ...alarmListProps }) => {

  const { onClick, total, ...listProps} = alarmListProps;

  const renderFace = (item) => (
    <div className={'list-item-face'}>
      <div className={'img-box'}>
        <div className={'bottom-text'}>
          <span className={'header-face'}>
            <Icon type="warning" className={'icon-warn'}/>
            {item.alarmType}
          </span>
        </div>
        <img className={'list-img'} alt="img" src={item.imagePath && (config.imgIp + item.imagePath[0].replace('/home',''))}/>
        <div className={'bottom-text'}>
          <h4>{item.deviceName}</h4>
          <h4>{item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : ''}</h4>
        </div>
      </div>
      <div className={'outer-circle'}>
        <div className={'circle'}>{item.similarity}</div>
      </div>
      <div className={'img-box'}>
        <div className={'bottom-text'}>
          <span className={'is-read'}>{item.isRead ? '已读' : '未读'}</span>
        </div>
        <img className={'list-img'} alt="img" src={item.imagePath && (config.imgIp + item.imagePath[1].replace('/home',''))}/>
        <div className={'bottom-text'}>
          <h4>{item.name}</h4>
          <h4>{item.IdentificationNumber}</h4>
        </div>
      </div>
    </div>
  );

  const renderAction = (item) => (
    <div className={'list-item-action'}>
      <div className={'header-action'}>
        <div className={'bottom-text'}>
          <span className={`header-face${item.alarmType === '手机串号告警' ? ' yellow' : item.alarmType === '异常行为告警' ? ' blue' :''}`}>
            <Icon type="warning" className={'icon-warn'}/>
            {item.alarmType}
          </span>
        </div>
        <div className={'bottom-text'}>
          <span className={'is-read'}>{item.isRead ? '已读' : '未读'}</span>
        </div>
      </div>
      <img className={'list-img-action'} alt="img" src={item.imagePath && (config.imgIp + item.imagePath[0].replace('/home',''))}/>
      <div className={'bottom-text'}>
        <h4>{item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : ''}</h4>
        <h4>{item.deviceName}</h4>
      </div>
    </div>
  );

  const renderContent = (item) => (
    <div className={'list-item'} onClick={()=>{onClick(item)}}>
      {item.alarmType === '人脸告警' ? renderFace(item) : renderAction(item)}
    </div>
  );

  const cardTitle = <>
    <span className={'list-title'}>实时告警</span>
    <span className={'list-desc'}>今日共：
      <span style={{ color: '#f00' }}>{total}</span>
      条
    </span>
  </>;

  return (
    <Card title={cardTitle} className={'alarm-list-box'} bordered={'false'}>
      <List
        itemLayout="vertical"
        className={'alarm-list'}
        renderItem={renderContent}
        {...listProps}
      />
    </Card>
  );
};

export default AlarmList;

