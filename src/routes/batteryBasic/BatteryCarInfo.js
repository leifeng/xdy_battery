import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryCarInfo.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';

function BatteryCarInfo({dispatch, batteryCarInfo}) {
  console.log('batteryCarInfo')
  const {loading, data, pageSize, total, current} = batteryCarInfo;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: (text, record) => {
      return dic[text]
    }
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名', field: 'name', type: 'Input' },
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
          type: 'batteryCarInfo/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryCarInfo/query',
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

BatteryCarInfo.propTypes = {
};

function mapStateToProps({batteryCarInfo}) {
  return { batteryCarInfo }
}
export default connect(mapStateToProps)(BatteryCarInfo);
