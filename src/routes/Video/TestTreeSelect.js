import React from 'react';
import {TreeSelect} from 'antd';

const {TreeNode} = TreeSelect
const TestTree = ({...treeProps}) => {
  console.log(treeProps)
  const {treeData, onSelect, onLoadData, checkable, defaultExpandAll, treeVal, onChange} = treeProps;
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
    <TreeSelect
      showSearch
      style={{width: 300}}
      value={treeVal}
      dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
      placeholder="Please select"
      allowClear
      onChange={onChange}
      onSelect={onSelect}
      onCheck={onCheck}
      treeCheckable={true}
      showCheckedStrategy={TreeSelect.SHOW_CHILD}
    >
      {renderTreeNodes(treeData)}
    </TreeSelect>
  );
};
export default TestTree;
