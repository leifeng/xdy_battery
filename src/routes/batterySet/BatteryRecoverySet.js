import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecoverySet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRecoverySet({dispatch, batteryRecoverySet}) {
  console.log('batteryRecoverySet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRecoverySet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRecoverySet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRecoverySet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRecoverySet/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '月结单号',
    dataIndex: 'statementsId',
    key: 'statementsId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '回收单号',
    dataIndex: 'recyclesId',
    key: 'recyclesId',
  }, {
    title: '电池代付费用',
    dataIndex: 'recycleFee',
    key: 'recycleFee',
  }, {
    title: '电池回收佣金',
    dataIndex: 'transportUnit',
    key: 'transportUnit',
  },  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },  {
    title: '单据生成时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },  {
    title: '单据确认时间',
    dataIndex: 'confirmTime',
    key: 'confirmTime',
  },  {
    title: '单据确认人',
    dataIndex: 'confirmMan',
    key: 'confirmMan',
  },  {
    title: '财务确认时间',
    dataIndex: 'financialConfirmTime',
    key: 'financialConfirmTime',
  },  {
    title: '财务确认人',
    dataIndex: 'financialConfirmMan',
    key: 'financialConfirmMan',
  },  {
    title: '支付确认时间',
    dataIndex: 'payConfirmTime',
    key: 'payConfirmTime',
  },  {
    title: '支付确认人',
    dataIndex: 'payConfirmMan',
    key: 'payConfirmMan',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a  onClick={() => openModal('edit',record)}>编辑</a>
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
      { label: '用户名' }
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
            type: 'batteryRecoverySet/selectedRowKeysState',
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
          type: 'batteryRecoverySet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecoverySet/query',
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
        type: 'batteryRecoverySet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRecoverySet/visibleState',
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

BatteryRecoverySet.propTypes = {
};

function mapStateToProps({batteryRecoverySet}) {
  return { batteryRecoverySet }
}
export default connect(mapStateToProps)(BatteryRecoverySet);
