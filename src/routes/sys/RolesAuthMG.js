import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './RolesAuthMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function RolesAuthMG({dispatch, rolesAuthMG}) {
  console.log('RolesAuthMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = rolesAuthMG;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'rolesAuthMG/remove',
      id
    })
  }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'rolesAuthMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'rolesAuthMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'rolesAuthMG/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }
    }
  }
  const columns = [{
    title: '角色编号',
    dataIndex: 'roleId',
    key: 'roleId',
  }, {
    title: '功能界面编号',
    dataIndex: 'functionId',
    key: 'functionId',
  }, {
    title: '权限编号',
    dataIndex: 'rightIds',
    key: 'rightIds',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
      { label: '角色编号', field: 'roleId', type: 'Input' },
      { label: '功能界面编号', field: 'functionId', type: 'Input' },
      { label: '权限编号', field: 'rightIds', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      }
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
            type: 'rolesAuthMG/selectedRowKeysState',
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
          type: 'rolesAuthMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'rolesAuthMG/query',
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
        type: 'rolesAuthMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'rolesAuthMG/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '角色编号', field: 'roleId', type: 'Input' },
      { label: '功能界面编号', field: 'functionId', type: 'Input' },
      { label: '权限编号', field: 'rightIds', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '备注', field: 'remark', type: 'TextArea' }
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

RolesAuthMG.propTypes = {
};

function mapStateToProps({rolesAuthMG}) {
  return { rolesAuthMG }
}
export default connect(mapStateToProps)(RolesAuthMG);
