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
    dataIndex: 'batsCode',
    key: 'batsCode',
  }, {
    title: '系统编号',
    dataIndex: 'sysCode',
    key: 'sysCode',
  }, {
    title: '包规格代码',
    dataIndex: 'batsSpecCode',
    key: 'batsSpecCode',
  }, {
    title: '所含类型',
    dataIndex: 'batType',
    key: 'batType',
  }, {
    title: '所含类型数量',
    dataIndex: 'batNum',
    key: 'batNum',
  }, {
    title: '电池包种类',
    dataIndex: 'batKind',
    key: 'batKind',
  }, {
    title: '电池包型号',
    dataIndex: 'batsModel',
    key: 'batsModel',
  }, {
    title: '物料编码',
    dataIndex: 'materielId',
    key: 'materielId',
  }, {
    title: '电池包供应商编码',
    dataIndex: 'supplierId',
    key: 'supplierId',
  }, {
    title: '电池包供应商名称',
    dataIndex: 'supplier',
    key: 'supplier',
  }, {
    title: '供应商电话',
    dataIndex: 'supplierPhone',
    key: 'supplierPhone',
  }, {
    title: '总成型号',
    dataIndex: 'totalModel',
    key: 'totalModel',
  }, {
    title: '质量',
    dataIndex: 'quality',
    key: 'quality',
  }, {
    title: '额定容量',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: '标称电压',
    dataIndex: 'voltage',
    key: 'voltage',
  }, {
    title: '主要配套车型',
    dataIndex: 'carType',
    key: 'carType',
  }, {
    title: '循环次数',
    dataIndex: 'cycleNum',
    key: 'cycleNum',
  }, {
    title: '生产日期',
    dataIndex: 'produceTime',
    key: 'produceTime',
  }, {
    title: '生产地址',
    dataIndex: 'produceAddress',
    key: 'produceAddress',
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
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      {
        label: '电池种类', field: 'batKind', type: 'Select', dic: [
          { name: '三元锂', value: 1 },
          { name: '磷酸铁锂', value: 0 }
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
