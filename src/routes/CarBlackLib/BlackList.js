/**
 * 功能描述：黑名单库列表
 */
import React from 'react';
import { Table,Modal,Row ,Col,Button,Icon} from 'antd';
import style from './BalckList.less'
import config from '../../config'
const confirm = Modal.confirm

const BlackList = ({onDetail,onEdit,onDelete,onMutiDelete,onExport,onControl,...props}) => {
  const color = {'':'全部','1':'蓝色','2':'黑色','3':'白色','4':'绿色','5':'黄色'};
  const bodyColor={'1':'黑色','2':'白色','3':'红色','4':'其他'}
  const detail=(record)=>{
    onDetail(record)
  }
  const edit=(record)=>{
    onEdit(record)
  }
  const del =(record)=>{
    confirm({
      title: '删除',
      content:'记录删除后不可恢复！',
      onOk () {
        onDelete(record)
      },
    })

  }
  const columns = [
    {
      key:'vehicleBrandNum',
      title:'号牌号码',
      dataIndex: 'vehicleBrandNum',
      width: 100,
    },
    {
    key:'vehiclePlateColor',
    title:'号牌颜色',
    dataIndex: 'vehiclePlateColor',
    width: 100,
    render: text => <span>{text=="" ? '全部' : color[text]}</span>,
    },
    {
      key:'vehicleBrand',
      title:'车辆品牌',
      dataIndex: 'vehicleBrand',
      width: 100,
    },
    {
      key:'vehicleBodyColor',
      title:'车身颜色',
      dataIndex: 'vehicleBodyColor',
      width: 100,
      render: text => <span>{text=="" ? '未知' : bodyColor[text]}</span>
    },
    {
      key:'vehicleOwner',
      title:'车主姓名',
      dataIndex: 'vehicleOwner',
      width: 100,
    },
    {
      key:'vehicleOwnerPhone',
      title:'车主联系电话',
      dataIndex: 'vehicleOwnerPhone',
      width: 150,
    },
    {
      key:'vehicleOwnerCard',
      title:'车主身份证号',
      dataIndex: 'vehicleOwnerCard',
      width: 150,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      render: (text, record) => {
        return <span className={style.carBlackList}>
          <a onClick={e=>detail(record,e)}>详情</a>
          <a onClick={e=>edit(record,e)}>编辑</a>
          <a onClick={e=>del(record,e)}>删除</a>
        </span>
      },
    },
  ];
  return (
    <div>
      <Row className={'row-space'} type={'flex'} justify={'end'}>
        <Button className={'button-space-large'} onClick={onControl}>
          <Icon type="exception" />布控
        </Button>

        <Button className={'button-space-large'}  onClick={onMutiDelete}>
          <Icon type="delete" style={{color:'red'}}/>删除
        </Button>
        <Button className={'button-space-large'} onClick={onExport}>
          <Icon type="export" />导出本页
        </Button>
      </Row>
    <Table columns={columns} {...props} />
    </div>
  );
};

export default BlackList;

