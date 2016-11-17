import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryBasicInfo.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryBasicInfo({dispatch, batteryBasicInfo}) {
  console.log('BatteryBasicInfo')
  const {loading, data, pageSize, total, current} = batteryBasicInfo;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '电池包编号',
    dataIndex: 'batsId',
    key: 'batsId',
  }, {
    title: '电池种类',
    dataIndex: 'batKind',
    key: 'batKind',
  }, {
    title: '模组个数',
    dataIndex: 'batNums',
    key: 'batNums',
  }, {
    title: '模组编号',
    dataIndex: 'batId',
    key: 'batId',
  }, {
    title: '模组序号',
    dataIndex: 'batNum',
    key: 'batNum',
  }, {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
  }, {
    title: '材料类型',
    dataIndex: 'materialType',
    key: 'materialType',
  }, {
    title: '生产日期',
    dataIndex: 'productTime',
    key: 'productTime',
  }, {
    title: '生产地点',
    dataIndex: 'productAddress',
    key: 'productAddress',
  }, {
    title: 'Vin',
    dataIndex: 'vin',
    key: 'vin',
  }, {
    title: 'Bms编号',
    dataIndex: 'bmsId',
    key: 'bmsId',
  }, {
    title: '车型',
    dataIndex: 'carType',
    key: 'carType',
  }, {
    title: '车牌号',
    dataIndex: 'carPlate',
    key: 'carPlate',
  }, {
    title: '组装日期',
    dataIndex: 'assemblyTime',
    key: 'assemblyTime',
  }, {
    title: '组装地点',
    dataIndex: 'assemblyAddress',
    key: 'assemblyAddress',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }];

  const searchFormProps = {
    handleSearch(searchForm) {
      dispatch({
        type: 'batteryBasicInfo/query',
        args: {
          searchForm
        }
      })
    },
    forms: [
      { label: '电池包编号', field: 'batsId', type: 'Input' },
      {
        label: '电池种类', field: 'batKind', type: 'Select', dic: [
          { name: '三元锂', value: 1 },
          { name: '磷酸铁锂', value: 0 }
        ]
      },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '生产日期', field: 'productTime', type: 'DatePicker' },
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
          type: 'batteryBasicInfo/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryBasicInfo/query',
          args: {
            current
          }
        })
      },
    }
  };

  return (
    <div >
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
    </div >
  );
}

BatteryBasicInfo.propTypes = {
};

function mapStateToProps({batteryBasicInfo}) {
  return { batteryBasicInfo }
}
export default connect(mapStateToProps)(BatteryBasicInfo);
