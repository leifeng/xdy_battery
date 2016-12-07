import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecoverySet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRecoverySet({dispatch, batteryRecoverySet}) {
  console.log('batteryRecoverySet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRecoverySet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRecoverySet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRecoverySet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRecoverySet/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '企业种类',
    dataIndex: 'companyType',
    key: 'companyType',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '企业编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '电池种类',
    dataIndex: 'batKind',
    key: 'batKind',
  }, {
    title: '费用名称',
    dataIndex: 'feeName',
    key: 'feeName',
  }, {
    title: '费用值',
    dataIndex: 'feeValue',
    key: 'feeValue',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '企业种类', field: 'companyType', type: 'Input' },
      {
        label: '企业编号', field: 'companyId', type: 'Input'
      },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      
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
            type: 'batteryRecoverySet/selectedRowKeysState',
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
          type: 'batteryRecoverySet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecoverySet/query',
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
        type: 'batteryRecoverySet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRecoverySet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '企业种类', field: 'name', type: 'Input' },
      { label: '企业编号', field: 'age', type: 'InputNumber' },
      { label: '电池种类', field: 'address', type: 'Input' },
	  { label: '费用名称', field: 'name', type: 'Input' },
      { label: '费用值', field: 'age', type: 'InputNumber' },
      {
        label: '状态', field: 'sex', type: 'Radio', dic: [
          { name: '不可用', value: 0 },
          { name: '可用', value: 1 }
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

BatteryRecoverySet.propTypes = {
};

function mapStateToProps({batteryRecoverySet}) {
  return { batteryRecoverySet }
}
export default connect(mapStateToProps)(BatteryRecoverySet);
