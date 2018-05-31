import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, DatePicker, Button, Row,Select,Col,Icon,Modal,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm
const Filter = ({
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                    resetFields,
                    validateFieldsAndScroll,
                  },
                  onSearch,
                  onDeleteItem,
                  selectdBalckList,
                }) => {

  const color = {'':'全部','1':'蓝色','2':'黑色','3':'白色','4':'绿色','5':'黄色'};
  const pro = ["全部","京","浙","津","皖","沪","闽","渝","赣","港","鲁","澳","豫","蒙","鄂","新","湘","宁","粤","藏","琼","桂","川","冀","黔","晋","云","辽","陕","吉","甘","黑","青","苏","台"];
  const options = Object.keys(color).map((key)=>(
    <Option value={key} key={key}>{color[key]}</Option>
  ));
  const provinceOptions = pro.map(pro => <Option key={pro}>{pro}</Option>);
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  };
  const mutiDelItem=()=>{
    if(selectdBalckList && selectdBalckList.length>=1){
      confirm({
        title: '删除',
        content:'记录删除后不可恢复！',
        onOk () {
          onDeleteItem()
        },
      })
    }else{
      message.warning('请选择一条数据！')
    }
  }
  return (<Row>

    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem label="号牌号码：" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {getFieldDecorator('vehicleBrandNum', {initialValue:'全部'})(
          <Select style={{ width: 100 }}>{provinceOptions}</Select>
        )}
      </FormItem>
      <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span:24 }} >
        {getFieldDecorator('vehicleBrandNum1', {})(
          <Input placeholder="号牌号码"/>
        )}
      </FormItem>
      <FormItem label="号牌颜色：" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        {getFieldDecorator('vehiclePlateColor',{
          initialValue:""
        })
        (<Select style={{ width: 120 }}>{options}</Select>)}
      </FormItem>
      <FormItem label="" labelCol={{ span: 24 }} wrapperCol={{ span: 0 }}>
        <Button type="primary" htmlType="submit" className={'button-space-large'}>
          <Icon type="search" />搜索
        </Button>
      </FormItem>
    </Form>
  </Row>);
};

Filter.propTypes = {
  onSearch: PropTypes.func,
};

export default Form.create()(Filter);
