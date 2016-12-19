import React from 'react';
import { Table, Button, Icon, Popconfirm } from 'antd'
import styles from './index.less'

function TableList({tableProps, pageProps, openModal, deleteForids, curd}) {
  console.log('TableList')
  const {rowSelection = null, columns, data, rowKey, selectedRowKeys = [], loading, expandedRowRender } = tableProps;
  const {onShowSizeChange = null, onChange, pageSize, pageNo, total} = pageProps;


  const hasSelected = selectedRowKeys.length > 0;
  const pagination = {
    current: pageNo,
    pageSize,
    total,
    size: 'big',
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条记录`,
    showSizeChanger: false,
    onShowSizeChange,
    onChange
  };
  return (
    <div className={styles.tablelist}>
      <div className={styles.delall}>
        <Button type="primary" onClick={() => { openModal('add') } } style={{ display: curd.indexOf('c') !== -1 ? 'inline-block' : 'none' }}><Icon type="plus" />添加</Button>
        <Popconfirm title="确定要删除所选数据吗？" onConfirm={deleteForids}>
          <Button type="primary-del" disabled={!hasSelected} style={{ display: curd.indexOf('d') !== -1 ? 'inline-block' : 'none' }}><Icon type="delete" />批量删除</Button>
        </Popconfirm>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        rowKey={rowKey}
        expandedRowRender={expandedRowRender}
        size="middle"
        />
    </div>
  )
}
TableList.defaultProps = {
  curd: 'curd',
  rowKey: 'id',
  tableProps: null,
  pageProps: null,
  openModal: () => { },
  deleteForids: () => { }
}
export default TableList;
