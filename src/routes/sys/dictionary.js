import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './dictionary.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function Dictionary({dispatch, dictionary, menus}) {
  console.log('字典管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = dictionary;
  const menuLeaf = menus.menuLeaf ? menus.menuLeaf[location.pathname] : [];

  let t = -1;
  function onDeleteItem(id) {
    dispatch({
      type: 'dictionary/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'dictionary/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'dictionary/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'dictionary/openModalState',
          data: type
        })
      }

    }

  }

  const columns = [{
    title: '字典编码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '描述',
    dataIndex: 'dicDesc',
    key: 'dicDesc',
  }, {
    title: '顺序号',
    dataIndex: 'dicIndex',
    key: 'dicIndex',
  }, {
    title: '字典名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '字典值',
    dataIndex: 'value',
    key: 'value',
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
    searchQuery,
    handleChange(query) {
      dispatch({
        type: 'dictionary/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'dictionary/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'dictionary/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '字典编码', field: 'code', type: 'Input' },
      { label: '字典名称', field: 'name', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'r',
    openModal,
    deleteForids() {
      dispatch({
        type: 'dictionary/removeIds'
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
            type: 'dictionary/selectedRowKeysState',
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
          type: 'dictionary/query',
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
          type: 'dictionary/create',
          args: data
        })
      } else {
        dispatch({
          type: 'dictionary/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'dictionary/closeModalState'
      })
    },
    modalForms: [
      { label: '类别id', field: 'parentId', type: 'Input' },
      {
        label: '字典编码', field: 'code', type: 'Input', rules:
        [{ required: true, message: '字典编码长度为1~20', min: 1, max: 20 }]
      },
      {
        label: '字典名称', field: 'name', type: 'Input', rules:
          [{ required: true, message: '字典名称长度为1~20', min: 1, max: 20 }]
      },
      { label: '字典值', field: 'value', type: 'Input' },
      { label: '顺序号', field: 'dicIndex', type: 'InputNumber' },
      { label: '描述', field: 'dicDesc', type: 'TextArea' },
      { label: '备注', field: 'remark', type: 'TextArea' },
    ]

  }

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />
    </div>
  );
}

Dictionary.propTypes = {
};

function mapStateToProps({dictionary, menus}) {
  return { dictionary, menus }
}
export default connect(mapStateToProps)(Dictionary);
