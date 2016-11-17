import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './EnterpriseMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function EnterpriseMG({dispatch, enterpriseMG}) {
  console.log('enterpriseMG')
  const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = enterpriseMG;
  const dic = { 0: '女', 1: '男' }

  function onDeleteItem(id) {
    dispatch({
      type: 'enterpriseMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'enterpriseMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      dispatch({
        type: 'enterpriseMG/visibleState',
        data: {
          modalType: type,
          visible: true
        }
      })
    }
  }
  const columns = [{
    title: '名称',
    dataIndex: 'company',
    key: 'company',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '简称',
    dataIndex: 'nickName',
    key: 'nickName',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '经度',
    dataIndex: 'longitude',
    key: 'longitude',
  }, {
    title: '纬度',
    dataIndex: 'latitude',
    key: 'latitude',
  }, {
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  }, {
    title: '联系电话',
    dataIndex: 'linkMobile',
    key: 'linkMobile',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  }, {
    title: '修改时间',
    dataIndex: 'editTime',
    key: 'editTime',
  }, {
    title: '修改人',
    dataIndex: 'editor',
    key: 'editor',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
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
            type: 'enterpriseMG/selectedRowKeysState',
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
          type: 'enterpriseMG/query',
          args: {
            pageSize
          }
        })
      },
      onChange(current) {
        dispatch({
          type: 'enterpriseMG/query',
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
        type: 'enterpriseMG/visibleState',
        data: false
      })
    },
    onCancel() {
      dispatch({
        type: 'enterpriseMG/visibleState',
        data: false
      })
    },
    modalForms: [
      { label: '用户名', field: 'name', type: 'Input' },
      { label: '年龄', field: 'age', type: 'InputNumber' },
      { label: '地址', field: 'address', type: 'Input' },
      {
        label: '性别', field: 'sex', type: 'Radio', dic: [
          { name: '男', value: 1 },
          { name: '女', value: 0 }
        ]
      }
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

EnterpriseMG.propTypes = {
};

function mapStateToProps({enterpriseMG}) {
  return { enterpriseMG }
}
export default connect(mapStateToProps)(EnterpriseMG);
