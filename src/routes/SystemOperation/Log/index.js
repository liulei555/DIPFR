/**
 * 日志
 */
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Button, Card, Col, Row, Input} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {headhildMenu} from '../../../common/menu';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import style from './index.less';

let pageObj = {
  current: 1,
  pageSize: 10
};
const index = ({dispatch, log, loading}) => {
  const {dataSource, pagination, treeData, childData, synctime, modalVisible, selectValues} = log;

  const pageHeaderProps = {
    // tabList: headhildMenu.systemOperation,
    menuList: headhildMenu.systemOperation,
  }

  const listProps = {
    dataSource,
    pagination,
    onChange(page) {
      //pageObj = page
      debugger
      console.log(selectValues);
      dispatch({
        type: 'log/query',
        payload: {
          pageNum: String(page.current),
          pageSize: String(page.pageSize),
          userName: selectValues ? selectValues.userName : '',
          logType: selectValues ? selectValues.logType : '',
          ip: selectValues ? selectValues.ip : '',
        },
      })
    },
  };

  const filterProps = {
    dispatch,
    search(values) {
      console.log(values);
      dispatch({
        type: 'log/query',
        payload: {
          pageNum: String(pageObj.current),
          pageSize: String(pageObj.pageSize),
          ...values
        }
      })
      dispatch({
        type: 'log/updateState',
        payload: {
          selectValues: values
        }
      })
    },
    syncCache(values) {
      console.log('同步缓存')
      let time = 60

      function setsynctime(time) {
        time--;
        dispatch({
          type: 'log/updateState',
          payload: {
            synctime: time
          }
        })
        if (time < 1) return
        setsynctime(time)
      }

      setsynctime(time)
    }
  };

  const treeProps = {
    treeData,
    selectedKeys: [],
    defaultExpandParent: true,

    onSelect(node, e) {
      if (e.selected) {
        console.log(e)
      }
    },
    onRightClick(e, node) {
      console.log(e)
      console.log(node)
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        dispatch({
          type: 'log/queryTree',
          payload: {
            resolve,
            areaId: treeNode.props.dataRef.nodeId,
            userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') :'',

          },
        });
      }).then((res) => {
        console.log(res)
        if (res) {
          treeNode.props.dataRef.children = res
          console.log(treeData)
          dispatch({
            type: 'log/updateState',
            payload: {
              treeData: [...treeData],
            },
          })
        }
      });
    },
  };

  const modalProps = {
    visible: modalVisible || false,
    maskClosable: false,
    title: '新增节点',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      console.log(data)
      modalProps.onCancel()
    },
    onCancel() {
      dispatch({
        type: 'log/updateState',
        payload: {
          modalVisible: false
        }
      })
    },
  };

  const addNode = () => {
    console.log('add')
    dispatch({
      type: 'log/updateState',
      payload: {
        modalVisible: true
      }
    })
  }

  return (
    <PageHeaderLayout {...pageHeaderProps} className="systemOperation-log">
      <Row>
        <Col span={24}>
          <Card>
            <Filter {...filterProps} />
            <List {...listProps} />
          </Card>
        </Col>
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({dispatch, log, loading}) => ({
  dispatch,
  log,
  loading,
}))(index);
