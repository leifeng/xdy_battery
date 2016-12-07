import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './StockStatisticsMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function StockStatisticsMG({dispatch, stockStatisticsMG}) {
  console.log('stockStatisticsMG')
  const {loading, data, pageSize, total, current} = stockStatisticsMG;
  const dic = { 0: '女', 1: '男' }

  const columns = [{
    title: '退役单号',
    dataIndex: 'recycleId',
    key: 'recycleId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '电池包编号',
    dataIndex: 'batsCode',
    key: 'batsCode',
  }, {
    title: '电池种类',
    dataIndex: 'batKind',
    key: 'batKind',
  }, {
    title: '回收企业编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '回收企业',
    dataIndex: 'company',
    key: 'company',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '入库时间',
    dataIndex: 'inTime',
    key: 'inTime',
  }, {
    title: '处理时间',
    dataIndex: 'dealTime',
    key: 'dealTime',
  }, {
    title: '备注',
    dataIndex: 'reamk',
    key: 'reamk',
  }];

  const searchFormProps = {
    handleSearch: null,
     forms: [
      { label: '退役单号', field: 'recycleId', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      { label: '回收企业', field: 'recycleCompany', type: 'Input' },
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
          type: 'stockStatisticsMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'stockStatisticsMG/query',
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

StockStatisticsMG.propTypes = {
};

function mapStateToProps({stockStatisticsMG}) {
  return { stockStatisticsMG }
}
export default connect(mapStateToProps)(StockStatisticsMG);
