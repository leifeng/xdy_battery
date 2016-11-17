import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryProcessNoticeMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryProcessNoticeMG({dispatch, batteryProcessNoticeMG}) {
  console.log('BatteryProcessNoticeMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryProcessNoticeMG;
  const dic = { 0: '女', 1: '男' }

  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryProcessNoticeMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    }
  }
  const columns = [{
    title: '通知编号',
    dataIndex: 'transferId',
    key: 'transferId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '回收单号',
    dataIndex: 'recycleId',
    key: 'recycleId',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '电池处理企业',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '动力电池处理移交地',
    dataIndex: 'toAddress',
    key: 'toAddress',
  }, {
    title: '移交企业确认时间',
    dataIndex: 'confirmTime',
    key: 'confirmTime',
  }, {
    title: '确认人',
    dataIndex: 'confirmMan',
    key: 'confirmMan',
  }, {
    title: '移交人',
    dataIndex: 'transferMan',
    key: 'transferMan',
  }, {
    title: '动力电池移交处理企业时间',
    dataIndex: 'toTime',
    key: 'toTime',
  }, {
    title: '收货人身份证上传',
    dataIndex: 'reportCard',
    key: 'reportCard',
  }, {
    title: '收货移交单上传',
    dataIndex: 'reportDan',
    key: 'reportDan',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
      </span>
    }

  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名' }
    ]
  };

  const tableListProps = {
    curd: 'ur',
    openModal,
    tableProps: {
      data,
      columns,
      loading,
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryProcessNoticeMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryProcessNoticeMG/query',
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
        type: 'batteryProcessNoticeMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryProcessNoticeMG/visibleState',
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

BatteryProcessNoticeMG.propTypes = {
};

function mapStateToProps({batteryProcessNoticeMG}) {
  return { batteryProcessNoticeMG }
}
export default connect(mapStateToProps)(BatteryProcessNoticeMG);
