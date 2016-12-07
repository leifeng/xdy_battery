import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryPaymentMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryPaymentMG({dispatch, batteryPaymentMG}) {
  console.log('batteryPaymentMG')
  const {loading, data, pageSize, total, current} = batteryPaymentMG;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '移交编号',
    dataIndex: 'transferId',
    key: 'transferId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '处理企业类型',
    dataIndex: 'companyType',
    key: 'companyType',
  }, {
    title: '处理企业编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '费用',
    dataIndex: 'totalFee',
    key: 'totalFee',
  }, {
    title: '创单时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '知豆确认时间',
    dataIndex: 'confirmTime',
    key: 'confirmTime',
  }, {
    title: '知豆确认人',
    dataIndex: 'confirmMan',
    key: 'confirmMan',
  }, {
    title: '处理厂付费时间',
    dataIndex: 'payTime',
    key: 'payTime',
  }, {
    title: '处理厂付费确认人',
    dataIndex: 'payMan',
    key: 'payMan',
  }, {
    title: '知豆财务确认付费时间',
    dataIndex: 'companyConfirmTime',
    key: 'companyConfirmTime',
  }, {
    title: '知豆财务确认付费确认人',
    dataIndex: 'companyConfirmMan',
    key: 'companyConfirmMan',
  }, {
    title: '备注',
    dataIndex: 'remak',
    key: 'remak',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '移交编号', field: 'transferId', type: 'Input' },
      { label: '处理企业编号', field: 'companyId', type: 'Input' },
      { label: '处理企业类型', field: 'companyType', type: 'Input' },
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
          type: 'batteryPaymentMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryPaymentMG/query',
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

BatteryPaymentMG.propTypes = {
};

function mapStateToProps({batteryPaymentMG}) {
  return { batteryPaymentMG }
}
export default connect(mapStateToProps)(BatteryPaymentMG);
