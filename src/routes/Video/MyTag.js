import React from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Row, Input, Tabs, Table, Form, Tag } from 'antd';
import './less/index.less';

const CheckableTag = Tag.CheckableTag;
const MyTag = ({ dispatch, video, loading }) => {
  const { tagsFromServer } = video;
  return (<div className={`innerPadding tagBox`}>
    <h4>标签</h4>
    <div className="tag">
      <CheckableTag>
        <h6>全部</h6>
      </CheckableTag>
      {tagsFromServer.map(tag => (
        <CheckableTag
          key={tag.label}
          checked={tag.checked}
          onChange={checked => {
            checked = !checked;
            console.log(checked, 'checked');
          }}
        >
          {tag.label}
        </CheckableTag>
      ))}
    </div>
  </div>);
};

export default connect(({ dispatch, video, loading }) => ({
  dispatch,
  video,
  loading,
}))(MyTag);
