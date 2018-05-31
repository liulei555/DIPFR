import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Menu} from 'antd'
const confirm = Modal.confirm
const List = ({list,detail,...listProps}) => {
  const onDetail=(record, e)=>{
    console.log(record)
    detail(record)
  }
  console.log(list)
  const columns = [
    {
      title: '号牌号码',
      dataIndex: 'PlateNo',
      key: 'PlateNo',
      width:150
    }, {
      title: '号牌颜色',
      dataIndex: 'PlateColor',
      key: 'PlateColor',
      width:150
    },{
      title: '位置',
      dataIndex: 'NameOfPassedRoad',
      key: 'NameOfPassedRoad',
      width:150
    },
    {
      title: '经过时间',
      dataIndex: 'PassTime',
      key: 'PassTime',
      width:150
    },
    {
      title: '方向',
      dataIndex: 'Direction',
      key: 'Direction',
      width:100
    },
    {
      title: '车速',
      dataIndex: 'Speed',
      key: 'Speed',
      width:100
    },
    /*{
      title: '布控单位',
      dataIndex: 'dispositionCompany',
      key: 'dispositionCompany',
      width:150
    },
    {
      title: '布控人',
      dataIndex: 'dispositionPerson',
      key: 'dispositionPerson',
      width:150
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      width:150
    },
    {
      title: '布控描述',
      dataIndex: 'dispositionTitle',
      key: 'dispositionTitle',
      width:150
    },
    {
      title: '报警处理',
      dataIndex: 'memo',
      key: 'memo7 ',
      width:150
    }*/
    ,{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <span><a onClick={() => onDetail(record)}>详情</a></span>
      },
    },
  ]
  return (
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
  )
}

List.propTypes = {
  // onDeleteItem: PropTypes.func,
  // onEditItem: PropTypes.func,
  // location: PropTypes.object,
}

export default List
