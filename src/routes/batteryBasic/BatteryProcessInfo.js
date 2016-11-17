import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryProcessInfo.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryProcessInfo({dispatch, batteryProcessInfo}) {
  console.log('BatteryProcessInfo')
  const {loading, data, pageSize, total, current} = batteryProcessInfo;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '移交编号',
    dataIndex: 'transferId',
    key: 'transferId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '电池包编号',
    dataIndex: 'batsId',
    key: 'batsId',
  }, {
    title: '模组编号',
    dataIndex: 'batId',
    key: 'batId',
  }, {
    title: '到货日期',
    dataIndex: 'arriveTime',
    key: 'arriveTime',
  }, {
    title: '电池处理企业',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '处置状态',
    dataIndex: 'dealStatus',
    key: 'dealStatus',
  }, {
    title: '处置时间',
    dataIndex: 'dealTime',
    key: 'dealTime',
  }, {
    title: '产物',
    dataIndex: 'materials',
    key: 'materials',
  }, {
    title: '产物状态',
    dataIndex: 'materialStatus',
    key: 'materialStatus',
  }, {
    title: '产生处理时间',
    dataIndex: 'createDealTime',
    key: 'createDealTime',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名' }
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
          type: 'batteryProcessInfo/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryProcessInfo/query',
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

BatteryProcessInfo.propTypes = {
};

function mapStateToProps({batteryProcessInfo}) {
  return { batteryProcessInfo }
}
export default connect(mapStateToProps)(BatteryProcessInfo);
