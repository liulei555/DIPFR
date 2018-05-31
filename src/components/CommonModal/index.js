import {Modal, Form, Input} from 'antd'

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
};
const FormItem = Form.Item;

const CommonModal = ({
                       form: {
                         getFieldDecorator,
                         getFieldsValue,
                         setFieldsValue,
                         validateFields,
                         resetFields,
                         validateFieldsAndScroll,
                       },
                       ...modalProps
                     }) => {
  const {formItemData, onSubmit} = modalProps;
  const formSubmit = () => {
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      };
      onSubmit(data);
      resetFields();
    });
  }
  return (
    <Modal {...modalProps} onOk={formSubmit}>
      <Form onSubmit={formSubmit}>
        {formItemData && formItemData.map((ele, index) => {
          return (
            <FormItem {...formItemLayout} label={ele.label} hasFeedback key={`formItem-${index}`}>
              {getFieldDecorator(`${ele.title}`, {
                rules: [{required: true, message: `请输入${ele.label}`}],
                initialValue: ele.val||""
              })(
                <Input readOnly={ele.readOnly || false} maxLength={20} placeholder={`请输入${ele.label}`}/>
              )}
            </FormItem>
          )
        })}
      </Form>
    </Modal>
  )
}

export default Form.create()(CommonModal)
