import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecoveryRecord.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRecoveryRecord({dispatch, batteryRecoveryRecord}) {
  console.log('batteryRecoveryRecord')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRecoveryRecord;
  const dic = { 0: '女', 1: '男' }
  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRecoveryRecord/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRecoveryRecord/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryRecoveryRecord/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryRecoveryRecord/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }

    }

  }
  const columns = [{
    title: '上传信息名称',
    dataIndex: 'infoName',
    key: 'infoName',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '上传内容',
    dataIndex: 'infoContent',
    key: 'infoContent',
  }, {
    title: '上传时间',
    dataIndex: 'uploadTime',
    key: 'uploadTime',
  }, {
    title: '上传状态',
    dataIndex: 'uploadStatus',
    key: 'uploadStatus',
  }, {
    title: '上传次数',
    dataIndex: 'uploadNum',
    key: 'uploadNum',
  }];
  const searchFormProps = {
    handleSearch: null,
   forms: [
      { label: '上传信息名称', field: 'infoName', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    tableProps: {
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'batteryRecoveryRecord/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRecoveryRecord/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecoveryRecord/query',
          args: {
            current
          }
        })
      },
    }
  };
  const modalcusProps = {
    visible,
    record,
    title: modalType === 'add' ? '新增数据' : '编辑数据',
    onOk() {
      dispatch({
        type: 'batteryRecoveryRecord/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRecoveryRecord/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '用户名', field: 'name', type: 'Input' },
      { label: '年龄', field: 'age', type: 'InputNumber' },
      { label: '地址', field: 'address', type: 'Input' },
      {
        label: '性别', field: 'sex', type: 'Radio', dic: [
          { name: '男', value: 1 },
          { name: '女', value: 0 }
        ]
      }
    ]
  }
  const NewModalcus = () =>
    <Modalcus {...modalcusProps} />;

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <NewModalcus />
    </div>
  );
}

BatteryRecoveryRecord.propTypes = {
};

function mapStateToProps({batteryRecoveryRecord}) {
  return { batteryRecoveryRecord }
}

export default connect(mapStateToProps)(BatteryRecoveryRecord);
