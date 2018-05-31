/**
 * 行政区域设备树
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Tree, Badge} from 'antd';
import {Link} from 'react-router-dom';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';


const TreeNode = Tree.TreeNode;

const TestTree = ({location, app, ...treeProps}) => {
  const {treeData, onSelect, onLoadData, checkable, defaultExpandAll} = treeProps;
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
            key={item.cameraBumber}
            dataRef={item}
            icon={() => <span className={'icon-Police-t '} count={item.countTotal}
                              offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName || '无名称'}
        key={item.cameraBumber ? item.cameraBumber : item.yabh}
        dataRef={item}
        icon={() => <span className={'icon-Police-t '}
                          offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>}
      />;
    });
  };
  return (
    <div style={{}} className='areaAnd-dev'>
      <Tree
        showIcon
        defaultExpandAll={defaultExpandAll}
        checkable={checkable}
        onExpand={onExpand}
        onCheck={onCheck}
        onSelect={onSelect}
        loadData={onLoadData}
        {...treeProps}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

TestTree.propTypes = {
  location: PropTypes.object,
};

export default TestTree;
