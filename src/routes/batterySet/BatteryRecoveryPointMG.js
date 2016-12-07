import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecoveryPointMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRecoveryPointMG({dispatch, batteryRecoveryPointMG}) {
  console.log('batteryRecoveryPointMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRecoveryPointMG;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRecoveryPointMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRecoveryPointMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'batteryRecoveryPointMG/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '企业所在省',
    dataIndex: 'province',
    key: 'province',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '企业所在市',
    dataIndex: 'city',
    key: 'city',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '经度',
    dataIndex: 'longitude',
    key: 'longitude',
  }, {
    title: '纬度',
    dataIndex: 'latitude',
    key: 'latitude',
  }, {
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  }, {
    title: '联系电话',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  }, {
    title: '移交或提货人',
    dataIndex: 'dealMan',
    key: 'dealMan',
  }, {
    title: '移交人或提货人电话',
    dataIndex: 'dealPhone',
    key: 'dealPhone',
  }, {
    title: '存储最大数（回收管理点）',
    dataIndex: 'maxValue',
    key: 'maxValue',
  }, {
    title: '企业名称',
    dataIndex: 'company',
    key: 'company',
  }, {
    title: '企业类型',
    dataIndex: 'companyType',
    key: 'companyType',
  }, {
    title: '企业简称',
    dataIndex: 'nickName',
    key: 'nickName',
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
      { label: '企业所在省', field: 'province', type: 'Input' },
      { label: '企业所在市', field: 'city', type: 'Input' },
      { label: '企业名称', field: 'company', type: 'Input' },
      { label: '企业类型', field: 'companyType', type: 'Input' }
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
            type: 'batteryRecoveryPointMG/selectedRowKeysState',
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
          type: 'batteryRecoveryPointMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecoveryPointMG/query',
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
        type: 'batteryRecoveryPointMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRecoveryPointMG/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '企业所在省', field: 'province', type: 'Input' },
      { label: '企业所在市', field: 'city', type: 'InputNumber' },
      { label: '地址', field: 'address', type: 'Input' },
      { label: '经度', field: 'longitude', type: 'Input' },
      { label: '纬度', field: 'latitude', type: 'InputNumber' },
      { label: '联系人', field: 'linkMan', type: 'Input' },
      { label: '联系电话', field: 'linkPhone', type: 'Input' },
      { label: '移交或提货人', field: 'dealMan', type: 'InputNumber' },
      { label: '移交人或提货人电话', field: 'dealPhone', type: 'Input' },
      { label: '存储最大数（回收管理点）', field: 'maxValue', type: 'InputNumber' },
      { label: '企业名称', field: 'company', type: 'InputNumber' },
      { label: '企业类型', field: 'companyType', type: 'Input' },
      { label: '企业简称', field: 'nickName', type: 'InputNumber' },
      {
        label: '状态', field: 'status', type: 'Radio', dic: [
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

BatteryRecoveryPointMG.propTypes = {
};

function mapStateToProps({batteryRecoveryPointMG}) {
  return { batteryRecoveryPointMG }
}
export default connect(mapStateToProps)(BatteryRecoveryPointMG);
