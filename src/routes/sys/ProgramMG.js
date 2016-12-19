import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './ProgramMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function ProgramMG({dispatch, programMG}) {
  console.log('程序管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = programMG;

  function onDeleteItem(id) {
    dispatch({
      type: 'programMG/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'programMG/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'programMG/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'programMG/openModalState',
          data: type
        })
      }

    }

  }
  const columns = [{
    title: '程序名称',
    dataIndex: 'program',
    key: 'program',
  }, {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  }, {
    title: '节点类型',
    dataIndex: 'nodeType',
    key: 'nodeType',
  }, {
    title: '序列',
    dataIndex: 'sequence',
    key: 'sequence',
  }, {
    title: '父id',
    dataIndex: 'parentId',
    key: 'parentId',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
    handleChange(query) {
      dispatch({
        type: 'programMG/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'programMG/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'programMG/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '程序名称', field: 'program', type: 'Input' },
      { label: '路径', field: 'path', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Select', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ]
      }
    ]

  };

  const tableListProps = {
    curd: 'curd',
    openModal,
    tableProps: {
      rowKey: 'id',
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'programMG/selectedRowKeysState',
            data: selectedRowKeys
          })
        }
      },
    },
    pageProps: {
      pageNo,
      pageSize,
      total,
      onChange(current) {
        dispatch({
          type: 'programMG/query',
          args: {
            pageNo: current
          }
        })
      },
    }
  };
  const modalcusProps = {
    alertState,
    modalLoading,
    modalType,
    visible,
    record,
    title: modalType === 'add' ? '新增数据' : '编辑数据',
    onSave(data) {
      if (modalType === "add") {
        dispatch({
          type: 'programMG/create',
          args: data
        })
      } else {
        dispatch({
          type: 'programMG/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'programMG/closeModalState',
        data: false
      })
    },
    modalForms: [
      { label: '程序名称', field: 'program', type: 'Input' },
      { label: '路径', field: 'path', type: 'Input' },
      { label: '节点类型', field: 'nodeType', type: 'Input' },
      { label: '序列', field: 'sequence', type: 'Input' },
      { label: '父id', field: 'parentId', type: 'Input' },
      {
        label: '状态', field: 'status', type: 'Radio', dic: [
          { name: '可用', value: 1 },
          { name: '不可用', value: 0 }
        ],
        rules: [{ type: "number", required: true, message: '请选择状态' }]
      },
      { label: '备注', field: 'remark', type: 'TextArea' }

    ]
  }


  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />;
        </div>
  );
}

ProgramMG.propTypes = {
};

function mapStateToProps({programMG}) {
  return { programMG }
}
export default connect(mapStateToProps)(ProgramMG);
