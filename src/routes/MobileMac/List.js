import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Button} from 'antd'
const confirm = Modal.confirm
const List = ({exportPhoneMacList,showModal,...listProps}) => {
  const columns = [
    {
      title: '手机串号(IMSI)',
      dataIndex: 'phoneImsi',
      key: 'phoneImsi',
    }, {
      title: '手机MAC地址',
      dataIndex: 'phoneMac',
      key: 'phoneMac',
    },{
		  title: '站点编号',
		  dataIndex: 'siteNumber',
		  key: 'siteNumber',
	  },{
      title: '经过时间',
      dataIndex: 'passTime',
      key: 'passTime',
		  render:text=>
			  new Date(text).getFullYear()+'-'+(new Date(text).getMonth()+1)+'-'+new Date(text).getDate()+' '+new Date(text).getHours()+':'+new Date(text).getMinutes()+':'+new Date(text).getSeconds()
    },
    {
      title: '行驶方向',
      dataIndex: 'drivingDirection',
      key: 'drivingDirection',
    },
    {
      title: '疑似车辆(匹配次数)',
      dataIndex: 'suspectedVehicle',
      key: 'suspectedVehicle',
    },
    {
      title: '报警处理',
      dataIndex: 'processingResult',
      key: 'processingResult',
	    render:text=>
		    (<span>{text==='0'?'已处理':'未处理'}</span>)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
	    render:(text,record) =>
		    (<a onClick={()=>showModal(record)}>详情</a>)
    }
  ];
  return (
    <div>
	    <div style={{textAlign:'right'}}>
		    <Button onClick={exportPhoneMacList}>导出本页</Button>
	    </div>
      <div>
	      <Table
		      {...listProps}
		      style={{width:'100%'}}
		      bordered
		      columns={columns}
		      simple
		      size={'middle'}
	      />
      </div>
    </div>
  )
};

export default List
