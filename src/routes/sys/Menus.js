import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './Menus.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';
import { getList, getName } from '../../utils/dicFilter';

function Menus({dispatch, menus, dictionary}) {
  console.log('菜单管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery, menuTree, addTree, menuLevelDisabled} = menus;
  const {allData} = dictionary;
  const menuLeaf = menus.menuLeaf ? menus.menuLeaf[location.pathname] : [];
  const StatusDic = getList(allData, 'Status');
  const Menu_TypeDic = getList(allData, 'Menu_Type')
  function onDeleteItem(id) {
    dispatch({
      type: 'menus/remove',
      id
    })
  }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'menus/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'menus/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'menus/openModalState',
          data: type
        })
      }

    }

  }

  const columns = [{
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName'
  }, {
    title: '菜单URL',
    dataIndex: 'menuUrl',
    key: 'menuUrl'
  }, {
    title: '父菜单',
    dataIndex: 'parentName',
    key: 'parentName',
    render: (text, record) => {
      return record.parentId == 0 ? '根目录' : record.parentName
    }
  }, {
    title: '状态 ',
    dataIndex: 'isUse',
    key: 'isUse',
    render: (text, record) => {
      return getName(StatusDic, text)
    }
  }, {
    title: '层级 ',
    dataIndex: 'menuLevel',
    key: 'menuLevel',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        {menuLeaf.indexOf('update') !== -1 ? <span><a onClick={() => openModal('edit', record)}>编辑</a><span className="ant-divider" /></span> : null}
        {menuLeaf.indexOf('delete') !== -1 ? <span><Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}><a>删除</a></Popconfirm><span className="ant-divider" /></span> : null}
      </span>
    }
  }];
  const searchFormProps = {
    handleChange(query) {
      dispatch({
        type: 'menus/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'menus/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'menus/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '菜单名称', field: 'menuName', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'r',
    openModal,
    auth: menuLeaf,
    deleteForids() {
      dispatch({
        type: 'menus/removeIds'
      })
    },
    tableProps: {
      rowKey: 'id',
      data,
      columns,
      loading,
      selectedRowKeys,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'menus/selectedRowKeysState',
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
          type: 'menus/query',
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
          type: 'menus/create',
          args: data
        })
      } else {
        dispatch({
          type: 'menus/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'menus/closeModalState',
      })
    },
    modalForms: [
      {
        label: '菜单名称', field: 'menuName', type: 'Input',
        rules: [{ required: true, message: '请输入菜单名称' },
        { required: true, message: '菜单名称长度1~15', min: 1, max: 15 }]
      },
      { label: '菜单URL', field: 'menuUrl', type: 'Input', },
      { label: '父菜单ID', field: 'parentId', type: 'TreeSelect', dic: addTree },
      { label: '图标', field: 'menuCol1', type: 'Input' },
      {
        label: '类型', field: 'menuCol2', type: 'Radio', dic: Menu_TypeDic,
        rules: [{ type: "string", required: true, message: '请选择类型' }],
        onChange: (value) => {
          dispatch({
            type: 'menus/menuLevelDisabledState',
            data: value == 1 ? true : false
          })
        }
      },
      { label: '层级', field: 'menuLevel', type: 'InputNumber', linkField: "menuCol2", disabledFn: (v) => v == 1 ? true : false },
      {
        label: '状态', field: 'isUse', type: 'Radio', dic: StatusDic,
        rules: [{ type: "string", required: true, message: '请选择状态' }]
      },
      { label: '备注', field: 'remark', type: 'Input' },
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

Menus.propTypes = {
};

function mapStateToProps({menus, dictionary}) {
  return { menus, dictionary }
}
export default connect(mapStateToProps)(Menus);
