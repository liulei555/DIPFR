import React from 'react';
import { Modal, Icon } from 'antd';
import { deviceTypeEnum } from '../EnumVideo';

const PointForm = ({ pointDetail, ...modalProps }) => {

  const { deviceStatus, deviceName, deviceNumber, areaName, areaId, manufacturerName, deviceType, devicePicture } = pointDetail;

  const title = deviceStatus === '正常' ? <div className={'point-header'}><Icon type="check-circle-o" /><h4>设备正常</h4></div> : <div className={'point-header error'}><Icon type="close-circle-o" /><h4>设备异常</h4></div>;

  const props = {
    title,
    ...modalProps
  };

  return (
    <Modal { ...props }>
      <table className={'point-info'}>
        <tbody>
        <tr>
          <td>设备名称:</td>
          <td>{deviceName}</td>
        </tr>
        <tr>
          <td>设备编号:</td>
          <td>{deviceNumber}</td>
        </tr>
        <tr>
          <td>所属区域:</td>
          <td>{areaName}</td>
        </tr>
        <tr>
          <td>区域编码:</td>
          <td>{areaId}</td>
        </tr>
        <tr>
          <td>厂商名称:</td>
          <td>{manufacturerName}</td>
        </tr>
        <tr>
          <td>设备类型:</td>
          <td>{deviceTypeEnum[deviceType] || ''}</td>
        </tr>
        <tr>
          <td colSpan="2">
            <img src={devicePicture} className={'device-picture'} />
            <a>详情>></a>
          </td>
        </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default PointForm;
