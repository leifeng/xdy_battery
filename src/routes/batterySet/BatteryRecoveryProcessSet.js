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
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '流程编号',
    dataIndex: 'Process_code',
    key: 'age',
  }, {
    title: '流程类型',
    dataIndex: 'process_type',
    key: 'sex',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '流程名称',
    dataIndex: 'Process',
    key: 'address',
  }, {
    title: '流程节点名称',
    dataIndex: 'Process_node',
    key: 'address',
  }, {
    title: '流程节点序号',
    dataIndex: 'Node_id',
    key: 'address',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }, {
    title: '修改时间',
    dataIndex: 'editTime',
    key: 'editTime',
  }, {
    title: '修改人',
    dataIndex: 'editor',
    key: 'editor',
  }, {
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
      { label: '用户名' }
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

BatteryRecoveryProcessSet.propTypes = {
};

function mapStateToProps({batteryRecoveryProcessSet}) {
  return { batteryRecoveryProcessSet }
}
export default connect(mapStateToProps)(BatteryRecoveryProcessSet);
