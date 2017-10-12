import React from 'react';
import { connect } from 'dva';
import styles from './Main.css';
import LayoutComponent from '../components/MainLayout/Layout';
import UsersComponent from '../components/Users/Users';


function MainLayout() {
  return (
    <LayoutComponent>
      <UsersComponent/>
    </LayoutComponent>
  );
}
export default MainLayout;
