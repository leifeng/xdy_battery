import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRecNoticeMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
function BatteryRecNoticeMG({dispatch, batteryRecNoticeMG}) {
  console.log('batteryRecNoticeMG')
  const {loading, data, pageSize, total, current} = batteryRecNoticeMG;
  const dic = { 0: '女', 1: '男' }

  const columns = [
    // {
    //   title: '电池包编号',
    //   dataIndex: 'batsId',
    //   key: 'batsId',
    //   render: text => <a href="#">{text}</a>,
    // }, {
    //   title: '模组编号',
    //   dataIndex: 'batId',
    //   key: 'batId',
    // }, {
    //   title: '执行情况',
    //   dataIndex: 'execStatus',
    //   key: 'execStatus',
    // }, {
    //   title: '更换电池编号',
    //   dataIndex: 'replaceBatsId',
    //   key: 'replaceBatsId',
    // }, {
    //   title: '更换电池模组编号',
    //   dataIndex: 'replaceBatId',
    //   key: 'replaceBatId',
    // }, {
    //   title: '执行内容',
    //   dataIndex: 'execContent',
    //   key: 'execContent',
    // }, {
    //   title: '执行厂商',
    //   dataIndex: 'execCompany',
    //   key: 'execCompany',
    // }, {
    //   title: '执行时间',
    //   dataIndex: 'execTime',
    //   key: 'execTime',
    // }, {
    //   title: '执行地点',
    //   dataIndex: 'execAddress',
    //   key: 'execAddress',
    // }, {
    //   title: '执行人',
    //   dataIndex: 'execMan',
    //   key: 'execMan',
    // }, {
    //   title: '备注',
    //   dataIndex: 'remark',
    //   key: 'remark',
    // }

    {
      title: '更换单号',
      dataIndex: 'replaceId',
      key: 'replaceId',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '通知时间',
      dataIndex: 'noticeTime',
      key: 'noticeTime',
    },
    {
      title: '通知企业编号',
      dataIndex: 'companyId',
      key: 'companyId',
    }, {
      title: '通知企业名称',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '通知企业电话',
      dataIndex: 'companyPhone',
      key: 'companyPhone',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '确认时间',
      dataIndex: 'sureTime',
      key: 'sureTime',
    }, {
      title: '确认人',
      dataIndex: 'sureMan',
      key: 'sureMan',
    }, {
      title: '作废时间',
      dataIndex: 'invalidTime',
      key: 'invalidTime',
    }, {
      title: '创单时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }
  ];

  const searchFormProps = {
    handleSearch(searchForm) {
      dispatch({
        type: 'batteryRecNoticeMG/query',
        args: {
          searchForm
        }
      })
    },
    forms: [
      { label: '更换单号', field: 'batType', type: 'Input' },
      { label: '通知企业名称', field: 'batCode', type: 'Input' },
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
          type: 'batteryRecNoticeMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRecNoticeMG/query',
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

BatteryRecNoticeMG.propTypes = {
};

function mapStateToProps({batteryRecNoticeMG}) {
  return { batteryRecNoticeMG }
}
export default connect(mapStateToProps)(BatteryRecNoticeMG);
