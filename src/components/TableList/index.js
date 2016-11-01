import React from 'react';
import { Table, Button, Icon } from 'antd'
import styles from './index.less'

function TableList({tableProps, pageProps, openModal, curd}) {
  console.log('TableList')
  const {rowSelection = null, columns, data, selectedRowKeys = [], loading, expandedRowRender = null} = tableProps;
  const {onShowSizeChange, onChange, pageSize, current, total} = pageProps;


  const hasSelected = selectedRowKeys.length > 0;
  const pagination = {
    current,
    pageSize,
    total,
    showSizeChanger: true,
    onShowSizeChange,
    onChange
  };
  return (
    <div>
      <div className={styles.delall}>
        <Button type="primary" onClick={() => { openModal('add') } } style={{ display: curd.indexOf('c') !== -1 ? 'inline-block' : 'none' }}><Icon type="plus" />添加</Button>
        <Button type="primary" disabled={!hasSelected} style={{ display: curd.indexOf('d') !== -1 ? 'inline-block' : 'none' }}><Icon type="delete" />批量删除</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        rowKey={record => record.id}
        expandedRowRender={record => <p>{record.haha}</p>}
        size="middle"
        />
    </div>
  )
}
TableList.defaultProps = {
  curd: 'curd',
  tableProps: null,
  pageProps: null,
  openModal:()=>{}
}
export default TableList;
