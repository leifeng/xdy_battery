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
