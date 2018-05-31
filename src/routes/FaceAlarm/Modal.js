import React from 'react';
import PropTypes from 'prop-types';
import { Form,Card,Modal,Select,DatePicker,Row,Col,Input,Radio,Button,Carousel} from 'antd';
import ModalLeft from "./ModaLeft";
import ModalRight from "./ModalRight";
import './Modal.less'
import cloud from '../Video/src/cloud.jpg'

const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input;
const modal = ({...modalProps}) => {
 /* function onChange(a, b, c) {
    console.log(a, b, c);
  }*/
  return (
    <Modal {...modalProps} footer={null} width='80%' className={`ModalMac`}>
      <div style={{ padding: '0px' }}>
        <Row gutter={0}>
          <Col span={8}>
            <Card bordered={false} bodyStyle={{padding:'0'}}>
            <ModalLeft/>
            </Card>
          </Col>
          <Col span={11}>
            <Card bordered={false} bodyStyle={{padding:'0px 3px'}}>
              <div style={{width:'100%',height:'100%',position:'relative'}}>
	              <div className="leftImg">
		              <img src={cloud} alt="文件"/>
	              </div>
	              <div className="rightImg">
		              <img src={cloud} alt="文件"/>
	              </div>
                <Carousel>
                  <div> <img alt={'image'} src='../../../public/images/image_usr.png'
                             style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src='../../../public/images/timg1.jpg'
                             style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src='../../../public/images/timg2.jpg'
                             style={{width:'100%',height:'642px'}}/></div>
                  <div> <img alt={'image'} src='../../../public/images/timg3.jpg'
                             style={{width:'100%',height:'642px'}}/></div>
                </Carousel>
              </div>
            </Card>
          </Col>
          <Col span={5}>
            <Card bordered={false} bodyStyle={{padding:'0'}}>
            <ModalRight/>
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ paddingTop: '10px',textAlign:'center'}}>
        <Button type="primary">以图搜车</Button>
        <Button className='buttonS' type="primary">车辆轨迹</Button>
        <Button className='buttonS' type="primary">人脸身份识别</Button>
        <Button className='buttonS' type="primary">人脸比对检索</Button>
        <Button className='buttonS' type="primary">快速布控</Button>
        <Button className='buttonS' type="primary">图片取证</Button>
        <Button className='buttonS' type="primary">图像增强</Button>
        <Button className='buttonS' type="primary">车辆技战法</Button>
     </div>
    </Modal>
  );
};
export default modal;
