import React from 'react';
import PropTypes from 'prop-types';
import { Menu,Card,Modal,Select,DatePicker,Row,Col,Input,Radio,Button,Carousel,Dropdown} from 'antd';
import ModalLeft from "./ModaLeft";
import ModalRight from "./ModalRight";
import './Modal.less'
import cloud from '../Video/src/cloud.jpg'
import img from '../../../public/images/image_usr.png'
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input;
const modal = ({...modalProps}) => {
  console.log(modalProps)
 /* function onChange(a, b, c) {
    console.log(a, b, c);
  }*/
 const {item,itemVehicle}=modalProps
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="http://www.alipay.com/">假套牌分析</a>
      </Menu.Item>
      <Menu.Item>
        <a  href="http://www.taobao.com/">区域徘徊分析</a>
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
  return (
    <Modal {...modalProps} footer={null} width='80%'  className={`vechicleAlarm`}>
      <div style={{ padding: '0px' }}>
        <Row gutter={0}>
          <Col span={8}>
            <Card bordered={false} bodyStyle={{padding:'0'}}>
              {item && <ModalLeft item={item}></ModalLeft>}
            </Card>
          </Col>
          <Col span={11}>
            <Card bordered={false} bodyStyle={{padding:'0px 3px'}} className='vehicleAlarm'>
              <div style={{width:'100%',height:'100%',position:'relative'}}>
                <div className="leftImg">
                  <img src={cloud} alt="文件"/>
                </div>
                <div className="rightImg">
                  <img src={cloud} alt="文件"/>
                </div>
                <Carousel>
                  <div> <img alt={'image'} src={img} style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src={img} style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src={img} style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src={img} style={{width:'100%',height:'642px'}}/></div>
                </Carousel>
              </div>
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={false} bodyStyle={{padding:'0'}}>
              {itemVehicle &&  <ModalRight item={itemVehicle}></ModalRight>}
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ paddingTop: '10px',textAlign:'right'}}>
        <Button >以图搜车</Button>
        <Button className='buttonS'>车辆轨迹</Button>
        <Button className='buttonS'>人脸身份识别</Button>
        <Button className='buttonS'>人脸比对检索</Button>
        <Button className='buttonS'>图片取证</Button>
        <Button className='buttonS'>图像增强</Button>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button className='buttonS' >车辆技战法</Button>
        </Dropdown>

     </div>
    </Modal>
  );
};
export default modal;
