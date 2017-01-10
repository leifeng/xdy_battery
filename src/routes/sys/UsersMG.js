import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './UsersMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';
import Roles from '../../components/Roles';
import EditPwd from '../../components/EditPwd';
import { checkAcount } from '../../services/usersMG';
import { getList, getName } from '../../utils/dicFilter';


function UsersMG({dispatch, usersMG, dictionary, companylist}) {
  console.log('用户管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery, modalRolesVisible, roles, rolesbyUser, editPwdVisible, editPwdLoading, linkField} = usersMG;
  const {allData} = dictionary;
  const {companyAllData} = companylist;
  let t = -1;
  //字典处理
  const StatusDic = getList(allData, 'Status');
  const User_TypeDic = getList(allData, 'User_Type');
  const filterCompanyDic = companyAllData.filter((item, index) => {
    if (record) {
      return item.filter == record.userType
    }
    return item.filter == linkField
  }) || []
  //删除一个
  function onDeleteItem(id) {
    dispatch({
      type: 'usersMG/remove',
      id
    })
  }
  //新建、编辑
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
  //分配角色
  function openRoles(id) {
    dispatch({
      type: 'usersMG/queryRoleByUserid',
      id
    })
  }
  //编辑密码
  function OpenEditPwd(id) {
    dispatch({
      type: 'usersMG/userIdState',
      data: id
    })
    dispatch({
      type: 'usersMG/editPwdVisibleState',
      data: true
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
    render: (text, record) => {
      return getName(User_TypeDic, text)
    }
  }, {
    title: '所属企业',
    dataIndex: 'companyId',
    key: 'companyId',
    render: (text, record) => {
      return getName(companyAllData, text)
    }
  }, {
    title: '到期日期',
    dataIndex: 'dueTime',
    key: 'dueTime',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return getName(StatusDic, text)
    }
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
        <a onClick={() => OpenEditPwd(record.id)}>修改密码</a>
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
        label: '用户类型', field: 'userType', type: 'Select', dic: User_TypeDic
      },
      {
        label: '状态', field: 'status', type: 'Select', dic: StatusDic,
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
  }
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
        label: '账号', field: 'account', type: 'Input', unique: true,
        rules: [
          { required: true, message: '请输入账号' },
          { required: true, message: '账号名称长度为1~10', min: 1, max: 10 },
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
        label: '密码', field: 'password', type: 'Input', unique: true, formType: "password",
        rules: [{ required: true, message: '请输入密码' },]
      },
      { label: '名称', field: 'realName', type: 'Input' },
      { label: '昵称', field: 'nickName', type: 'Input' },
      {
        label: '用户类型', field: 'userType', type: 'Select', dic: User_TypeDic,
        linkField: 'companyId',
        rules: [{ required: true, message: '请选择用户类型' }],
        onChange: (value) => {
          dispatch({
            type: 'usersMG/linkFieldState',
            data: value
          })
        }
      },
      {
        label: '所属企业编码', field: 'companyId', type: 'Select', dic: filterCompanyDic,
        rules: [{ required: true, message: '请选择所属企业编码' }]
      },
      {
        label: '状态', field: 'status', type: 'Radio', dic: StatusDic,
        rules: [{ type: "string", required: true, message: '请选择状态' }]
      },
      {
        label: '到期日期', field: 'dueTime', type: 'DatePicker',
        setting: { showTime: true, format: 'YYYY-MM-DD HH:mm:ss', disabledDate: null },
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
  const editPwdProps = {
    editPwdLoading,
    editPwdVisible,
    onSavePwd(data) {
      dispatch({
        type: 'usersMG/updatePwd',
        args: data
      })
    },
    onClosePwd() {
      dispatch({
        type: 'usersMG/editPwdVisibleState',
        data: false
      })
    },

  }

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />
      <Roles {...rolesProps} />
      <EditPwd {...editPwdProps} />
    </div>
  );
}

UsersMG.propTypes = {
};

function mapStateToProps({usersMG, dictionary, companylist}) {
  return { usersMG, dictionary, companylist }
}
export default connect(mapStateToProps)(UsersMG);
