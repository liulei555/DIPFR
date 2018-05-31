import React from 'react';
import { Menu, Card, Modal, Row, Col, Button, Carousel, Dropdown } from 'antd';
import AlarmDetail from './AlarmDetail';
import CarDetail from './CarDetail';
import style from './Modal.less';
import cloud from '../Video/src/cloud.jpg';
import img from '../../../public/images/image_usr.png';

const CarModal = ({ ...modalProps }) => {

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="http://www.alipay.com/">假套牌分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="http://www.taobao.com/">区域徘徊分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">落脚点分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">多车同行分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">区域碰撞分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">活动范围分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">频繁夜出分析</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#">昼伏夜出分析</a>
      </Menu.Item>
    </Menu>
  );

  const footer = [
    <Button key={'btn1'}>以图搜车</Button>,
    <Button key={'btn2'}>车辆轨迹</Button>,
    <Button key={'btn3'}>人脸身份识别</Button>,
    <Button key={'btn4'}>人脸比对检索</Button>,
    <Button key={'btn5'}>图片取证</Button>,
    <Button key={'btn6'}>图像增强</Button>,
    <Dropdown key={'btn7'} overlay={menu} placement="bottomCenter">
      <Button className='buttonS'>车辆技战法</Button>
    </Dropdown>
  ];

  return (
    <Modal {...modalProps} footer={footer} className={style.alarmModal}>
      <Row gutter={30}>
        <Col span={7}>
          <AlarmDetail/>
        </Col>
        <Col span={12} className={'car-img-box'}>
          <div className="left-img">
            <img src={cloud} alt="文件"/>
            <h4>驾驶员人脸图</h4>
          </div>
          <div className="right-img">
            <img src={cloud} alt="文件"/>
            <h4>副驾驶人脸图</h4>
          </div>
          <Carousel>
            <div><img alt={'image'} src={img}/></div>
            <div><img alt={'image'} src={img}/></div>
            <div><img alt={'image'} src={img}/></div>
            <div><img alt={'image'} src={img}/></div>
          </Carousel>
        </Col>
        <Col span={5}>
          <CarDetail/>
        </Col>
      </Row>
    </Modal>
  );
};
export default CarModal;
