import React from 'react';
import {Modal,Form,Input,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const PatrolModal = ({
	                     form:{
		                     getFieldDecorator,
		                     validateFields,
		                     resetFields,
		                     getFieldValue,
	                     },
	                     modalType,
	                     patrol,
	                     commitData,
	                     ...modalProps,
                     }) =>{

	const FormItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};
  const validateAutoBeginTime = (rule, value, callback) => {
    const reg = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
    if (value) {
      if (reg.test(value)) {
        callback();
      } else {
        callback('时间格式不正确');
      }
    } else {
      callback('请输入自动启动时间');
    }
  };

  const validateMinValue = (rule, value, callback) => {
    if (value) {
      if (value > 0) {
        callback();
      } else {
        callback('请输入大于0的数');
      }
    } else {
      callback('请输入间隔时间');
    }
  };

	const handleSubmit=(e)=>{
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				commitData(values);
				setTimeout(() => {
					resetFields();
				},1000)
			}
		});
	};
	return(
		<Modal {...modalProps} onOk={handleSubmit}>
			<Form onSubmit={handleSubmit}>
				<FormItem
					{...FormItemLayout}
					label='巡逻名称'
					hasFeedback
					style={{marginTop:20}}
				>
					{getFieldDecorator('yamc', {
						rules: [{
							required: true,  message: '请输入巡逻名称'
						}],
						initialValue:(patrol && modalType === 'update') ? patrol.yamc : ''
					})(
						<Input/>
					)}
				</FormItem>
				<FormItem
					{...FormItemLayout}
					label='发布类型'
					hasFeedback
					style={{marginTop:20}}
				>
					{getFieldDecorator('yafblx', {
						rules: [{
							required: true,  message: '请选择发布类型'
						}],
						initialValue:(patrol && modalType === 'update') ? patrol.yafblx : ''
					})(
						<Select>
							<Option value="1">个人预案</Option>
							<Option value="2">公共预案</Option>
						</Select>
					)}
				</FormItem>
				<FormItem
					{...FormItemLayout}
					label='默认布局'
					hasFeedback
					style={{marginTop:20}}
				>
					{getFieldDecorator('mrbj', {
						rules: [{
							required: true,  message: '请选择默认布局'
						}],
						initialValue:(patrol && modalType === 'update') ? patrol.mrbj : ''
					})(
						<Select>
							<Option value={1}>1</Option>
							<Option value={2}>4</Option>
						</Select>
					)}
				</FormItem>
				<FormItem
					{...FormItemLayout}
					label='自动启动时间'
					hasFeedback
					style={{marginTop:20}}
				>
					{getFieldDecorator('zdqdsj', {
						rules: [{
              validator: validateAutoBeginTime
						}],
						initialValue:(patrol && modalType === 'update') ? patrol.zdqdsj : ''
					})(
						<Input/>
					)}
				</FormItem>
				<FormItem
					{...FormItemLayout}
					label='间隔时间'
					hasFeedback
					style={{marginTop:20}}
				>
					{getFieldDecorator('jgsj', {
						rules: [{
              validator: validateMinValue
						}],
						initialValue:(patrol && modalType === 'update') ? patrol.jgsj : ''
					})(
						<Input/>
					)}
				</FormItem>
			</Form>
		</Modal>
	)
};
export default Form.create()(PatrolModal);
