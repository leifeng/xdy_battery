import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './AuthMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function AuthMG({dispatch, authMG, menus}) {
  console.log('权限管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = authMG;
  const menuLeaf = menus.menuLeaf ? menus.menuLeaf[location.pathname] : [];

  function onDeleteItem(id) {
    dispatch({
      type: 'authMG/remove',
      id
    })
  }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'authMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'authMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'authMG/openModalState',
          data: type
        })
      }

    }

  }

  const columns = [{
    title: '权限名称',
    dataIndex: 'rightName',
    key: 'rightName'
  }, {
    title: '权限类型',
    dataIndex: 'rightType',
    key: 'rightType'
  }, {
    title: '对应菜单或功能操作ID',
    dataIndex: 'operateId',
    key: 'operateId'
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {menuLeaf.indexOf('update') !== -1 ? <span><a onClick={() => openModal('edit', record)}>编辑</a><span className="ant-divider" /></span> : null}
        {menuLeaf.indexOf('delete') !== -1 ? <span><Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}><a>删除</a></Popconfirm><span className="ant-divider" /></span> : null}
      </span>
    ),
  }];
  const searchFormProps = {
    handleChange(query) {
      dispatch({
        type: 'authMG/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'authMG/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'authMG/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '权限名称', field: 'rightName', type: 'Input' },
      { label: '权限类型', field: 'rightType', type: 'Input' },
      { label: '对应菜单或功能操作ID', field: 'operateId', type: 'Input' }
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    deleteForids() {
      dispatch({
        type: 'authMG/removeIds'
      })
    },
    auth: menuLeaf,
    tableProps: {
      rowKey: 'id',
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'authMG/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
    },
    pageProps: {
      pageNo,
      pageSize,
      total,
      onChange(current) {
        dispatch({
          type: 'authMG/query',
          args: {
            pageNo: current
          }
        })
      },
    }
  };
  const modalcusProps = {
    alertState,
    modalLoading,
    modalType,
    visible,
    record,
    title: modalType === 'add' ? '新增数据' : '编辑数据',
    onSave(data) {
      if (modalType === "add") {
        dispatch({
          type: 'authMG/create',
          args: data
        })
      } else {
        dispatch({
          type: 'authMG/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'authMG/closeModalState',
      })
    },
    modalForms: [
      { label: '权限名称', field: 'rightName', type: 'Input' },
      { label: '权限类型', field: 'rightType', type: 'Input' },
      { label: '对应菜单或功能操作ID', field: 'operateId', type: 'Input' },
      { label: '备注', field: 'remark', type: 'TextArea' }
    ]
  }
  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />;
    </div>
  );
}

AuthMG.propTypes = {
};

function mapStateToProps({authMG, menus}) {
  return { authMG, menus }
}
export default connect(mapStateToProps)(AuthMG);
