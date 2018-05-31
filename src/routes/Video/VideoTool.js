import React from 'react';
import {Icon} from 'antd';
import './less/tool.less';

const VideoTool = ({dispatch, controlFlag}) => {
  const changeControl = () => {
    dispatch({
      type: 'video/updateState',
      payload: {
        controlFlag: !controlFlag,
      }
    })
  };
  return (
    <div className="toolZone">
      <ul>
        <li className="tool">
          <span className="toolIcon icon-Police-t">&#xe907;</span>
        </li>
      </ul>
    </div>
  )
};

export default VideoTool;
