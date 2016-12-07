import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './BatteryInfoTable.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function BatteryInfoTable({dispatch, batteryInfoTable}) {
  console.log('BatteryInfoTable')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = batteryInfoTable;
  const dic = { 0: '女', 1: '男' }
  function onDeleteItem(id) {
    dispatch({
      type: 'batteryInfoTable/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'batteryInfoTable/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'batteryInfoTable/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'batteryInfoTable/visibleState',
          data: {
            modalType: type,
            visible: true
          }
        })
      }

    }

  }
  const columns = [{
    title: '电池类型',
    dataIndex: 'batType',
    key: 'batType',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '电池编号',
    dataIndex: 'batCode',
    key: 'batCode',
  }, {
    title: '电池种类',
    dataIndex: 'batKind',
    key: 'batKind',
  }, {
    title: 'VIN',
    dataIndex: 'vin',
    key: 'vin',
  }, {
    title: '生产日期',
    dataIndex: 'productTime',
    key: 'productTime',
  },{
    title: '生产地点',
    dataIndex: 'productAddress',
    key: 'productAddress',
  }, {
    title: '生产企业',
    dataIndex: 'productCompany',
    key: 'productCompany',
  }, {
    title: '生产企业电话',
    dataIndex: 'productPhone',
    key: 'productPhone',
  }, {
    title: 'bms编号',
    dataIndex: 'bmsCode',
    key: 'bmsCode',
  }, {
    title: 'bms供应商商编号',
    dataIndex: 'supplierId',
    key: 'supplierId',
  }, {
    title: 'bms供应商名称',
    dataIndex: 'supplier',
    key: 'supplier',
  }, {
    title: 'bms供应商电话',
    dataIndex: 'supplierPhone',
    key: 'supplierPhone',
  }, {
    title: '车辆种类',
    dataIndex: 'carKind',
    key: 'carKind',
  },{
    title: '车型',
    dataIndex: 'carType',
    key: 'carType',
  }, {
    title: '整车质量',
    dataIndex: 'quality',
    key: 'quality',
  }, {
    title: '颜色',
    dataIndex: 'color',
    key: 'color',
  }, {
    title: '经销商编号',
    dataIndex: 'sellerId',
    key: 'sellerId',
  },{
    title: '经销商名称',
    dataIndex: 'seller',
    key: 'seller',
  }, {
    title: '经销商地址',
    dataIndex: 'sellerAddress',
    key: 'sellerAddress',
  }, {
    title: '经销商电话',
    dataIndex: 'sellerPhone',
    key: 'sellerPhone',
  }, {
    title: '销售时间',
    dataIndex: 'sellTime',
    key: 'sellTime',
  },{
    title: '销往省',
    dataIndex: 'sellProvince',
    key: 'sellProvince',
  }, {
    title: '销往市',
    dataIndex: 'sellCity',
    key: 'sellCity',
  }, {
    title: '终端用户姓名',
    dataIndex: 'master',
    key: 'master',
  }, {
    title: '用户电话',
    dataIndex: 'masterPhone',
    key: 'masterPhone',
  },{
    title: '用户地址',
    dataIndex: 'masterAddress',
    key: 'masterAddress',
  }, {
    title: '车牌号',
    dataIndex: 'carPlate',
    key: 'carPlate',
  }, {
    title: '上牌时间',
    dataIndex: 'licensingTime',
    key: 'licensingTime',
  }, {
    title: '证件类型',
    dataIndex: 'cardType',
    key: 'cardType',
  },{
    title: '证件号码',
    dataIndex: 'cardId',
    key: 'cardId',
  }, {
    title: '营业执照',
    dataIndex: 'businessLicence',
    key: 'businessLicence',
  }, {
    title: '备注',
    dataIndex: 'remak',
    key: 'remak',
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
      { label: '电池类型', field: 'batType', type: 'Input' },
      { label: '电池编号', field: 'batCode', type: 'Input' },
      { label: 'VIN', field: 'vin', type: 'Input' },
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
            type: 'batteryInfoTable/selectedRowKeysState',
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
          type: 'batteryInfoTable/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'batteryInfoTable/query',
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
        type: 'batteryInfoTable/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'batteryInfoTable/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '电池类型', field: 'batType', type: 'Input' },
      { label: '电池编号', field: 'batCode', type: 'InputNumber' },
      { label: '电池种类', field: 'batKind', type: 'Input' },
       { label: 'VIN', field: 'vin', type: 'Input' },
      { label: '生产日期', field: 'productTime', type: 'InputNumber' },
      { label: '生产地点', field: 'productAddress', type: 'Input' },
       { label: '生产企业', field: 'productCompany', type: 'Input' },
      { label: '生产企业电话', field: 'productPhone', type: 'InputNumber' },
      { label: 'bms编号', field: 'bmsCode', type: 'Input' },
       { label: 'bms供应商商编号', field: 'supplierId', type: 'Input' },
      { label: 'bms供应商名称', field: 'supplier', type: 'InputNumber' },
      { label: 'bms供应商电话', field: 'supplierPhone', type: 'Input' },
       { label: '车辆种类', field: 'carKind', type: 'Input' },
      { label: '车型', field: 'carType', type: 'InputNumber' },
      { label: '整车质量', field: 'quality', type: 'Input' },
       { label: '颜色', field: 'color', type: 'Input' },
      { label: '经销商编号', field: 'sellerId', type: 'InputNumber' },
      { label: '经销商名称', field: 'seller', type: 'Input' },
       { label: '经销商地址', field: 'sellerAddress', type: 'Input' },
      { label: '经销商电话', field: 'sellerPhone', type: 'InputNumber' },
      { label: '销售时间', field: 'sellTime', type: 'Input' },
       { label: '销往省', field: 'sellProvince', type: 'Input' },
      { label: '销往市', field: 'sellCity', type: 'InputNumber' },
      { label: '终端用户姓名', field: 'master', type: 'Input' },
       { label: '用户电话', field: 'masterPhone', type: 'Input' },
      { label: '用户地址', field: 'masterAddress', type: 'InputNumber' },
      { label: '车牌号', field: 'carPlate', type: 'Input' },
       { label: '上牌时间', field: 'licensingTime', type: 'Input' },
      { label: '证件类型', field: 'cardType', type: 'InputNumber' },
      { label: '证件号码', field: 'cardId', type: 'Input' },
       { label: '营业执照', field: 'businessLicence', type: 'Input' },
      { label: '备注', field: 'remak', type: 'InputNumber' }
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

BatteryInfoTable.propTypes = {
};
function mapStateToProps({batteryInfoTable}) {
  return { batteryInfoTable }
}
export default connect(mapStateToProps)(BatteryInfoTable);
