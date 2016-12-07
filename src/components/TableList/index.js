import React from 'react';
import { Table, Button, Icon } from 'antd'
import styles from './index.less'

function TableList({tableProps, pageProps, openModal, deleteForids, curd}) {
  console.log('TableList')
  const {rowSelection = null, columns, data, rowKey, selectedRowKeys = [], loading, expandedRowRender } = tableProps;
  const {onShowSizeChange, onChange, pageSize, current, total} = pageProps;


  const hasSelected = selectedRowKeys.length > 0;
  const pagination = {
    current,
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
        <Button type="primary-del" onClick={deleteForids} disabled={!hasSelected} style={{ display: curd.indexOf('d') !== -1 ? 'inline-block' : 'none' }}><Icon type="delete" />批量删除</Button>
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
