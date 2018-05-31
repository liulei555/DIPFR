/**
 * 行政区域设备树
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree , Badge } from 'antd';
import { Link } from 'react-router-dom';

const TreeNode = Tree.TreeNode;

const AreaDeviceTree = ({ location,dispatch, app, ...treeProps }) => {
  const {treeData,onSelect, onLoadData} = treeProps;
  console.log(treeData)
  const onExpand = expandedKeys => {
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
  };
  const onCheck = (checkedKeys,e) => {
    /*dispatch({
      type:'areaDevice/updateState',
      payload:{
        deviceIds:checkedKeys.join(','),
        areaId:e.checkedNodes[0].props.dataRef.areaId
      }
    })*/
  };

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.nodeName}
            key={item.nodeId}
            dataRef={item}
            icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName && item.nodeName.length*16]}/>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName}
        key={item.nodeId}
        dataRef={item}
        icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName && item.nodeName.length*16]}/>}
      />;
    });
  };
  return (
    <div style={{}} className='areaAnd-dev'>
      <Tree
        showIcon
        onExpand={onExpand}
        onCheck={onCheck}
        onSelect={onSelect}
        loadData={onLoadData}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

AreaDeviceTree.propTypes = {
  location: PropTypes.object,
};

export default AreaDeviceTree;
