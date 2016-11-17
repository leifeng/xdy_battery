import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryUseInfo.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';

function BatteryUseInfo({dispatch, batteryUseInfo}) {
  console.log('batteryUseInfo')
   const {loading, data, pageSize, total, current} = batteryUseInfo;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '电池包编号',
    dataIndex: 'batsId',
    key: 'batsId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '模组编号',
    dataIndex: 'batId',
    key: 'batId',
  }, {
    title: '执行情况',
    dataIndex: 'execStatus',
    key: 'execStatus',
  }, {
    title: '更换电池编号',
    dataIndex: 'replaceBatsId',
    key: 'replaceBatsId',
  }, {
    title: '更换电池模组编号',
    dataIndex: 'replaceBatId',
    key: 'replaceBatId',
  }, {
    title: '执行内容',
    dataIndex: 'execContent',
    key: 'execContent',
  }, {
    title: '执行厂商',
    dataIndex: 'execCompany',
    key: 'execCompany',
  }, {
    title: '执行时间',
    dataIndex: 'execTime',
    key: 'execTime',
  }, {
    title: '执行地点',
    dataIndex: 'execAddress',
    key: 'execAddress',
  }, {
    title: '执行人',
    dataIndex: 'execMan',
    key: 'execMan',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
          type: 'batteryUseInfo/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryUseInfo/query',
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

BatteryUseInfo.propTypes = {
};

function mapStateToProps({batteryUseInfo}) {
  return { batteryUseInfo }
}
export default connect(mapStateToProps)(BatteryUseInfo);
