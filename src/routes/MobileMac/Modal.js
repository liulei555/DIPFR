import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal, Menu, Form, Row, Col, Radio, Button, Input} from 'antd'
import styles from './model.less'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const confirm = Modal.confirm;
const FormItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};


const DetailModal = ({
	                     form:{
		                     getFieldDecorator,
		                     validateFields,
		                     resetFields,
		                     getFieldValue,
	                     },
	                     preOne,
	                     nextOne,
	                     update,
	                     ...modalProps
                     }) => {
	 const handleSubmit=(e)=>{
	 	e.preventDefault();
	 	validateFields((err, values) => {
	 		if (!err) {
	 			update(values);
	 			setTimeout(() => {
	 				resetFields();
	 			},1000)
	 		}
	 	});
	 };
	const {currentItem,preButtonType,nextButtonType} = modalProps;
	return (
		<div className={styles.detailModal}>
			<Modal {...modalProps} width={1100} footer={null}>
				<Form>
					<Row>
						<Col span={10}>
							<Row>
								<FormItem
									{...FormItemLayout}
									label='手机串号(IMSI)'
								>
									{getFieldDecorator('phoneImsi', {
										rules: [{
											required: true,  message: ''
										}],
										initialValue:currentItem && currentItem.phoneImsi ? currentItem.phoneImsi : ''
									})(
										<Input disabled/>
									)}
								</FormItem>
							</Row>
							<Row>
								<FormItem
									{...FormItemLayout}
									label='手机MAC地址'
								>
									{getFieldDecorator('phoneMac', {
										rules: [{
											required: true,  message: ''
										}],
										initialValue:currentItem && currentItem.phoneMac ? currentItem.phoneMac : ''
									})(
										<Input disabled/>
									)}
								</FormItem>
							</Row>
							<Row>
								<FormItem
									{...FormItemLayout}
									label='站点编号'
								>
									{getFieldDecorator('siteNumber', {
										rules: [{
											required: true,  message: ''
										}],
										initialValue:currentItem && currentItem.siteNumber ? currentItem.siteNumber : ''
									})(
										<Input disabled/>
									)}
								</FormItem>
							</Row>
							<Row>
								<FormItem
									{...FormItemLayout}
									label='行驶方向'
								>
									{getFieldDecorator('drivingDirection', {
										rules: [{
											required: true,  message: ''
										}],
										initialValue:currentItem && currentItem.drivingDirection ? currentItem.drivingDirection : ''
									})(
										<Input disabled/>
									)}
								</FormItem>
							</Row>
						</Col>
						<Col span={13}>
							<FormItem
								{...FormItemLayout}
								label='疑似车辆(匹配次数)'
							>
								{getFieldDecorator('suspectedVehicle', {
									rules: [{
										required: true,  message: ''
									}],
									initialValue:currentItem && currentItem.suspectedVehicle ? currentItem.suspectedVehicle : ''
								})(
									<TextArea disabled/>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<FormItem
							{...FormItemLayout}
							label='处理意见'
							style={{marginLeft:-203}}
						>
							{getFieldDecorator('processingOpinion',{
								initialValue:currentItem && currentItem.processingOpinion ? currentItem.processingOpinion : ''
								}
							)(
								<TextArea/>
							)}
						</FormItem>
					</Row>
					<Row>
						<Col span={8}>
							<FormItem
								{...FormItemLayout}
								label='处理结果'
								style={{textAlign:'left'}}
							>
								{getFieldDecorator('processingResult', {
									rules: [{
										required: true,  message: ''
									}],
									initialValue:currentItem && currentItem.processingResult ? currentItem.processingResult : ''
								})(
									<RadioGroup>
										<Radio value='0'>已处理</Radio>
										<Radio value='1'>未处理</Radio>
									</RadioGroup>
								)}
							</FormItem>
						</Col>
						<Col span={4} offset={4}>
							<Button type='primary' onClick={handleSubmit}>提交</Button>
						</Col>
					</Row>
					<Row>
						<div style={{textAlign:'center'}}>
							<Button>手机MAC轨迹</Button>
							<Button style={{marginLeft:7}}>一车一档</Button>
							<Button style={{marginLeft:7}} disabled={preButtonType} onClick={preOne}>上一条</Button>
							<Button style={{marginLeft:7}} disabled={nextButtonType} onClick={nextOne}>下一条</Button>
						</div>
					</Row>
				</Form>
			</Modal>
		</div>
	)
};

export default Form.create()(DetailModal);
