import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecoveryProcessSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRecoveryProcessSet({dispatch, batteryRecoveryProcessSet}) {
  console.log('batteryRecoveryProcessSet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRecoveryProcessSet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRecoveryProcessSet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRecoveryProcessSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRecoveryProcessSet/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '流程编号',
    dataIndex: 'processCode',
    key: 'processCode',
  }, {
    title: '流程类型',
    dataIndex: 'processType',
    key: 'processType',
  }, {
    title: '流程名称',
    dataIndex: 'process',
    key: 'process',
  }, {
    title: '流程节点名称',
    dataIndex: 'processNode',
    key: 'processNode',
  }, {
    title: '流程节点序号',
    dataIndex: 'nodeId',
    key: 'nodeId',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a  onClick={() => openModal('edit',record)}>编辑</a>
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
     { label: '流程编号', field: 'processCode', type: 'Input' },
      { label: '流程名称', field: 'process', type: 'Input' }
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
            type: 'batteryRecoveryProcessSet/selectedRowKeysState',
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
          type: 'batteryRecoveryProcessSet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecoveryProcessSet/query',
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
        type: 'batteryRecoveryProcessSet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRecoveryProcessSet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '流程编号', field: 'processCode', type: 'Input' },
      { label: '流程类型', field: 'processType', type: 'InputNumber' },
      { label: '流程名称', field: 'process', type: 'Input' },
       { label: '流程节点名称', field: 'processNode', type: 'Input' },
      { label: '流程节点序号', field: 'nodeId', type: 'InputNumber' },
       {
        label: '状态', field: 'status', type: 'Radio', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '备注', field: 'remark', type: 'Input' }
     
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

BatteryRecoveryProcessSet.propTypes = {
};

function mapStateToProps({batteryRecoveryProcessSet}) {
  return { batteryRecoveryProcessSet }
}
export default connect(mapStateToProps)(BatteryRecoveryProcessSet);
