import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function NoticeMG({dispatch, dictionary, notice, menus}) {
  console.log('公告管理')
  const {selectedRowKeys, loading, data, pageSize, total, pageNo, visible, modalType, record, modalLoading, alertState, searchQuery} = notice;
  const menuLeaf = menus.menuLeaf ? menus.menuLeaf[location.pathname] : [];
  console.log(data)
  let t = -1;
  function onDeleteItem(id) {
    dispatch({
      type: 'notice/remove',
      id
    })
  }
  function openModal(type, record) {
    if (record) {
      dispatch({
        type: 'notice/recordState',
        data: {
          modalType: type,
          record
        }
      })
    } else {
      if (type === 'add') {
        dispatch({
          type: 'notice/recordState',
          data: {
            modalType: type,
            record: null
          }
        })
      } else {
        dispatch({
          type: 'notice/openModalState',
          data: type
        })
      }

    }

  }

  const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    title: '时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {menuLeaf.indexOf('update') !== -1 ? <span><a onClick={() => openModal('edit', record)}>编辑</a><span className="ant-divider" /></span> : null}
        {menuLeaf.indexOf('delete') !== -1 ? <span><Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}><a>删除</a></Popconfirm><span className="ant-divider" /></span> : null}
      </span>
    ),
  }];

  const searchFormProps = {
    handleChange(query) {
      dispatch({
        type: 'notice/searchQueryChangeState',
        data: {
          name: query.name,
          value: query.value
        }
      })
    },
    handleSearch(searchForm) {
      dispatch({
        type: 'notice/query',
        args: {
          pageNo: 1
        }
      })
    },
    handleResetQuery() {
      dispatch({
        type: 'notice/searchQueryState',
        data: null
      })
    },
    forms: [
      { label: '标题', field: 'title', type: 'Input' },
    ]
  };

  const tableListProps = {
    curd: 'r',
    openModal,
    deleteForids() {
      dispatch({
        type: 'notice/removeIds'
      })
    },
    auth: menuLeaf,
    tableProps: {
      rowKey: 'id',
      data,
      columns,
      selectedRowKeys,
      loading,
      rowSelection: {
        onChange(selectedRowKeys, selectedRows) {
          dispatch({
            type: 'notice/selectedRowKeysState',
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
          type: 'notice/query',
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
          type: 'notice/create',
          args: data
        })
      } else {
        dispatch({
          type: 'notice/update',
          args: data
        })
      }
    },
    onCancel() {
      dispatch({
        type: 'notice/closeModalState'
      })
    },
    modalForms: [
      { label: '标题', field: 'title', type: 'Input' ,
       rules: [{ required: true, message: '标题长度为1~20', min: 1, max: 20}]
      },
      { label: '内容', field: 'content', type: 'TextArea' },
    ]

  }

  return (
    <div>
      <SearchForm {...searchFormProps} />
      <TableList {...tableListProps} />
      <Modalcus {...modalcusProps} />
    </div>
  );
}

NoticeMG.propTypes = {
};

function mapStateToProps({dictionary, notice, menus}) {
  return { dictionary, notice, menus }
}
export default connect(mapStateToProps)(NoticeMG);
