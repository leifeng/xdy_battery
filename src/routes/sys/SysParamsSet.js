import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './SysParamsSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';
import { getList, getName } from '../../utils/dicFilter';

function SysParamsSet({dispatch, sysParamsSet, dictionary}) {
  console.log('系统参数')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = sysParamsSet;
  const {allData} = dictionary;
  const StatusDic = getList(allData, 'Status');

  function onDeleteItem(id) {
    dispatch({
      type: 'sysParamsSet/remove',
      id
    })
  }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'sysParamsSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'sysParamsSet/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'sysParamsSet/openModalState',
          data: type
        })
      }

    }

  }

  const columns = [{
    title: '字段编号',
    dataIndex: 'fieldCode',
    key: 'fieldCode',
  }, {
    title: '字段名称',
    dataIndex: 'fieldName',
    key: 'fieldName',
  }, {
    title: '参数值',
    dataIndex: 'paramValue',
    key: 'paramValue',
  }, {
    title: '参数名称',
    dataIndex: 'paramName',
    key: 'paramName',
  }, {
    title: '对应编号',
    dataIndex: 'relativeId',
    key: 'relativeId',
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
        <a onClick={() => openModal('edit', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }];

  const searchFormProps = {
    handleChange(query) {
      dispatch({
        type: 'sysParamsSet/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'sysParamsSet/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'sysParamsSet/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '字段编号', field: 'fieldCode', type: 'Input' },
      { label: '字段名称', field: 'fieldName', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Select', dic: StatusDic
      },

    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    deleteForids() {
      dispatch({
        type: 'sysParamsSet/removeIds'
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
            type: 'sysParamsSet/selectedRowKeysState',
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
          type: 'sysParamsSet/query',
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
          type: 'sysParamsSet/create',
          args: data
        })
      } else {
        dispatch({
          type: 'sysParamsSet/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'sysParamsSet/closeModalState',
      })
    },
    modalForms: [
      { label: '字段编号', field: 'fieldCode', type: 'Input' },
      { label: '字段名称', field: 'fieldName', type: 'Input' },
      { label: '参数值', field: 'paramValue', type: 'Input' },
      { label: '参数名称', field: 'paramName', type: 'Input' },
      { label: '对应编号', field: 'relativeId', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Radio', dic: StatusDic,
        rules: [{ type: "string", required: true, message: '请选择状态' }]
      },
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

SysParamsSet.propTypes = {
};

function mapStateToProps({sysParamsSet, dictionary}) {
  return { sysParamsSet, dictionary }
}
export default connect(mapStateToProps)(SysParamsSet);
