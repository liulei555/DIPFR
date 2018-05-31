import React from 'react';
import PropTypes from 'prop-types';
import {TreeSelect, Badge} from 'antd';
// import {ContextMenuTrigger } from "react-contextmenu";
// import ContextMenuList from './ContextMenuList'
const TreeNode = TreeSelect.TreeNode;

const AreaTree = ({location, app, ...treeProps}) => {
  const {treeData, onSelect, onLoadData, checkable, defaultExpandAll, value} = treeProps;
  const onExpand = expandedKeys => {
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
  };
  const onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
  };

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.nodeName || '无名称'}
            key={item.nodeId}
            dataRef={item}
            icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName && item.nodeName.length * 16]}/>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName || '无名称'}
        key={item.nodeId}
        dataRef={item}
        icon={() => <Badge count={item.countTotal} offset={[-10, item.nodeName && item.nodeName.length * 16]}/>}
      />;
    });
  };
  return (
    <div style={{}} className='areaAnd-dev'>
      <TreeSelect
        showIcon
        multiple={true}
        defaultExpandAll={defaultExpandAll}
        checkable={checkable}
        onExpand={onExpand}
        onCheck={onCheck}
        onSelect={onSelect}
        loadData={onLoadData}
      >
        {renderTreeNodes(treeData)}
      </TreeSelect>
    </div>
  );
};

AreaTree.propTypes = {
  location: PropTypes.object,
};

export default AreaTree;
