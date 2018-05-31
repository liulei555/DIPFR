import React, {Component} from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {connect} from 'dva';
import {Input, Form, Tree, Card, Button, Table, Row, Col,Menu} from 'antd';
import style from './less/user.less'

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const UserTable = ({
                     form: {
                       getFieldDecorator,
                       getFieldsValue,
                       setFieldsValue,
                       validateFields,
                       resetFields,
                       validateFieldsAndScroll,
                     },
                     ...userProps
                   }) => {
  const {title,columns,rowSelection,addRole,userData,deleteRole,editRole}=userProps
  return (
    <Card title={title}>
      {/*<Form layout="inline">*/}
        {/*<FormItem>{getFieldDecorator('userName', {})(<Input placeholder="角色名称"/>)}</FormItem>*/}
        {/*<FormItem>{getFieldDecorator('userNum', {})(<Input placeholder="角色编号"/>)}</FormItem>*/}
        {/*<FormItem>*/}
          {/*<Button type="primary" htmlType="submit">*/}
            {/*搜索角色*/}
          {/*</Button>*/}
        {/*</FormItem>*/}
      {/*</Form>*/}
      <div className={style.action}>
        <Button type="primary" onClick={addRole} className={style.actionBtn}>
          添加
        </Button>
        <Button type="primary" onClick={editRole} className={style.actionBtn}>
          编辑
        </Button>
        <Button type="primary" onClick={deleteRole}>
          删除
        </Button>
      </div>
      <Table columns={columns} bordered rowSelection={rowSelection} rowKey={(item)=>item.id} dataSource={userData}/>
    </Card>
  );
};
export default Form.create()(UserTable);
