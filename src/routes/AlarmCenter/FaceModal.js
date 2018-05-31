import React from 'react';
import { Modal, Row, Col, Button, Carousel } from 'antd';
import AlarmDetail from './AlarmDetail';
import style from './Modal.less';
import img from '../../../public/images/image_usr.png';

const FaceModal = ({ ...modalProps }) => {

  const footer = [
    <Button key={'btn1'}>人脸与人员轨迹拟合</Button>,
    <Button key={'btn2'}>人脸身份识别</Button>,
    <Button key={'btn3'}>以图搜人</Button>,
    <Button key={'btn4'}>人员轨迹</Button>,
    <Button key={'btn5'}>人员频次</Button>,
    <Button key={'btn6'}>以图搜脸</Button>,
    <Button key={'btn7'}>人脸轨迹</Button>,
    <Button key={'btn8'}>人脸频次</Button>,
    <Button key={'btn9'}>快速布控</Button>,
    <Button key={'btn10'}>图片取证</Button>,
    <Button key={'btn11'}>图像增强</Button>,
  ];

  return (
    <Modal {...modalProps} footer={footer} className={style.alarmModal}>
      <Row gutter={30}>
        <Col span={8}>
          <AlarmDetail/>
        </Col>
        <Col span={16} style={{borderLeft:'1px solid #ccc'}}>
          <Row type={'flex'} justify={'space-around'} className={'face-header'}>
            <Col>
              <img alt="img" src={'http://15.225.1.31:8001/upload/2018/05/15/01/47/38/5025c6c0c8fee_200x200_3.jpg'}/>
            </Col>
            <Col className={'align-center'}>
              <div className={'circle'}>40%</div>
            </Col>
            <Col>
              <img alt="img" src={'http://15.225.1.31:8001/upload/2018/05/15/01/47/38/5025c6c0c8fee_200x200_3.jpg'}/>
            </Col>
            <Col className={'header-info'}>
              <h4>身份信息</h4>
              <h4><span className={'list-label'}>姓名</span>张三</h4>
              <h4><span className={'list-label'}>性别</span>男</h4>
              <h4><span className={'list-label'}>出生日期</span>2002.5.13</h4>
              <h4><span className={'list-label'}>区域</span>陕西省西安市</h4>
              <h4><span className={'list-label'}>证件号</span>610101200205131245</h4>
            </Col>
          </Row>
          <Row className={'face-carousel'}>
            <Carousel>
              <div><img alt={'image'} src={img} /></div>
              <div><img alt={'image'} src={img} /></div>
              <div><img alt={'image'} src={img} /></div>
              <div><img alt={'image'} src={img} /></div>
            </Carousel>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
export default FaceModal;
