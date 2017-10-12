import React, { Component } from 'react';
import { Modal, Form, Input,Upload,Button,Icon,message } from 'antd';
import styles from './UserModal.css';
import {API } from '../../constants';
const FormItem = Form.Item;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: null
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  handleChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.setState({
        fileList: info.fileList
      })
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    } else if (info.file.status === 'removed') {
      message.error(`${info.file.name} 移除成功.`);
    }
  };
  handleBefore = (info)=> {
    let b=true;
    if (this.state.fileList != null) {
      this.state.fileList.map(function (item) {
        if (info.name === item.name) {
          message.error(`不要上传重复文件`);
          b=false;
        }
      })
    }
    if(b==false) return false;
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website,filename } = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const file = {
      name: 'file',
      listType: 'picture',
      action: `${API}/api/users/upload`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.handleChange,
      beforeUpload: this.handleBefore,
      defaultFileList: [],
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: '请填写用户名'
                    }
                  ]
                })(<Input placeholder='用户名'/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                  rules: [
                    {
                      required: true,
                      message: '请填写邮箱'
                    }
                  ]
                })(<Input placeholder='邮箱'/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                  rules: [
                    {
                      required: true,
                      message: '不能为空'
                    }
                  ]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Photos"
            >
              {
                getFieldDecorator('filename', {
                  initialValue: filename,
                })(
                  <Upload {...file}>
                    <Button>
                      <Icon type="upload"/> Click to Upload
                    </Button>
                  </Upload>
                )
              }

            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
