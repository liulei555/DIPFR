import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Input,Menu,Radio,Row,Col,DatePicker,Select } from 'antd'
import './ModalRight.less'
import imgUrl from '../../../public/images/image_usr.png'
const confirm = Modal.confirm
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input;
const ModalRight = (item) => {
  console.log({item})
  return (
    <div style={{fontSize:'8px'}}>
      <div>
        <img alt={'image'} src={imgUrl} style={{width:'100%',height:'150px'}}/>
      </div>
      <div className='divS'>
      <table border={0} width='100%'>
       <tr>
        <td>号牌号码：</td>
        <td className='table-td'>{item.item.PlateNo}</td>
      </tr>
        <tr>
          <td>号牌种类：</td>
          <td>{item.item.PlateClass}</td>
        </tr>
        <tr>
          <td>号牌颜色</td>
          <td>{item.item.PlateColor}</td>
        </tr>
      <tr>
          <td>车辆品牌：</td>
          <td>{item.item.VehicleBrand}</td>
        </tr>
        <tr>
          <td>车辆子品牌：</td>
          <td></td>
        </tr>
        <tr>
          <td>车型：</td>
          <td>{item.item.VehicleClass}</td>
        </tr>
        <tr>
          <td>车身颜色：</td>
          <td>{item.item.VehicleColor}</td>
        </tr>
        <tr>
          <td>挂件：</td>
          <td></td>
        </tr>
        <tr>
          <td>餐巾盒：</td>
          <td></td>
        </tr>
        <tr>
          <td>年检标签：</td>
          <td></td>
        </tr>
        <tr>
          <td>打电话：</td>
          <td></td>
        </tr>
        <tr>
          <td>主驾安全带：</td>
          <td></td>
        </tr>
        <tr>
          <td>副驾安全带：</td>
          <td></td>
        </tr>
        <tr>
          <td>主驾遮阳板：</td>
          <td></td>
        </tr>
        <tr>
          <td>副驾遮阳板：</td>
          <td></td>
        </tr>
        <tr>
          <td>行驶速度：</td>
          <td>{item.item.Speed}</td>
        </tr>
        <tr>
          <td>行驶方向：</td>
          <td>{item.item.Direction}</td>
        </tr>
        <tr>
          <td>行驶车道：</td>
          <td></td>
        </tr>
        <tr>
          <td>经过时间：</td>
          <td>{item.item.PassTime}</td>
        </tr>
        <tr>
          <td>经过地址：</td>
          <td>{item.item.NameOfPassedRoad}</td>
        </tr>
        <tr>
          <td>黄标车：</td>
          <td></td>
        </tr>
        <tr>
          <td>危险用车：</td>
          <td></td>
        </tr>
        <tr>
          <td>来源标识：</td>
          <td></td>
        </tr>
      </table>
      </div>
    </div>
  )
}

export default ModalRight
