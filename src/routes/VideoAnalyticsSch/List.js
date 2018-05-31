import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Menu,Row,Col,Button,Icon} from 'antd'
import './index.less'
const confirm = Modal.confirm
const List = ({onSort,onAnalysisItem,onStopItem,onAnalysis,onStop,...props}) => {
  console.log(props)
  const columns = [
    {
      title: '序号',
      dataIndex: 'ROW_ID',
      key: 'ROW_ID',
    },
    {
      title: '设备编码',
      dataIndex: 'deviceNumber',
      key: 'deviceNumber',
      sorter: (a, b) => onSort(a,b),
    }, {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      sorter: (a, b) => onSort(a,b),
    },
     {
      title: '设备厂家',
      dataIndex: 'manufacturerName',
      key: 'manufacturerName',
      sorter: (a, b) => onSort(a,b),
    },
    {
      title: '所属部门',
      dataIndex: 'notificationAddress',
      key: 'notificationAddress4',
      sorter: (a, b) => onSort(a,b),
    },
    {
      title: '分析状态',
      dataIndex: 'analysisStatus',
      key: 'analysisStatus',
      render:text => <span>{text === '0' ? '停止':(text === '1' ? '分析中' : '')}</span>
    },
    {
      title: '分析类型',
      dataIndex: 'analysisType',
      key: 'analysisType',
      render:text => <span>{text === '0' ? '停止':(text === '1' ? '分析中' : '')}</span>
    },
    {
      title: '操作',
      dataIndex: 'passTime',
      key: 'passTime',
      render: (text, record) => {
        return <span>
          {record.analysisStatus==='0'?<a onClick={e=>onStopItem(record,e)}>分析</a>:
            <a onClick={e=>onAnalysisItem(record,e)}>停止</a>
          }
        </span>
      },
    },
  ];
  return (
    <div>
      <Row className={'row-space'} type={'flex'} justify={'end'}>
        <Button onClick={onStop}>
          停止
        </Button>
        <Button style={{marginLeft:10 }} onClick={onAnalysis}>
          分析
        </Button>
      </Row>
      <div style={{marginTop:10}}>
      <Table
        style={{width:'100%'}}
        {...props}
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
