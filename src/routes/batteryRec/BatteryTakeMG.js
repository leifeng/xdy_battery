import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryTakeMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryTakeMG({dispatch, batteryTakeMG}) {
  console.log('batteryTakeMG')
  const {loading, data, pageSize, total, current} = batteryTakeMG;
  const dic = { 0: '女', 1: '男' }

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
  }];

  const searchFormProps = {
    handleSearch: null,
     forms: [
      { label: '通知编号', field: 'transferId', type: 'Input' },
      { label: '退役单号', field: 'recycleId', type: 'Input' },
      { label: '回收管理点编号', field: 'recycleCompanyId', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'r',
    tableProps: {
      data,
      columns,
      loading
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryTakeMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryTakeMG/query',
          args: {
            current
          }
        })
      },
    }
  };

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
    </div>
  );
}

BatteryTakeMG.propTypes = {
};

function mapStateToProps({batteryTakeMG}) {
  return { batteryTakeMG }
}
export default connect(mapStateToProps)(BatteryTakeMG);
