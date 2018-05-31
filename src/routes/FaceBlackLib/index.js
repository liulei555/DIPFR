/**
 * 功能描述：人脸黑名单库
 * 2018.04.24
 * 作者：xiongmeng
 */
import React from 'react';
import { connect } from 'dva';
import { Col, Row, Modal, message, Button, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { headhildMenu } from '../../common/menu';
import style from './index.less';
import BlackLibList from './BlackLibList';
import BlackLib from './BlackLib';
import Filter from './Filter';
import SingleBlack from './SingleBlack';
import BlackList from './BlackList';
import BatchBlack from './BatchBlack';
import CreateCarModal from '../DispatchManagement/CreateCarModal';
import moment from 'moment';

const basicPage = {
  pageNum: '1',
  pageSize: '12',
};

const Index = ({ dispatch, faceBlackLib, dispatchManagement, loading }) => {

  const { blackLibList, blackLibVisible, selectedLib, blackLibTitle, singleBlackVisible, pagination, blackList, searchForm, batchBlackVisible } = faceBlackLib;

  const { modalVisible, cancelDispatchVisible, createCarVisible, heimingdan, dataSource, creatTimeStart, creatTimeEnd, dispositionEndTime, treeData, selectCarData, dispositionStartTime, clickType, dispositionMark, curPowers, selectValueRedio, blacklistData, personIds, vehicleIds, cancelDispatchId, previewVisible, previewImage, fileList, vehicleId, carBlackLibId, personName, personSex, birthday, personCertificateNum, personId } = dispatchManagement;

  const pageHeaderProps = {
    menuList: headhildMenu.dispatchedAlarm,
  };

  const blackLibListProps = {
    loading: loading.effects['faceBlackLib/queryBlackLib'],
    dataSource: blackLibList,
    pagination: false,
    size: 'small',
    rowKey: record => record.ID,
    rowSelection: {
      selectedRowKeys: selectedLib,
      onChange: (selectedRowKeys) => {
      },
    },
    onRow: (record) => ({
      onClick: () => {
        dispatch({
          type: 'faceBlackLib/queryBlackList',
          payload: {
            ...basicPage,
            personId: record.ID,
            title: record.PERSON_BLACKLIB_NAME,
          },
        });
      },
    }),
    addLib: () => {
      dispatch({
        type: 'faceBlackLib/updateState',
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
              type: 'faceBlackLib/deleteBlackLib',
              payload: {
                id: selectedLib[0],
              },
            });
          },
          onCancel() {
          },
        });
      } else {
        message.warning('请选择要删除的黑名单库！');
      }
    },
  };

  const blackLibProps = {
    visible: blackLibVisible,
    title: '新建黑名单库',
    confirmLoading: loading.effects['faceBlackLib/insertBlackLib'],
    onCreate: (v) => {
      dispatch({
        type: 'faceBlackLib/insertBlackLib',
        payload: {
          ...v,
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          blackLibVisible: false,
        },
      });
    },
  };

  const filterProps = {
    searchForm,
    onSearch: (v) => {
      if (selectedLib.length > 0) {
        dispatch({
          type: 'faceBlackLib/queryBlackList',
          payload: {
            ...v,
            ...basicPage,
            personId: selectedLib[0],
            title: blackLibTitle,
          },
        });
      } else {
        message.warning('请选择黑名单库！');
      }
    },
  };

  const singleBlackProps = {
    visible: singleBlackVisible,
    title: '新建黑名单',
    confirmLoading: loading.effects['faceBlackLib/insertBlackList'],
    onCreate: (v) => {
      dispatch({
        type: 'faceBlackLib/insertBlackList',
        payload: {
          ...v,
          personId: selectedLib[0],
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          singleBlackVisible: false,
        },
      });
    },
  };

  const addSingleBlack = () => {
    if (selectedLib.length > 0) {
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          singleBlackVisible: true,
        },
      });
    } else {
      message.warning('请选择黑名单库！');
    }
  };

  const addBatchBlack = () => {
    if (selectedLib.length > 0) {
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          batchBlackVisible: true,
        },
      });
    } else {
      message.warning('请选择黑名单库！');
    }
  };

  const batchBlackProps = {
    visible: batchBlackVisible,
    title: '批量添加黑名单',
    onCreate: (v) => {
      dispatch({
        type: 'faceBlackLib/batchInsertBlackList',
        payload: {
          ...v,
          personId: selectedLib[0],
        },
      });
    },
    onCancel: () => {
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          batchBlackVisible: false,
        },
      });
    },
  };

  const blackListProps = {
    loading: loading.effects['faceBlackLib/queryBlackList'],
    exportLoading: loading.effects['faceBlackLib/exportBlackList'],
    pagination: {
      ...pagination,
      onChange: (page, pageSize) => {
        dispatch({
          type: 'faceBlackLib/queryBlackList',
          payload: {
            ...searchForm,
            personId: selectedLib[0],
            title: blackLibTitle,
            pageNum: String(page),
            pageSize: String(pageSize),
          },
        });
      },
    },
    dataSource: blackList,
    onSelect: (i) => {
      let list = blackList;
      list[i].check = !list[i].check;
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          blackList: list,
        },
      });
    },
    onSelectAll: () => {
      let list = blackList;
      list.forEach((o) => {
        o.check = true;
      });
      dispatch({
        type: 'faceBlackLib/updateState',
        payload: {
          blackList: list,
        },
      });
    },
    onControl: () => {
      let list = blackList.filter((o) => o.check);
      if (list.length > 1) {
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            createCarVisible: true,
            clickType: 'createFace',
            dispositionMark: '2',
            heimingdan: false,
            personId: '2',
            carBlackLibId: selectedLib,
          }
        })
      } else if (list.length === 1) {
        dispatch({
          type: 'dispatchManagement/updateState',
          payload: {
            createCarVisible: true,
            clickType: 'createFace',
            dispositionMark: '2',
            heimingdan: true,
            personId: '1',
            personName: list[0].personName,
            personSex: list[0].personSex,
            birthday: moment(list[0].birthday),
            personCertificateNum: list[0].personCertificateNum,
            faceImageAddress: list[0].faceImageAddress,
          }
        })
      } else {
        message.warning('请选择黑名单！');
      }
    },
    onDelete: () => {
      let list = [];
      blackList.forEach((o) => o.check && list.push(o.id));
      if (list.length > 0) {
        dispatch({
          type: 'faceBlackLib/deleteBlackList',
          payload: {
            id: list,
          },
        });
      } else {
        message.warning('请选择要删除的黑名单！');
      }
    },
    onExport: () => {
      dispatch({
        type: 'faceBlackLib/exportBlackList',
        payload: {
          ...searchForm,
          personId: selectedLib[0],
          title: blackLibTitle,
          pageNum: String(pagination.current),
          pageSize: String(pagination.pageSize),
        },
      });
    },
  };

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
      personId: personId,
      carBlackLibId: carBlackLibId,
      personName,
      personSex,
      birthday,
      personCertificateNum,
    },
    heimingdan,
    dispatch,
    title: "新建人脸布控任务",

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
  };

  return (
    <PageHeaderLayout {...pageHeaderProps} className={'dispatched-faceBlackLib'}>
      {createCarVisible && clickType && <CreateCarModal {...createCarModalProps} />}
      <BlackLib {...blackLibProps} />
      <SingleBlack {...singleBlackProps} />
      <BatchBlack {...batchBlackProps} />
      <Row className={style.faceBlackLib}>
        <Col span={5} className={'left-col'}>
          <BlackLibList {...blackLibListProps} />
        </Col>
        <Col span={19} className={'right-col'}>
          <Row className={'header'}>
            <h4>{blackLibTitle}&nbsp;</h4>
            <Col span={'8'}>
              <Row type={'flex'} justify={'start'}>
                <Button onClick={addSingleBlack} className={'button-space button-left'}>
                  <Icon type="plus" />添加黑名单
                </Button>
                <Button onClick={addBatchBlack} className={'button-space'}>
                  <Icon type="plus" />批量添加黑名单
                </Button>
              </Row>
            </Col>
          </Row>
          <Row className={'box'}>
            <Filter {...filterProps} />
            <BlackList {...blackListProps} />
          </Row>
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, faceBlackLib, dispatchManagement, loading }) => ({
  dispatch,
  faceBlackLib,
  dispatchManagement,
  loading,
}))(Index);
