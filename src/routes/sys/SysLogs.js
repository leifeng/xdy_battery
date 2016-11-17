import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './SysLogs.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function SysLogs({dispatch, sysLogs}) {
  console.log('sysLogs')
  const {loading, data, pageSize, total, current} = sysLogs;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '应用程序',
    dataIndex: 'application',
    key: 'application',
  }, {
    title: '异常类型',
    dataIndex: 'logType',
    key: 'logType',
  }, {
    title: '日志信息',
    dataIndex: 'log',
    key: 'log',
  }, {
    title: '日志明细',
    dataIndex: 'logDesc',
    key: 'logDesc',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '应用程序', field: 'application', type: 'Input' },
      {
        label: '异常类型', field: 'logType', type: 'Select', dic: [
          { name: '报警类型', value: 1 },
          { name: '错误类型', value: 0 }
        ]
      }
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
          type: 'sysLogs/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'sysLogs/query',
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

SysLogs.propTypes = {
};

function mapStateToProps({sysLogs}) {
  return { sysLogs }
}
export default connect(mapStateToProps)(SysLogs);
