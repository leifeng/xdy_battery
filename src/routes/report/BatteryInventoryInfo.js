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
    title: '回收管理点编号',
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
    title: '结束时间',
    dataIndex: 'dealTime',
    key: 'dealTime',
  }, {
    title: '备注',
    dataIndex: 'reamk',
    key: 'reamk',
  }, {
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
      { label: '退役单号', field: 'recycleId', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      { label: '回收企业', field: 'company', type: 'Input' },
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
      { label: '退役单号', field: 'recycleId', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      { label: '电池种类', field: 'batKind', type: 'Input' },
      { label: '回收管理点编号', field: 'companyId', type: 'Input' },
      { label: '回收企业', field: 'company', type: 'Input' },
      { label: '状态', field: 'status', type: 'Input' },
      { label: '入库时间', field: 'inTime', type: 'Input' },
      { label: '结束时间', field: 'dealTime', type: 'Input' },
      { label: '备注', field: 'reamk', type: 'Input' },
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
