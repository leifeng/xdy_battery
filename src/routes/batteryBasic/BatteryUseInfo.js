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
    title: '维护类型',
    dataIndex: 'useType',
    key: 'useType',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'VIN号',
    dataIndex: 'vin',
    key: 'vin',
  }, {
    title: '车牌号',
    dataIndex: 'carPlate',
    key: 'carPlate',
  }, {
    title: '车主姓名',
    dataIndex: 'master',
    key: 'master',
  }, {
    title: '车主电话',
    dataIndex: 'masterPhone',
    key: 'masterPhone',
  }, {
    title: 'bms编号',
    dataIndex: 'bmsCode',
    key: 'bmsCode',
  }, {
    title: '电池包编号',
    dataIndex: 'batsCode',
    key: 'batsCode',
  }, {
    title: '模组编号',
    dataIndex: 'moduleCode',
    key: 'moduleCode',
  }, {
    title: '单体电池编号',
    dataIndex: 'batCode',
    key: 'batCode',
  }, {
    title: '保养、维修时间',
    dataIndex: 'repairTime',
    key: 'repairTime',
  }, {
    title: '保养、维修时里程',
    dataIndex: 'repairMile',
    key: 'repairMile',
  }, {
    title: '保养、维修描述',
    dataIndex: 'repairDesc',
    key: 'repairDesc',
  }, {
    title: '故障起因',
    dataIndex: 'faultCause',
    key: 'faultCause',
  }, {
    title: '故障模式',
    dataIndex: 'faultModel',
    key: 'faultModel',
  }, {
    title: '保养、维修企业编码',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '保养、维修企业',
    dataIndex: 'repairCompany',
    key: 'repairCompany',
  }, {
    title: '保养、维修企业电话',
    dataIndex: 'repairPhone',
    key: 'repairPhone',
  }, {
    title: '保养、维修企业地址',
    dataIndex: 'repairAddress',
    key: 'repairAddress',
  }, {
    title: '保养、维修人',
    dataIndex: 'repairMan',
    key: 'repairMan',
  }, {
    title: '电池系统编号',
    dataIndex: 'sysCode',
    key: 'sysCode',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }];

  const searchFormProps = {
    handleSearch: null,
    forms: [
	 { label: 'VIN号', field: 'vin', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      {
        label: '维护类型', field: 'useType', type: 'Input'
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
