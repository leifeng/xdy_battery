import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryParamsSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryParamsSet({dispatch, batteryParamsSet}) {
  console.log('batteryParamsSet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryParamsSet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'autbatteryParamsSethMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryParamsSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryParamsSet/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryParamsSet/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }
    }
  }

  const columns = [{
    title: '字段编号',
    dataIndex: 'fieldCode',
    key: 'fieldCode',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '字段名称',
    dataIndex: 'fieldName',
    key: 'fieldName',
  }, {
    title: '参数值',
    dataIndex: 'paramId',
    key: 'paramId',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '参数名称',
    dataIndex: 'paramName',
    key: 'paramName',
  }, {
    title: '对应编号',
    dataIndex: 'relativeId',
    key: 'relativeId',
  }, {
    title: '企业编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      return dic[text]
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
    handleSearch: null,
    forms: [
      { label: '字段编号', field: 'fieldCode', type: 'Input' },
      { label: '字段名称', field: 'fieldName', type: 'Input' },
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
            type: 'batteryParamsSet/selectedRowKeysState',
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
          type: 'batteryParamsSet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryParamsSet/query',
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
        type: 'batteryParamsSet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryParamsSet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '字段编号', field: 'fieldCode', type: 'Input' },
      { label: '字段名称', field: 'fieldName', type: 'Input' },
      { label: '参数值', field: 'paramId', type: 'Input' },
      { label: '参数名称', field: 'paramName', type: 'Input' },
      { label: '对应编号', field: 'relativeId', type: 'Input' },
      { label: '企业编号', field: 'companyId', type: 'Input' },
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

BatteryParamsSet.propTypes = {
};

function mapStateToProps({batteryParamsSet}) {
  return { batteryParamsSet }
}
export default connect(mapStateToProps)(BatteryParamsSet);
