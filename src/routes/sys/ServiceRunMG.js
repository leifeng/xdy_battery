import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './ServiceRunMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function ServiceRunMG({dispatch, serviceRunMG}) {
  console.log('服务运行')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = serviceRunMG;

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
          type: 'serviceRunMG/openModalState',
          data: type
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
    title: '运行时间',
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
      rowKey: 'id',
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
      pageNo,
      pageSize,
      total,
      onChange(current) {
        dispatch({
          type: 'serviceRunMG/query',
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
          type: 'serviceRunMG/create',
          args: data
        })
      } else {
        dispatch({
          type: 'serviceRunMG/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'serviceRunMG/closeModalState'
      })
    },
    modalForms: [
      { label: '服务名称', field: 'service', type: 'Input' },
      { label: '运行时间', field: 'runTime', type: 'Input' },
      { label: '异常原因', field: 'runReason', type: 'Input' },
      { label: '解决方案', field: 'dealWay', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Radio', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ],
        rules: [{ type: "number", required: true, message: '请选择状态' }]
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

ServiceRunMG.propTypes = {
};

function mapStateToProps({serviceRunMG}) {
  return { serviceRunMG }
}
export default connect(mapStateToProps)(ServiceRunMG);
