import React from 'react';
import { connect } from 'dva';
import { Col, Row, Modal, message, Button, Card, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../common/menu';
import style from './index.less';
import BlackLibList from './BlackLibList';
import BlackLib from './BlackLibModal';
import Filter from './Filter';
import BlackList from "./BlackList";
import BlackModal from "./BlackModal";
import BlackListImportModal from './BlackListImportModal'
import { routerRedux } from 'dva/router';
import CreateCarModal from '../DispatchManagement/CreateCarModal'
let title = '';
const CarBlackLib = ({ dispatch, carBlackLib, dispatchManagement, loading }) => {

  const { blackLibList, blackLibVisible, selectedLib, blackLibTitle, list, blackVisible, selectedList, modalType, currentItem, pagination, imageUrl, blackImportVisible, exportUrl, selectRowList } = carBlackLib;
  const { modalVisible, cancelDispatchVisible, createCarVisible, heimingdan, dataSource, creatTimeStart, creatTimeEnd, dispositionEndTime, treeData, selectCarData, dispositionStartTime, clickType, dispositionMark, curPowers, selectValueRedio, blacklistData, personIds, vehicleIds, cancelDispatchId, previewVisible, previewImage, fileList, vehicleId, carBlackLibId, vehiclePlateColor, vehicleBrandNum } = dispatchManagement;
  console.log(dispatchManagement)
  const pageHeaderProps = {
    menuList: headhildMenu.dispatchedAlarm,
  };
  /**
   * 黑名单库
   */
  const blackLibListProps = {
    loading: loading.effects['carBlackLib/queryLibList'],
    dataSource: blackLibList,
    pagination: false,
    rowKey: record => record.id,
    bordered: true,
    rowSelection: {
      selectedRowKeys: selectedLib,
      onChange: (selectedRowKeys) => {
        dispatch({
          type: 'carBlackLib/updateState',
          payload: {
            selectedLib: selectedRowKeys,
          },
        });
      },
    },
    onRow: (record) => ({
      onClick: () => {
        console.log(record)
        dispatch({
          type: 'carBlackLib/updateState',
          payload: {
            selectedLib: [record.id],
            blackLibTitle: record.vehicleBlacklibName,
          },
        });
        dispatch({
          type: 'carBlackLib/queryList',
          payload: {
            vehicleId: [record.id],
            pageNum: '1',
            pageSize: '10'
          },
        });
      },
    }),
    addLib: () => {
      dispatch({
        type: 'carBlackLib/updateState',
        payload: {
          blackLibVisible: true,
        },
      });
    },
    deleteLib: () => {
      if (selectedLib.length > 0) {
        Modal.confirm({
          title: '提示',
          content: '确定删除该黑名单库？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({
              type: 'carBlackLib/deleteItem',
              payload: [{ id: selectedLib[0] }],
            });
          },
          onCancel() {
          },
        });
      } else {
        message.warning('请选择要删除的黑名单库！');
      }
    }
  };

  const blackLibProps = {
    visible: blackLibVisible,
    title: '新建黑名单库',
    onCreate: (v) => {
      console.log(v);
      dispatch({
        type: 'carBlackLib/saveBlackLib',
        payload: v,
      });
    },
    onCancel: () => {
      dispatch({
        type: 'carBlackLib/updateState',
        payload: {
          blackLibVisible: false,
        },
      });
    },
  };

  const filterProps = {
    selectdBalckList: selectedList,
    onSearch: (v) => {
      dispatch({
        type: 'carBlackLib/queryList',
        payload: v,
      })
    },
    // onDeleteItem(){
    //   console.log([{selectedList}])
    //   dispatch({
    //     type: 'carBlackLib/deleteItem',
    //     payload: [{selectedList}],
    //   });
    // }
  };
  const balckListProps = {
    loading: loading.effects['carBlackLib/queryList'],
    dataSource: list,
    pagination,
    exportUrl,
    rowKey: record => record.id,
    bordered: true,
    rowSelection: {
      selectedRowKeys: selectedList,
      onChange: (selectedRowKeys, selectedRows) => {
        dispatch({
          type: 'carBlackLib/updateState',
          payload: {
            selectedList: selectedRowKeys,
            selectRowList: selectedRows,
          },
        });
      },
    },
    onChange(page) {
      const { query, pathname } = location
      dispatch({
        type: 'carBlackLib/queryList',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
        }
      })

    },
    onDetail(record) {
      dispatch({
        type: 'carBlackLib/queryInfoById',
        payload: {
          ...record,
          modalType: 'detail'
        }
      })
    },
    onEdit(record) {
      dispatch({
        type: 'carBlackLib/queryInfoById',
        payload: {
          ...record,
          modalType: 'update'
        }
      })
    },
    onDelete(record) {
      dispatch({
        type: 'carBlackLib/deleteItemList',
        payload: [{ id: record.id }]
      })
    },
    onMutiDelete() {

      if (selectedList && selectedList.length > 0) {
        Modal.confirm({
          title: '删除',
          content: '记录删除后不可恢复！',
          onOk() {
            let arr = []
            for (let i = 0; i < selectedList.length; i++) {
              arr.push({ id: selectedList[i] })
            }
            dispatch({
              type: 'carBlackLib/deleteItemList',
              payload: arr
            })
          },
        })
      } else {
        message.warning('请选择一条记录！');
      }

    },
    onExport() {
      dispatch({
        type: 'carBlackLib/exportList',
        payload: {},
      });
    },
    onControl: () => {
      if (selectedLib && selectedLib.length > 0) {
        if (selectedList && selectedList.length === 1) {
          console.log(selectRowList)
          dispatch({
            type: 'dispatchManagement/updateState',
            payload: {
              createCarVisible: true,
              heimingdan: true,
              vehicleId: '1',
              vehiclePlateColor: selectRowList[0].vehiclePlateColor,
              vehicleBrandNum: selectRowList[0].vehicleBrandNum
            }
          })
        } else {
          dispatch({
            type: 'dispatchManagement/updateState',
            payload: {
              createCarVisible: true,
              heimingdan: false,
              vehicleId: '2',
              carBlackLibId: selectedLib
            }
          })

        }
      } else {
        message.warning('请选择黑名单库！');
      }
      // if(selectedList && selectedList.length > 0){
      //   dispatch({
      //     type:'carBlackLib/updateState',
      //     payload:{
      //       detailVisible:true,heimingdan:false}
      //   })
      //   dispatch({
      //     type:'carBlackLib/queryDispatchById',
      //     payload:{
      //       selectedList:selectedList[0]
      //     }
      //   })
      // }else{
      //   message.warning('请选择黑名单！');
      // }
    },
  }
  if (modalType === 'create') {
    title = '新增'
  } else if (modalType === 'detail') {
    title = '详情'
  } else {
    title = '修改'
  }
  const blackProps = {
    item: modalType === 'create' ? [] : currentItem,
    modalType: modalType,
    loading,
    imageUrl,
    visible: blackVisible,
    title: title,
    footer: modalType === 'detail' ? null : '',
    dispatch,
    onOk(values) {
      console.log(values)
      if (modalType === 'update') {
        dispatch({
          type: 'carBlackLib/updateBlackInfo',
          payload: values
        })
      } else {
        dispatch({
          type: 'carBlackLib/addBlackInfo',
          payload: values
        })
      }

    },
    onCancel() {
      dispatch({
        type: 'carBlackLib/updateState',
        payload: {
          blackVisible: false,
        }
      })
    }
  }
  /**
   * 添加黑名单
   * */
  const showModal = () => {
    if (selectedLib.length > 0) {
      dispatch({
        type: 'carBlackLib/updateState',
        payload: {
          blackVisible: true,
          modalType: 'create'
        }
      })
    } else {
      message.warning("请选择一条记录！")
    }
  }
  const showImportModal = () => {
    dispatch({
      type: 'carBlackLib/updateState',
      payload: {
        blackImportVisible: true,
      }
    })
  }
  const blackListImportProps = {
    title: '批量导入黑名单',
    visible: blackImportVisible,
    onCancel() {
      dispatch({
        type: 'carBlackLib/updateState',
        payload: {
          blackImportVisible: false,
        }
      })
    },
    //批量导入数据
    onBatchImport(srcPath) {
      dispatch({
        type: 'carBlackLib/savefile',
        payload: {
          srcPath: srcPath,
          authorization: window.sessionStorage.getItem("token"),
          vehicleId: selectedLib[0]
        },
      })
    }

  }
  const createCarModalProps = {
    previewVisible: previewVisible,
    previewImage: previewImage,
    fileList: previewImage,
    blacklistData: blackLibList,
    visible: createCarVisible,
    treeData: treeData,
    clickType,
    selectValueRedio,
    selectCarData: selectCarData,
    item: {
      vehicleId: vehicleId,
      carBlackLibId: carBlackLibId,
      vehiclePlateColor: vehiclePlateColor,
      vehicleBrandNum: vehicleBrandNum
    },
    heimingdan,
    dispatch,
    title: "新建车辆布控任务",

    onChangeSelect(checkedValues) {
      let arrCar;
      if (clickType === 'createCar') {
        if (checkedValues) {
          checkedValues.map((item) => {
            arrCar = {
              vehicleId: item,
            }
          })
          vehicleIds.push(arrCar);
        }
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            vehicleIds: vehicleIds,
          }
        })
      } else if (clickType === 'createFace') {
        if (checkedValues) {
          checkedValues.map((item) => {
            arrCar = {
              personId: item,
            }
          })
          personIds.push(arrCar);
        }
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            personIds: personIds,
          }
        })
      }
    },
    onChangeRedio(e) {
      console.log(e.target.value)
      if (e.target.value === '1') {
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            heimingdan: true,
          }
        })
      } else if (e.target.value === '2') {
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            heimingdan: false,
          }
        })
        dispatch({
          type: 'dispatchManagement/blacklist',
          payload: {
            pageNum: '1',
            pageSize: '10'
          }
        })
      }
      /*dispatch({
        type:'dispatchManagement/updateState',
        payload:{
          selectValueRedio:e.target.value,
        }
      })*/
    },
    onOk(data) {
      data.dispositionStartTime = dispositionStartTime
      data.dispositionEndTime = dispositionStartTime
      data.createTime = dispositionStartTime
      data.dispositionImageURL = data.dispositionImageURL ? data.dispositionImageURL[0].response.data : ''
      data.state = ''
      data.dispositionMark = dispositionMark
      console.log(data);
      if (clickType === 'createCar') {
        dispatch({
          type: 'dispatchManagement/createDispatch',
          payload: {
            data: data,
          }
        })
      } else if (clickType === 'createFace') {
        dispatch({
          type: 'dispatchManagement/createFaceDispatch',
          payload: {
            data: data,
          }
        })
      }
      dispatch(routerRedux.push({
        pathname: '/dispatched/disManagement'
      }))
    },
    onCancel() {
      dispatch({
        type: 'dispatchManagement/updateState',
        payload: {
          createCarVisible: false,
        }
      })
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'dispatchManagement/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
          },
        });
      }).then((res) => {
        console.log(res)
        if (res) {
          treeNode.props.dataRef.children = res
          console.log(treeData)
          dispatch({
            type: 'dispatchManagement/updateState',
            payload: {
              treeData: [...treeData],
            },
          })
        }
      });
    },
    onSelect(node, e) {
      selectCarData.push(e.props.dataRef)
      dispatch({
        type: 'dispatchManagement/updateState',
        payload: {
          selectCarData: selectCarData
        }
      })
    },
    handlePreview(file) {
      dispatch({
        type: 'dispatchManagement/updateState',
        payload: {
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        }
      })
    },
    handleCancel() {
      dispatch({
        type: 'dispatchManagement/updateState',
        payload: {
          previewVisible: false
        }
      })
    },
    handleChangePhoto(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="dispatched-carBlackLib">
      <Card bodyStyle={{ padding: 0 }}>
        {createCarVisible && clickType && <CreateCarModal {...createCarModalProps} />}
        {/*黑名单库新增弹出框*/}
        <BlackLib {...blackLibProps} />
        {/*黑名单明细弹出框*/}
        {blackVisible && <BlackModal {...blackProps} />}
        {blackImportVisible && <BlackListImportModal {...blackListImportProps}></BlackListImportModal>}
        <Row className={style.carBlackLib} >
          <Col span={5} className={'left-col'}>
            <BlackLibList {...blackLibListProps} />
          </Col>
          <Col span={19} className={'right-col'}>
            <Row className={'header'} >
              <Col span="3">
                <h4>{blackLibTitle}&nbsp;</h4>
              </Col>
              <Col span="10">
                <Row type={'flex'} justify={'start'}>
                  <Button className={'button-space button-left'} onClick={showModal}>
                    <Icon type="plus" />添加黑名单
                  </Button>
                  <Button onClick={showImportModal} className={'button-space'}>
                    <Icon type="plus" />批量导入黑名单
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row className={'box'}>
              <Filter {...filterProps} />
            </Row>
            <Row>
              <BlackList {...balckListProps}></BlackList>
            </Row>
          </Col>
        </Row>
      </Card>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, carBlackLib, dispatchManagement, loading }) => ({
  dispatch,
  carBlackLib,
  dispatchManagement,
  loading,
}))(CarBlackLib);
