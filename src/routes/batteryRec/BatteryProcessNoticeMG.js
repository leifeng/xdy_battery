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
    title: '退役单号',
    dataIndex: 'recycleId',
    key: 'recycleId',
  }, {
    title: '回收管理点编号',
    dataIndex: 'recycleCompanyId',
    key: 'recycleCompanyId',
  }, {
    title: '创单时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '处理企业类型',
    dataIndex: 'companyType',
    key: 'companyType',
  }, {
    title: '处理企业编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '移交地点',
    dataIndex: 'toAddress',
    key: 'toAddress',
  }, {
    title: '移交人',
    dataIndex: 'transferMan',
    key: 'transferMan',
  }, {
    title: '移交人电话',
    dataIndex: 'transferPhone',
    key: 'transferPhone',
  }, {
    title: '可移交时间',
    dataIndex: 'toTime',
    key: 'toTime',
  }, {
    title: '提货人',
    dataIndex: 'tackMan',
    key: 'tackMan',
  }, {
    title: '提货人电话',
    dataIndex: 'tackPhone',
    key: 'tackPhone',
  }, {
    title: '提货人身份证附件上传',
    dataIndex: 'reportCard',
    key: 'reportCard',
  }, {
    title: '收货移交单上传',
    dataIndex: 'reportDan',
    key: 'reportDan',
  }, {
    title: '移交企业确认时间',
    dataIndex: 'confirmTime',
    key: 'confirmTime',
  }, {
    title: '确认人',
    dataIndex: 'confirmMan',
    key: 'confirmMan',
  }, {
    title: '备注',
    dataIndex: 'remak',
    key: 'remak',
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
      { label: '通知编号', field: 'batsCode', type: 'Input' },
      { label: '退役单号', field: 'transferId', type: 'Input' },

      { label: '处理企业编号', field: 'companyId', type: 'Input' },
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
      { label: '通知编号', field: 'transferId', type: 'Input' },
      { label: '退役单号', field: 'recycleId', type: 'Input' },
      { label: '回收管理点编号', field: 'recycleCompanyId', type: 'Input' },
      { label: '创单时间', field: 'createTime', type: 'Input' },
      { label: '状态', field: 'status', type: 'Input' },
      { label: '处理企业类型', field: 'companyType', type: 'Input' },
      { label: '处理企业编号', field: 'companyId', type: 'Input' },
      { label: '移交地点', field: 'toAddress', type: 'Input' },
      { label: '移交人', field: 'transferMan', type: 'Input' },
      { label: '移交人电话', field: 'transferPhone', type: 'Input' },
      { label: '可移交时间', field: 'toTime', type: 'Input' },
      { label: '提货人', field: 'tackMan', type: 'Input' },
      { label: '提货人电话', field: 'tackPhone', type: 'Input' },
      { label: '提货人身份证附件上传', field: 'reportCard', type: 'Input' },
      { label: '收货移交单上传', field: 'reportDan', type: 'Input' },
      { label: '移交企业确认时间', field: 'confirmTime', type: 'Input' },
      { label: '确认人', field: 'confirmMan', type: 'Input' },
      { label: '备注', field: 'remak', type: 'Input' }
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
