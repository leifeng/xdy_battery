import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRetireSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRetireSet({dispatch, batteryRetireSet}) {
  console.log('batteryRetireSet')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRetireSet;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'batteryRetireSet/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRetireSet/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryRetireSet/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryRetireSet/visibleState',
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
  }, {
    title: '动力电池退役时电池状态',
    dataIndex: 'retireStatus',
    key: 'retireStatus',
  }, {
    title: '动力电池退役后处理方案',
    dataIndex: 'dealWay',
    key: 'dealWay',
  }, {
    title: '处理企业（梯次或回收）',
    dataIndex: 'usedCompany',
    key: 'usedCompany',
  }, {
    title: '电池包废旧等级',
    dataIndex: 'temp1',
    key: 'temp1',
  }, {
    title: '电池包废旧等级鉴定报告文件',
    dataIndex: 'temp2',
    key: 'temp2',
  }, {
    title: '电池包实物照片文件',
    dataIndex: 'temp3',
    key: 'temp3',
  }, {
    title: '备用1',
    dataIndex: 'temp4',
    key: 'temp4',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '质量审核时间',
    dataIndex: 'checkTime',
    key: 'checkTime',
  }, {
    title: '质量审核人',
    dataIndex: 'checkMan',
    key: 'checkMan',
  }, {
    title: '审核备注',
    dataIndex: 'checkRemark',
    key: 'checkRemark',
  }, {
    title: '修改备注',
    dataIndex: 'editRemark',
    key: 'editRemark',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '电池包编号', field: 'batsId', type: 'Input' },
      { label: '电池模组', field: 'batId', type: 'Input' },
      { label: '车辆vin', field: 'vin', type: 'Input' },
      { label: '回收企业', field: 'recycleCompany', type: 'Input' },
      { label: '安装时间', field: 'setTime', type: 'DatePicker' },
      { label: '退役时间', field: 'retireTime', type: 'DatePicker' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
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
            type: 'batteryRetireSet/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
      expandedRowRender:(recode)=>{
        return <p>2</p>
      }
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRetireSet/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRetireSet/query',
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
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRetireSet/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '电池包编号', field: 'batsId', type: 'Input' },
      { label: '电池模组', field: 'batId', type: 'Input' },
      { label: '车辆vin', field: 'vin', type: 'Input' },
      { label: '回收企业', field: 'recycleCompany', type: 'Input' },
      { label: '安装时间', field: 'setTime', type: 'DatePicker' },
      { label: '退役时间', field: 'retireTime', type: 'DatePicker' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      },
      { label: '备注', field: 'remark', type: 'TextArea' }

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

BatteryRetireSet.propTypes = {
};

function mapStateToProps({batteryRetireSet}) {
  return { batteryRetireSet }
}
export default connect(mapStateToProps)(BatteryRetireSet);
