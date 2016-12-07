import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRetireSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRetireSet({dispatch, batteryRetireSet}) {
  console.log('batteryRetireSet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRetireSet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRetireSet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRetireSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryRetireSet/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryRetireSet/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }
    }
  }

  const columns = [{
    title: '电池种类',
    dataIndex: 'batKind',
    key: 'batKind',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '界定等级',
    dataIndex: 'defineClass',
    key: 'defineClass',
  }, {
    title: '间隔时间',
    dataIndex: 'days',
    key: 'days',
  }, {
    title: '电池状态',
    dataIndex: 'batStatus',
    key: 'batStatus',
  }, {
    title: '电池电压',
    dataIndex: 'voltage',
    key: 'voltage',
  }, {
    title: '电池容量',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: '循环次数',
    dataIndex: 'cycleNum',
    key: 'cycleNum',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
      { label: '电池种类', field: 'batKind', type: 'Input' },
      { label: '界定等级', field: 'defineClass', type: 'Input' },
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
            type: 'batteryRetireSet/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
      expandedRowRender:(recode)=>{
        return <p>2</p>
      }
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRetireSet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRetireSet/query',
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
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '电池种类', field: 'batKind', type: 'Input' },
      { label: '界定等级', field: 'defineClass', type: 'Input' },
      { label: '间隔时间', field: 'days', type: 'Input' },
      { label: '电池状态', field: 'recycleCompany', type: 'Input' },
      { label: '电池电压', field: 'setTime', type: 'DatePicker' },
      { label: '电池容量', field: 'retireTime', type: 'DatePicker' },
       { label: '循环次数', field: 'retireTime', type: 'DatePicker' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      }

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

BatteryRetireSet.propTypes = {
};

function mapStateToProps({batteryRetireSet}) {
  return { batteryRetireSet }
}
export default connect(mapStateToProps)(BatteryRetireSet);
