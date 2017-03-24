import React, { Component } from 'react';
import { Upload, Icon, message, Modal, Button } from 'antd'
import { remove } from '../../services/uploadFile';
import url from '../../services/api';

class UpFile extends Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      responseName: '',
      uid: -1
    }
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.removeImg = this.removeImg.bind(this);
  }

  componentWillMount() {
    const { form, linkField } = this.props;
    if (form.getFieldValue(linkField)) {
      this.setState({
        fileList: [{
          uid: -1,
          status: 'done',
          url: url + '/upload/image/' + form.getFieldValue(linkField)
        }]
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { form, linkField } = nextProps;
    if (form.getFieldValue(linkField)) {
      this.setState({
        fileList: [{
          uid: this.state.uid || -1,
          status: 'done',
          url: url + '/upload/image/' + form.getFieldValue(linkField)
        }]
      })
    } else {
      this.setState({
        fileList: []
      })
    }
  }

  onChange(info) {
    const { form, linkField } = this.props;
    if (info.file.status === 'uploading') {
      console.log('------uploading')
    } else if (info.file.status === 'done') {
      console.log('---------done')
      this.state.responseName = info.fileList[0].response;
      const newState = {};
      newState[linkField] = info.fileList[0].response;
      form.setFieldsValue(newState);
    } else if (info.file.status === 'error') {
      console.log('----------error')
      message.error(`${info.file.name} file upload failed.`);
    } else if (info.file.status === 'removed') {
      console.log('----------removed')
      this.removeImg();
    }

    this.setState({
      fileList: info.fileList,
      uid: info.fileList.length > 0 ? info.fileList[0].uid : -1
    })
  }
  async removeImg() {
    const data = await remove({ url: this.state.responseName })
    if (data === 'success') {
      const { form, linkField } = this.props;
      const newState = {};
      newState[linkField] = '';
      form.setFieldsValue(newState);
    } else {
      message.error('删除失败！');
    }
  }
  handleCancel() {
    this.setState({ previewVisible: false })
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  render() {
    console.log('UpFile')
    const { batsCode, disabled } = this.props;
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">图片上传</div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          disabled={disabled}
          action={url + "/fileUpload/fileUpload"}
          listType="picture-card"
          onPreview={this.handlePreview}
          onChange={this.onChange}
          fileList={fileList}
          data={{ fileType: 'jpg', batsCode }}
        >
          {fileList.length === 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

UpFile.defaultProps = {
  disabled: true
}
export default UpFile;
