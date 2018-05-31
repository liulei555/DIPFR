import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Filter from './Filter';
import AlarmList from './AlarmList';
import { headhildMenu } from '../../common/menu';
import { Row, Col } from 'antd';
import Modal from './Modal';
import style from './index.less';
import { message } from 'antd/lib/index';

const faceAlarm = ({ dispatch, faceAlarm, loading }) => {

  const pageHeaderProps = {
    menuList: headhildMenu.dispatchedAlarm,
  };

  const { modalVisible, pagination } = faceAlarm;

  const listProps = {
    loading: loading.effects['faceBlackLib/queryBlackList'],
    exportLoading: loading.effects['faceBlackLib/exportBlackList'],
    pagination: {
      ...pagination,
      onChange: (page,pageSize) => {
        /*dispatch({
          type: 'faceBlackLib/queryBlackList',
          payload: {
            ...searchForm,
            personId: selectedLib[0],
            title: blackLibTitle,
            pageNum: String(page),
            pageSize: String(pageSize),
          },
        });*/
      },
    },
    dataSource: [{personName:'密码'},{personName:'密码2'},{personName:'密码3'},{personName:'密码3'},{personName:'密码3'},{personName:'密码3'}],
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

  const modalProps = {
    title: '手机Mac布控告警详细信息',
    visible: modalVisible,
    onCancel() {
      dispatch({
        type: 'mobileMac/hideModal',
      });
    },
  };

  const filterProps = {
    onSearch: (v) =>{

    }
  };

  return (
    <PageHeaderLayout {...pageHeaderProps}>
      <Row className={style.faceAlarm}>
        <Filter {...filterProps}/>
        <AlarmList {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Row>
    </PageHeaderLayout>
  );
};

export default connect(({ dispatch, faceAlarm, loading }) => ({
  dispatch,
  faceAlarm,
  loading,
}))(faceAlarm);
