import React,{Component} from 'react';
import {connect} from 'dva';
import styles from './Menu.css';
import {  Menu,Icon } from 'antd';
const { SubMenu } = Menu;
import {Link } from 'react-router';
function MenuList({menu}) {
  function generateMenu(menuObj) {
    let vdom = [];
    if (menuObj instanceof Array) {
      for (var item of menuObj) {
        vdom.push(
          <SubMenu  key={item.id} title={<Link to={item.url}>{item.name}</Link>}>
            {generateMenu(item.children)}
          </SubMenu>
        )
      }
    }
    return vdom;
  }

  function tree(id, data) {
    let children = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].pid == id) {
        data[i].children = tree(data[i].id, data);
        children.push(data[i]);
      }
    }
    return children;
  }
  const result = tree(0, menu);
  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['1']}
      style={{ height: '100%' }}
    >
      {generateMenu(result)}
    </Menu>
  );
}
function mapStateToProps(state) {
  const {menu}=state.login;
  return {
    menu
  }
}
export default connect(mapStateToProps)(MenuList);
