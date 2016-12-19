import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './UsersMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';
import Roles from '../../components/Roles'
import { checkAcount } from '../../services/usersMG'

function UsersMG({dispatch, usersMG}) {
  console.log('用户管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery, modalRolesVisible, roles, rolesbyUser} = usersMG;
  let t = -1;
  function onDeleteItem(id) {
    dispatch({
      type: 'usersMG/remove',
      id
    })
  }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'usersMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'usersMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'usersMG/openModalState',
          data: type
        })
      }

    }

  }
  function openRoles(id) {
    dispatch({
      type: 'usersMG/queryRoleByUserid',
      id
    })
  }
  const columns = [{
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  }, {
    title: '名称',
    dataIndex: 'realName',
    key: 'realName',
  }, {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
  }, {
    title: '用户类型',
    dataIndex: 'userType',
    key: 'userType',
  }, {
    title: '所属企业编码',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '到期日期',
    dataIndex: 'dueTime',
    key: 'dueTime',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
        <span className="ant-divider" />
        <a onClick={() => openRoles(record.id)}>分配角色</a>
      </span>
    }

  }];

  const searchFormProps = {
    handleChange(query) {
      dispatch({
        type: 'usersMG/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'usersMG/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'usersMG/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '账号', field: 'account', type: 'Input' },
      { label: '昵称', field: 'nickName', type: 'Input' },
      {
        label: '用户类型', field: 'userType', type: 'Select', dic: [
          { name: '知豆公司', value: 1 },
          { name: '回收管理点', value: 2 },
          { name: '再生处理企业', value: 3 },
          { name: '梯次利用企业', value: 4 },
          { name: '电池供应商商', value: 5 },
        ]
      },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ],
      },
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    deleteForids() {
      dispatch({
        type: 'usersMG/removeIds'
      })
    },
    tableProps: {
      rowKey: 'id',
      data,
      columns,
      selectedRowKeys,
      loading,
      expandedRowRender: (record) => {
        return <p>备注：{record.remark}</p>
      },
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'usersMG/selectedRowKeysState',
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
          type: 'usersMG/query',
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
          type: 'usersMG/create',
          args: data
        })
      } else {
        dispatch({
          type: 'usersMG/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'usersMG/closeModalState'
      })
    },
    modalForms: [
      {
        label: '账号', field: 'account', type: 'Input', unique: true, rules: [
          { required: true, message: '请输入账号' },
          {
            validator: (rule, value, callback) => {
              clearTimeout(t)
              t = setTimeout(() => {
                checkAcount(value, (data) => {
                  if (data === true) {
                    callback()
                  } else {
                    callback([new Error('此账号已存在')]);
                  }
                })
              }, 1000)
            }
          }]
      },
      {
        label: '密码', field: 'password', type: 'Input', formType: "password", rules: [
          { required: true, message: '请输入密码' },
        ]
      },
      { label: '名称', field: 'realname', type: 'Input' },
      { label: '昵称', field: 'nickName', type: 'Input' },
      {
        label: '用户类型', field: 'userType', type: 'Select', dic: [
          { name: '知豆用户', value: 1 },
          { name: '企业用户', value: 0 }
        ],
        rules: [{ required: true, message: '请选择用户类型' }]
      },
      {
        label: '所属企业编码', field: 'companyId', type: 'Select', dic: [
          { name: '知豆用户', value: 1 },
          { name: '企业用户', value: 0 }
        ],
        rules: [{ required: true, message: '请选择所属企业编码' }]
      },
      {
        label: '状态', field: 'status', type: 'Radio', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ],
        rules: [{ type: "number", required: true, message: '请选择状态' }]
      },

      {
        label: '到期日期', field: 'dueTime', type: 'DatePicker',
        setting: { showTime: true, format: 'YYYY-MM-DD HH:mm:ss' },
        rules: [{ type: "object", required: true, message: '请选择到期日期' }]
      },
      { label: '备注', field: 'remark', type: 'TextArea' }
    ]
  }
  const rolesProps = {
    modalRolesVisible,
    roles,
    rolesbyUser,
    closeModalRoles() {
      dispatch({
        type: 'usersMG/modalRolesState',
        data: false
      })
    },
    saveModalRoles() {
      dispatch({
        type: 'usersMG/updateRoleByUser'
      })
    },
    onChange(checkedValues) {
      dispatch({
        type: 'usersMG/rolesbyUserState',
        data: checkedValues
      })
    }
  }
  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />
      <Roles {...rolesProps} />
    </div>
  );
}

UsersMG.propTypes = {
};

function mapStateToProps({usersMG}) {
  return { usersMG }
}
export default connect(mapStateToProps)(UsersMG);
