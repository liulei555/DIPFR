import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal ,Row,Col,Popconfirm} from 'antd'
const confirm = Modal.confirm
const List = ({createAddDispatch,onDelete,cancelDispatch,detail,...tableProps}) => {
  const onDetail=(record, e)=>{
    console.log(record)
    detail(record)
  }

  const  confirm = (e) => {
    console.log(e);
    onDelete(e)
  }
  const cancel = (e) => {
    console.log(e);
  }
  const columns = [
    {
      title: '布控类型',
      dataIndex: 'dispositionMark',
      key: 'dispositionMark',
      render:text => <span>{text === '1' ? '车辆布控':(text === '2' ? '人脸布控' : '')}</span>
    }, {
      title: '布控描述',
      dataIndex: 'dispositionTitle',
      key: 'dispositionTitle',
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render:text => <span>{
        new Date(text).format('yyyy-MM-dd hh:mm:ss')
      }</span>
    },
    {
      title: '布控截至时间',
      dataIndex: 'dispositionEndTime',
      key: 'dispositionEndTime',
      render:text => <span>{
        new Date(text).format('yyyy-MM-dd hh:mm:ss')
      }</span>
    },
    {
      title: '布控状态',
      dataIndex: 'state',
      key: 'state',
      render:text => <span>{text === '0' ? '删除':(text === '1' ? '布控' : (text === '2' ? '撤控' : (text === '3' ? '已处置' :  '')))}</span>
    },
    {
      title: '布控人',
      dataIndex: 'dispositionPerson',
      key: 'dispositionPerson',
    },
    {
      title: '布控人联系电话',
      dataIndex: 'dispositionConNumber',
      key: 'dispositionConNumber',
    },
    {
      title: '布控单位',
      dataIndex: 'dispositionCompany',
      key: 'dispositionCompany',
      render:text => <span>{text === '1' ? '刑侦支队':(text === '2' ? '经侦支队' : (text === '3' ? '交警支队' : (text === '4' ? '治安支队' :  (text === '5' ? '情报中心' :  (text === '6' ? '其他' :  '')))))}</span>
    }
    ,{
      title: '操作',
      key: 'operation',
      width: 200,
      render: (text, record) => {
        if(record.state === '1'){
          return(
            <div>
              <Row>
                <Col span={7}>
                  <a onClick={() => onDetail(record)}>详情</a>
                </Col>
                <Col span={10}>
                  <a onClick={() => cancelDispatch(record)}>撤控</a>
                </Col>

                {/*<Col span={7}>
                  <a onClick={() => onDelete(record)}>删除</a>
                </Col>*/}
              </Row>
            </div>
          )
        }else if(record.state === '2'){
          return(
            <div>
              <Row>
                <Col span={7}>
                  <a onClick={() => onDetail(record)}>详情</a>
                </Col>
                <Col span={10}>
                  <a onClick={() => createAddDispatch(record)}>布控</a>
                </Col>

                <Col span={7}>
                  <Popconfirm  title="确定删除所选记录吗？" onConfirm={() =>confirm(record)} onCancel={cancel} okText="确定" cancelText="取消"><a>删除</a></Popconfirm>
                </Col>
              </Row>
            </div>
          )
        }else if(record.state === '0'){
          return(
          <div>
            <Row>
              <Col span={7}>
                <a onClick={() => onDetail(record)}>详情</a>
              </Col>
              <Col span={10}>
                <a onClick={() => createAddDispatch(record)}>布控</a>|<a onClick={() => cancelDispatch(record)}>撤控</a>
              </Col>
            </Row>
          </div>
        )
        }else {
          return(
            <div>
              <Row>
                <Col span={7}>
                  <a onClick={() => onDetail(record)}>详情</a>
                </Col>
                <Col span={10}>
                  <a onClick={() => createAddDispatch(record)}>布控</a>
                </Col>

                <Col span={7}>
                  <a onClick={() => onDelete(record)}>删除</a>
                </Col>
              </Row>
            </div>
          )
        }

      },
    },
  ]
  return (
    <div>
      <Table
        {...tableProps}
        style={{width:'100%',marginTop:20}}
        bordered
        columns={columns}
        simple
        size={'middle'}
        rowKey={record => record.ROW_ID}
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
