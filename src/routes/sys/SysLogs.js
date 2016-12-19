import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './SysLogs.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function SysLogs({dispatch, sysLogs}) {
  console.log('系统日志')
  const {loading, data, pageSize, total, pageNo} = sysLogs;

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
    handleChange(query) {
      dispatch({
        type: 'sysLogs/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'sysLogs/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'sysLogs/searchQueryState',
        data: null
      })
    },
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
      rowKey: 'id',
      data,
      columns,
      loading
    },
    pageProps: {
      pageNo,
      pageSize,
      total,
      onChange(current) {
        dispatch({
          type: 'sysLogs/query',
          args: {
            pageNo: current
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
