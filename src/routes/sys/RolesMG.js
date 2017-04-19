import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './RolesMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';
import AuthModal from '../../components/AuthModal';
import { checkRoleName } from '../../services/rolesMG';
import { getList, getName } from '../../utils/dicFilter';

function RolesMG({ dispatch, rolesMG, dictionary, menus }) {
  console.log('角色管理')
  const { selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery, authModalVisible, checkedKeys, checkedAllKeys, roleName } = rolesMG;
  const { allData } = dictionary
  const { dataTree } = menus
  const menuLeaf = menus.menuLeaf ? menus.menuLeaf[location.pathname] : [];
  let t = -1;
  const StatusDic = getList(allData, 'Status');

  function onDeleteItem(id) {
    dispatch({
      type: 'rolesMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'rolesMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'rolesMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'rolesMG/openModalState',
          data: type
        })
      }
    }
  }
  function authSelect(roleid, roleName) {
    dispatch({
      type: 'rolesMG/queryAuthbyRoleId',
      args: {
        roleid,
        roleName
      }
    })
  }
  const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return getName(StatusDic, text)
    }
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
        {menuLeaf.indexOf('distribution') !== -1 ? <span><a onClick={() => authSelect(record.id, record.remark)} >分配程序权限</a><span className="ant-divider" /></span> : null}
      </span>
    ),
  }];
  const searchFormProps = {
    searchQuery,
    handleChange(query) {
      dispatch({
        type: 'rolesMG/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'rolesMG/query',
        args: {
          pageNo: 1
        }
      });
    },
    handleResetQuery() {
      dispatch({
        type: 'rolesMG/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '角色名称', field: 'roleName', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Select', dic: StatusDic
      }
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    deleteForids() {
      dispatch({
        type: 'rolesMG/removeIds'
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
            type: 'rolesMG/selectedRowKeysState',
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
          type: 'rolesMG/query',
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
      if (modalType === 'add') {
        dispatch({
          type: 'rolesMG/create',
          args: data
        })
      } else {
        dispatch({
          type: 'rolesMG/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'rolesMG/closeModalState'
      })
    },
    modalForms: [
      {
        label: '角色名称', field: 'roleName', type: 'Input', rules: [
          { required: true, message: '请输入角色名称' },
          { required: true, message: '角色名称长度为1~20', min: 1, max: 20 },
          {
            validator: (rule, value, callback) => {
              if (modalType !== 'add') {
                callback()
              }
              clearTimeout(t)
              t = setTimeout(() => {
                checkRoleName(value, (data) => {
                  if (data === true) {
                    callback()
                  } else {
                    callback([new Error('此角色名称已存在')]);
                  }
                })
              }, 1000)
            }
          }
        ]
      },
      {
        label: '状态', field: 'status', type: 'Radio', dic: StatusDic,
        rules: [{ type: "string", required: true, message: '请选择状态' }]
      },
      {
        label: '备注', field: 'remark', type: 'TextArea',help: '角色说明描述，最多30个字符' ,
        rules: [{ required: true }, {  max: 30 }]
      }
    ]
  }
  const AuthModalProps = {
    roleName,
    visible: authModalVisible,
    data: dataTree,
    checkedKeys,
    onChangekeys(keys,allKeys) {
      dispatch({
        type: 'rolesMG/checkedKeysState',
        data: keys
      })
      dispatch({
        type: 'rolesMG/checkedAllKeysState',
        data: allKeys
      })
    },
    onCancel() {
      dispatch({
        type: 'rolesMG/authModalHideState'
      })
    },
    onOk() {
      dispatch({
        type: 'rolesMG/setBindRight'
      })
    }
  }
  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />
      <AuthModal {...AuthModalProps} />
    </div>
  );
}

RolesMG.propTypes = {
};

function mapStateToProps({ rolesMG, dictionary, menus }) {
  return { rolesMG, dictionary, menus }
}
export default connect(mapStateToProps)(RolesMG);
