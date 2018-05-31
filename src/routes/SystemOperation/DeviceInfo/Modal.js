import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal,Tree , Badge } from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const modal = ({
  item = {},
  onOk,
  onSelectTree,
  treeData,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  ...modalProps
}) => {
  console.log(treeData)
  const handleOk = (e) => {
    e.preventDefault();
    validateFields(errors => {
      if (errors) {
        return;
      }
      //清空提示信息
      const data = {
        ...getFieldsValue(),
      };
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
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
    <Modal {...modalOpts} footer={null}>
      <Tree
        showIcon
        onSelect={onSelectTree}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </Modal>
  );
};

modal.propTypes = {
};
export default Form.create()(modal);
