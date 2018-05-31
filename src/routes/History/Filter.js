import {Input, Form, DatePicker, Button, Row, Col, Icon, Message} from 'antd';
import {connect} from 'dva';
import MapModal from '../GisMap/MapModal';

const FormItem = Form.Item;
const Filter = ({form: {getFieldDecorator, getFieldsValue, setFieldsValue, validateFields, resetFields}, treeProps, styles, dispatch, gisMap}) => {
  const {treeData, mapFlag} = treeProps;
  const {mapSelectCameraData, showMapModel} = gisMap;
  const submit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) return;
      console.log('Received values of form: ', values);
      let data = {
        ...values,
        deviceIDs: values.deviceIDs,
        startTime: values.startTime.format('YYYY,MM,DD,HH,mm,ss') || '',
        endTime: values.endTime.format('YYYY,MM,DD,HH,mm,ss') || '',
      }
      // 解析联网选取设备的历史信息
      const onlineInfo = arr.map(ele => {
        let obj = {
          ...ele,
          location: ele.nodeId,
          name: `${ele.nodeName}_${values.startTime.replace(/,/g, '')}_${values.endTime.replace(/,/g, '')}`
        }
        return obj;
      })
      dispatch({
        type: 'video/onlineInfo',
        payload: {
          onlineInfo: onlineInfo
        }
      })
      let videoCtrl = document.getElementById('HisVideo');  //ocx控件id;
      if (!videoCtrl.MS_PlayBackbyTime) {
        return Message.info('当前浏览器不支持播放设备');
      } else {
        let playId = videoCtrl.MS_PlayBackbyTime(values.deviceID[0], values.startTime, values.endTime, 0);
        if (playId < 0) {
          return Message.warning(`MS_PlayBackbyTime接口错误！错误码${playId}`);
        } else {
          values.deviceID.map((ele, index) => {
            videoCtrl.MS_PlayBackbyTime(ele.nodeId, values.startTime, values.endTime, index);
          })
        }
      }
    });
  };
  const dateFormat = 'YYYY年MM月DD日 HH:mm:ss';
  const mapSetDev = () => {
    dispatch({
      type: 'gisMap/updateState',
      payload: {
        showMapModel: true
      },
    });
  }
  let mapData = [];
  if (!showMapModel && mapSelectCameraData && mapSelectCameraData.length > 0) {
    console.log(mapSelectCameraData, 'mapSelectCameraData')
    mapData = mapSelectCameraData.map(ele => {
      return ele.SBBH;
    })
    console.log(mapData, mapSelectCameraData)
  }
  return (<div className={styles.form}>
    <Form layout="inline" onSubmit={submit}>
      <Row>
        <FormItem label="开始时间" labelCol={{span: 7}} wrapperCol={{span: 17}}>
          {getFieldDecorator('startTime', {
            rules: [{required: true, message: '开始时间不可缺少!'}],
          })(<DatePicker allowClear={false} className={styles.datePick} showTime
                         format={dateFormat} placeholder="开始时间"/>)}
        </FormItem>
      </Row>
      <Row>
        <FormItem label="结束时间" labelCol={{span: 7}} wrapperCol={{span: 17}}>
          {getFieldDecorator('endTime', {
            rules: [{required: true, message: '结束时间不可缺少!'}],
          })(<DatePicker allowClear={false} className={styles.datePick} showTime
                         format={dateFormat} placeholder="结束时间"/>)}
        </FormItem>
      </Row>
      {/*<Row>*/}
      {/*/!*<Col span={13} offset={2}>*!/*/}
      {/*/!*<FormItem className={`deviceID`}>*!/*/}
      {/*/!*{getFieldDecorator('deviceIDs', {*!/*/}
      {/*/!*rules: [{required: true, message: '至少选取一个设备!'}],*!/*/}
      {/*/!*})(*!/*/}
      {/*/!*<TestTreeSelect {...treeProps} />*!/*/}
      {/*/!*)}*!/*/}
      {/*/!*</FormItem>*!/*/}
      {/*/!*</Col>*!/*/}
      {/*<Col span={15} offset={5}>*/}
      {/*<FormItem className={`deviceID`}>*/}
      {/*{getFieldDecorator('mapDeviceIDs', {})(*/}
      {/*<Button onClick={mapSetDev}>地图选点<Icon type="environment"/></Button>*/}
      {/*)}*/}
      {/*</FormItem>*/}
      {/*</Col>*/}
      {/*</Row>*/}
      {/*<Row type="flex" justify="center">*/}
      {/*<Button type="primary" htmlType="submit">*/}
      {/*回放*/}
      {/*</Button>*/}
      {/*</Row>*/}
    </Form>
    <MapModal/>
  </div>);
};


export default connect(state => ({
  gisMap: state.gisMap,
  video: state.video,
}))(Form.create()(Filter))
