import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecAccountsMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryRecAccountsMG({dispatch, batteryRecAccountsMG}) {
  console.log('BatteryDeliveryMG')
  const {loading, data, pageSize, total, current} = batteryRecAccountsMG;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '月结单号',
    dataIndex: 'statementsId',
    key: 'statementsId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '回收管理点编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '代付费用',
    dataIndex: 'recycleFee',
    key: 'recycleFee',
  }, {
    title: '回收佣金',
    dataIndex: 'commission',
    key: 'commission',
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
    title: '知豆付费时间',
    dataIndex: 'payTime',
    key: 'payTime',
  }, {
    title: '知豆付费确认人',
    dataIndex: 'payMan',
    key: 'payMan',
  }, {
    title: '回收点财务确认付费时间',
    dataIndex: 'confirmPayTime',
    key: 'confirmPayTime',
  }, {
    title: '回收点财务确认付费确认人',
    dataIndex: 'confirmPayMan',
    key: 'confirmPayMan',
  }, {
    title: '备注',
    dataIndex: 'remak',
    key: 'remak',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '月结单号', field: 'statementsId', type: 'Input' },
      { label: '创单时间', field: 'createTime', type: 'Input' },
      { label: '回收管理点编号', field: 'companyId', type: 'Input' },
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
          type: 'batteryRecAccountsMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecAccountsMG/query',
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

BatteryRecAccountsMG.propTypes = {
};

function mapStateToProps({batteryRecAccountsMG}) {
  return { batteryRecAccountsMG }
}
export default connect(mapStateToProps)(BatteryRecAccountsMG);
