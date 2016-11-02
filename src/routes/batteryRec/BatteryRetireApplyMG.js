import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRetireApplyMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRetireApplyMG({dispatch, batteryRetireApplyMG}) {
  console.log('batteryRetireApplyMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRetireApplyMG;
  const dic = { 0: '女', 1: '男' }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRetireApplyMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRetireApplyMG/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }

  }
  const columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
      </span>
    }

  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名' }
    ]
  };

  const tableListProps = {
    curd: 'cur',
    openModal,
    tableProps: {
      data,
      columns,
      loading,
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRetireApplyMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRetireApplyMG/query',
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
        type: 'batteryRetireApplyMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRetireApplyMG/visibleState',
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

BatteryRetireApplyMG.propTypes = {
};

function mapStateToProps({batteryRetireApplyMG}) {
  return { batteryRetireApplyMG }
}
export default connect(mapStateToProps)(BatteryRetireApplyMG);
