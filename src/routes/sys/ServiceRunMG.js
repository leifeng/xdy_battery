import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './ServiceRunMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function ServiceRunMG({dispatch, serviceRunMG}) {
  console.log('ServiceRunMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = serviceRunMG;
  console.log(visible)
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'serviceRunMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'serviceRunMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'serviceRunMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'serviceRunMG/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }
    }
  }

  const columns = [{
    title: '服务名称',
    dataIndex: 'service',
    key: 'service',
  }, {
    title: '运行状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '当前时间',
    dataIndex: 'runTime',
    key: 'runTime',
  }, {
    title: '异常原因',
    dataIndex: 'runReason',
    key: 'runReason',
  }, {
    title: '解决方案',
    dataIndex: 'dealWay',
    key: 'dealWay',
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
      { label: '服务名称', field: 'service', type: 'Input' },
      {
        label: '运行状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
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
            type: 'serviceRunMG/selectedRowKeysState',
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
          type: 'serviceRunMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'serviceRunMG/query',
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
        type: 'serviceRunMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'serviceRunMG/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '服务名称', field: 'service', type: 'Input' },
      { label: '当前时间', field: 'runTime', type: 'Input' },
      { label: '异常原因', field: 'runReason', type: 'Input' },
      { label: '解决方案', field: 'dealWay', type: 'Input' },
      {
        label: '运行状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '备注', field: 'remark', type: 'TextArea' },
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

ServiceRunMG.propTypes = {
};

function mapStateToProps({serviceRunMG}) {
  return { serviceRunMG }
}
export default connect(mapStateToProps)(ServiceRunMG);
