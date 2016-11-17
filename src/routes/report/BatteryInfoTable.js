import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryInfoTable.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryInfoTable({dispatch, batteryInfoTable}) {
  console.log('BatteryInfoTable')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryInfoTable;
  const dic = { 0: '女', 1: '男' }
  function onDeleteItem(id) {
    dispatch({
      type: 'batteryInfoTable/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryInfoTable/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryInfoTable/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryInfoTable/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }

    }

  }
  const columns = [{
    title: '电池包编号',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '执行情况',
    dataIndex: 'execStatus',
    key: 'execStatus',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '到期日期',
    dataIndex: 'dueDate',
    key: 'dueDate',
  }, {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }, {
    title: '修改时间',
    dataIndex: 'editTime',
    key: 'editTime',
  }, {
    title: '修改人',
    dataIndex: 'editor',
    key: 'editor',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
      </span>
    }

  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '电池包编号' }
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
            type: 'batteryInfoTable/selectedRowKeysState',
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
          type: 'batteryInfoTable/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryInfoTable/query',
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
        type: 'batteryInfoTable/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryInfoTable/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '用户名', field: 'name', type: 'Input' },
      { label: '年龄', field: 'age', type: 'InputNumber' },
      { label: '地址', field: 'address', type: 'Input' },
      {
        label: '性别', field: 'sex', type: 'Radio', dic: [
          { name: '男', value: 1 },
          { name: '女', value: 0 }
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

BatteryInfoTable.propTypes = {
};
function mapStateToProps({batteryInfoTable}) {
  return { batteryInfoTable }
}
export default connect(mapStateToProps)(BatteryInfoTable);
