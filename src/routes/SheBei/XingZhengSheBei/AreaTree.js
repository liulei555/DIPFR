/**
 * Created by zhangzn on 2017/10/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree , Badge } from 'antd';
import { Link } from 'react-router-dom';

const TreeNode = Tree.TreeNode;

const AreaTree = ({ location, app, ...treeProps }) => {
  const {treeData,onSelect, onLoadData} = treeProps;
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
            title={item.nodeName}
            key={item.nodeId}
            dataRef={item}
            icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName.length*16]}/>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName}
        key={item.nodeId}
        dataRef={item}
        icon={() => <Badge count={item.countTotal} offset={[-10,item.nodeName.length*16]}/>}
        />;
    });
  };
  return (
    <div style={{}} className='areaAnd-dev'>
      <Tree
        showIcon
        defaultExpandAll = {true}
        checkable
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

AreaTree.propTypes = {
  location: PropTypes.object,
};

export default AreaTree;
