import React, {PropTypes} from 'react';
import { connect } from 'dva';
import styles from './Login.less';
import { Button, Row, Form, Input } from 'antd';
import img from '../assets/login.png';

const FormItem = Form.Item

const login = ({
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
    }
  }) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({
        type:'login/login',
        payload:values
      })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={`.${img}`}/>
        <span>Ant Design</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名'
              }
            ]
          })(<Input size='large' onPressEnter={handleOk} placeholder='用户名' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              }
            ]
          })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='密码' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk}>
            登录
          </Button>
        </Row>
        <p>
          <span>账号：guest</span>
          <span>密码：guest</span>
        </p>
      </form>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object
}
function mapStateToProps(state) {
  const { status,user } = state.login;
  return {
    status,
    user
  };
}
export default connect(mapStateToProps)(Form.create()(login))
