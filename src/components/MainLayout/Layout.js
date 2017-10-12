import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon,Row, Col } from 'antd';
import {Link } from 'react-router';
import styles from './Layout.css';
import MenuList from '../Menu/Menu';
import UsersComponent from '../Users/Users';

const { Header, Content, Footer, Sider } = Layout;

function MainLayout({dispatch,children}) {
  let username = sessionStorage.getItem('username');
  let status = sessionStorage.getItem('status');
  if (username == null || status == false) {
    //非法进入
    dispatch({
      type: 'login/unlogin',
      payload:{}
    })
  }
  function logout(){
    dispatch({
      type: 'login/logout',
      payload:{}
    })
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            Logo
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Row>
            <Col span={12}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
              <span>欢迎您！</span>&nbsp;&nbsp;
              <span>{username}</span>
              <a onClick={logout}>登出</a>
            </Col>
          </Row>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <MenuList>
            </MenuList>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  );
}
function mapStateToProps(state) {
  const { status,user } = state.login;
  return {
    status,
    user
  };
}
export default connect(mapStateToProps)(MainLayout);
