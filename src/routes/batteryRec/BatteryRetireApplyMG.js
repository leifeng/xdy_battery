import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryRetireApplyMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryRetireApplyMG({dispatch, batteryRetireApplyMG}) {
  console.log('batteryRetireApplyMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryRetireApplyMG;
  const dic = { 0: '女', 1: '男' }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryRetireApplyMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryRetireApplyMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryRetireApplyMG/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }
    }
  }

  const columns = [{
    title: '表单编码',
    dataIndex: 'listId',
    key: 'listId',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '电池包编号',
    dataIndex: 'batsCode',
    key: 'batsCode',
  }, {
    title: '电池检测时间',
    dataIndex: 'checkTime',
    key: 'checkTime',
  }, {
    title: '电池检测人',
    dataIndex: 'checkMan',
    key: 'checkMan',
  }, {
    title: '额定容量',
    dataIndex: 'capacity',
    key: 'capacity',
  }, {
    title: '电压',
    dataIndex: 'voltage',
    key: 'voltage',
  }, {
    title: '电池状态',
    dataIndex: 'retireStatus',
    key: 'retireStatus',
  }, {
    title: '废旧等级',
    dataIndex: 'junkClass',
    key: 'junkClass',
  }, {
    title: '废旧等级鉴定报告文件',
    dataIndex: 'checkFile',
    key: 'checkFile',
  }, {
    title: '实物照片文件',
    dataIndex: 'checkPic',
    key: 'checkPic',
  }, {
    title: '电池包编码照片',
    dataIndex: 'codePic',
    key: 'codePic',
  }, {
    title: '退役后处理方案',
    dataIndex: 'dealWay',
    key: 'dealWay',
  }, {
    title: '处理企业编码',
    dataIndex: 'dealCompanyId',
    key: 'dealCompanyId',
  }, {
    title: '电池使用时间',
    dataIndex: 'useDays',
    key: 'useDays',
  }, {
    title: '回收管理点编号',
    dataIndex: 'companyId',
    key: 'companyId',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '质量审核时间',
    dataIndex: 'qcCheckTime',
    key: 'qcCheckTime',
  }, {
    title: '质量审核人',
    dataIndex: 'qcCheckMan',
    key: 'qcCheckMan',
  }, {
    title: '审核备注',
    dataIndex: 'qcCheckRemark',
    key: 'qcCheckRemark',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return <span>
        <a onClick={() => openModal('edit', record)}>编辑</a>
      </span>
    }

  }];
  const searchFormProps = {
    handleSearch: null,
    forms: [
      { label: '表单编码', field: 'listId', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      { label: '废旧等级', field: 'junkClass', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'cur',
    openModal,
    tableProps: {
      data,
      columns,
      loading,
    },
    pageProps: {
      current,
      pageSize,
      total,
      onShowSizeChange(current, pageSize) {
        dispatch({
          type: 'batteryRetireApplyMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryRetireApplyMG/query',
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
        type: 'batteryRetireApplyMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryRetireApplyMG/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '表单编码', field: 'listId', type: 'Input' },
      { label: '电池包编号', field: 'batsCode', type: 'Input' },
      { label: '电池检测时间', field: 'checkTime', type: 'Input' },
      { label: '电池检测人', field: 'checkMan', type: 'Input' },
      { label: '额定容量', field: 'capacity', type: 'Input' },
      { label: '电压', field: 'voltage', type: 'Input' },
      { label: '电池状态', field: 'retireStatus', type: 'Input' },
      { label: '废旧等级', field: 'junkClass', type: 'Input' },
      { label: '废旧等级鉴定报告文件', field: 'checkFile', type: 'Input' },
      { label: '实物照片文件', field: 'checkPic', type: 'Input' },
      { label: '电池包编码照片', field: 'codePic', type: 'Input' },
      { label: '退役后处理方案', field: 'dealWay', type: 'Input' },
      { label: '处理企业编码', field: 'dealCompanyId', type: 'Input' },
      { label: '电池使用时间', field: 'useDays', type: 'Input' },
      { label: '回收管理点编号', field: 'companyId', type: 'Input' },
      { label: '状态', field: 'status', type: 'Input' },
      { label: '质量审核时间', field: 'qcCheckTime', type: 'Input' },
      { label: '质量审核人', field: 'qcCheckMan', type: 'InputNumber' },
      { label: '审核备注', field: 'qcCheckRemark', type: 'Input' },
      { label: '备注', field: 'remark', type: 'Input' }
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

BatteryRetireApplyMG.propTypes = {
};

function mapStateToProps({batteryRetireApplyMG}) {
  return { batteryRetireApplyMG }
}
export default connect(mapStateToProps)(BatteryRetireApplyMG);
