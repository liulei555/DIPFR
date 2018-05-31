import React from 'react';
import {Input, Button, Form} from 'antd';
import './less/filter.less'

const FormItem = Form.Item;
const Scenes = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  savaPublicScene,
                  savePrivateScene
                }) => {
  return (
    <Form layout="inline" id="scene">
      <FormItem className="firstItem">
        {getFieldDecorator('scenesType', {})(
          <Input/>
        )}
      </FormItem>
      <FormItem className="secondItem">
        {getFieldDecorator('private', {})(
          <Button onClick={savePrivateScene}>保存为私有场景</Button>
        )}
      </FormItem>
      <FormItem className="secondItem">
        {getFieldDecorator('public', {})(
          <Button onClick={savaPublicScene}>保存为公共场景</Button>
        )}
      </FormItem>
    </Form>
  )
};

export default Form.create()(Scenes);
