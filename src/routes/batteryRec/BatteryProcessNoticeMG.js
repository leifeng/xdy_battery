import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryProcessNoticeMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryProcessNoticeMG({dispatch, batteryProcessNoticeMG}) {
  console.log('BatteryProcessNoticeMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryProcessNoticeMG;
  const dic = { 0: '女', 1: '男' }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryProcessNoticeMG/recordState',
        data: {
          modalType: type,
          record
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
    curd: 'ur',
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
          type: 'batteryProcessNoticeMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryProcessNoticeMG/query',
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
        type: 'batteryProcessNoticeMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryProcessNoticeMG/visibleState',
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

BatteryProcessNoticeMG.propTypes = {
};

function mapStateToProps({batteryProcessNoticeMG}) {
  return { batteryProcessNoticeMG }
}
export default connect(mapStateToProps)(BatteryProcessNoticeMG);
