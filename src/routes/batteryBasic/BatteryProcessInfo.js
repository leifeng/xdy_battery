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
    title: '处理单号',
    dataIndex: 'dealId',
    key: 'dealId',
  },{
    title: '电池包编号',
    dataIndex: 'batsCode',
    key: 'batsCode',
  }, {
    title: '模组编号',
    dataIndex: 'moduleCode',
    key: 'moduleCode',
  }, {
    title: '单体编号',
    dataIndex: 'batCode',
    key: 'batCode',
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
    title: '处理质量',
    dataIndex: 'dealQuality',
    key: 'dealQuality',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  }, {
    title: '联系时间',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  }, {
    title: '数据获取时间',
    dataIndex: 'getTime',
    key: 'getTime',
  }];

  const searchFormProps = {
    handleSearch: null,
       forms: [
      { label: '移交编号', field: 'transferId', type: 'Input' },
      {
        label: '电池种类', field: 'batKind', type: 'Select', dic: [
          { name: '三元锂', value: 1 },
          { name: '磷酸铁锂', value: 0 }
        ]
      },
      {
        label: '处置状态', field: 'dealStatus', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
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
