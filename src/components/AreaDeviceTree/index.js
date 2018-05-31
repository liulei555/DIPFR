/**
 * 行政区域设备树
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Tree, Badge} from 'antd';
import {Link} from 'react-router-dom';

const TreeNode = Tree.TreeNode;

const AreaDeviceTree = ({location, app, ...treeProps}) => {
  const {treeData, onSelect, onLoadData, checkable, defaultExpandAll} = treeProps;
  console.log(treeData, 'treeData');
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
            title={item.countTotal ? `${item.nodeName}[${item.countTotal}|${item.countNormal}|${item.countFault}]` : item.nodeName || '无名称'}
            key={item.nodeId}
            dataRef={item}
            icon={() => {
              return item.deviceNumber ?
                <span className={'icon-Police-t icon-Road'}
                      offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe901;</span> :
                <span className={'icon-Police-t icon-Road'}
                      offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>
            }}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.countTotal ? `${item.nodeName}[${item.countTotal}|${item.countNormal}|${item.countFault}]` : item.nodeName || '无名称'}
        key={item.nodeId}
        dataRef={item}
        icon={() => {
          {
            return item.deviceNumber ?
              <span className={'icon-Police-t icon-Road'}
                    offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe901;</span> :
              <span className={'icon-Police-t icon-Road'}
                    offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>
          }
        }}
      >
      </TreeNode>
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
