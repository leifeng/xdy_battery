import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryInventoryInfo.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryInventoryInfo({dispatch, batteryInventoryInfo}) {
  console.log('batteryInventoryInfo')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryInventoryInfo;
  const dic = { 0: '女', 1: '男' }
  function onDeleteItem(id) {
    dispatch({
      type: 'batteryInventoryInfo/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryInventoryInfo/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryInventoryInfo/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryInventoryInfo/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }

    }

  }
  const columns = [{
    title: '电池包编号',
    dataIndex: 'batsId',
    key: 'batsId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '电池模组',
    dataIndex: 'batId',
    key: 'batId',
  }, {
    title: '车辆vin',
    dataIndex: 'vin',
    key: 'vin',
  }, {
    title: '回收企业',
    dataIndex: 'recycleCompany',
    key: 'recycleCompany',
  }, {
    title: '安装时间',
    dataIndex: 'setTime',
    key: 'setTime',
  }, {
    title: '退役时间',
    dataIndex: 'retireTime',
    key: 'retireTime',
  }, 
  , {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '质量审核人',
    dataIndex: 'checkMan',
    key: 'checkMan',
  }, {
    title: '质量审核时间',
    dataIndex: 'checkTime',
    key: 'checkTime',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    }

  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '用户名' }
    ]
  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    tableProps: {
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'batteryInventoryInfo/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryInventoryInfo/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryInventoryInfo/query',
          args: {
            current
          }
        })
      },
    }
  };
  const modalcusProps = {
    visible,
    record,
    title: modalType === 'add' ? '新增数据' : '编辑数据',
    onOk() {
      dispatch({
        type: 'batteryInventoryInfo/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryInventoryInfo/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '账号', field: 'account', type: 'Input' },
      { label: '名称', field: 'name', type: 'Input' },
      { label: '昵称', field: 'nickName', type: 'Input' },
      { label: '用户类型', field: 'userType', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Radio', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '到期日期', field: 'dueDate', type: 'DatePicker' },
      { label: '结束日期', field: 'endDate', type: 'DatePicker' },
    ]
  }
  const NewModalcus = () =>
    <Modalcus {...modalcusProps} />;

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <NewModalcus />
    </div>
  );
}

BatteryInventoryInfo.propTypes = {
};

function mapStateToProps({batteryInventoryInfo}) {
  return { batteryInventoryInfo }
}
export default connect(mapStateToProps)(BatteryInventoryInfo);
