import React, { Component } from 'react';
import { Table, Button, Icon, Popconfirm } from 'antd'
import styles from './index.less'

class TableList extends Component {
  constructor() {
    super();
    this.state = {
      lastExpand: []
    }
    this.onExpandedRowsChange = this.onExpandedRowsChange.bind(this);
  }
  onExpandedRowsChange(expandedRows) {
    this.setState({
      lastExpand: expandedRows.length > 0 ? [expandedRows.pop()] : []
    })
  }
  render() {
    const {tableProps, pageProps, openModal, deleteForids, curd, auth} = this.props;
    const {rowSelection = null, columns, data, rowKey, selectedRowKeys = [], loading, expandedRowRender} = tableProps;
    const {onShowSizeChange = null, onChange, pageSize, pageNo, total} = pageProps;

    const hasSelected = selectedRowKeys.length > 0;
    const pagination = {
      current: pageNo,
      pageSize: pageSize,
      total,
      size: 'big',
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条记录`,
      showSizeChanger: false,
      onShowSizeChange,
      onChange
    };
    const rowSelectionProps = {
      ...rowSelection,
      selectedRowKeys
    }
    const Btn = () => <Button type="primary-del" disabled={!hasSelected} style={{ display: auth.indexOf('batchDel') !== -1 ? 'inline-block' : 'none' }}><Icon type="delete" />批量删除</Button>;
    const DeleteBtn = () => !hasSelected ? <Btn /> : <Popconfirm title="确定要删除所选数据吗？" onConfirm={deleteForids}><Btn /> </Popconfirm>;

    return (

      <div className={styles.tablelist}>

        <div className={styles.delall}>
          <Button type="primary" onClick={() => { openModal('add') }} style={{ display: auth.indexOf('insert') !== -1 ? 'inline-block' : 'none' }}><Icon type="plus" />添加</Button>
          <DeleteBtn />
        </div>

        <Table
          rowSelection={auth.indexOf('delete') !== -1 ? rowSelectionProps : null}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pagination}
          rowKey={rowKey}
          expandedRowKeys={this.state.lastExpand}
          expandedRowRender={expandedRowRender}
          onExpandedRowsChange={this.onExpandedRowsChange}
          size="middle"
        />


      </div>
    )
  }
}

TableList.defaultProps = {
  auth: [],
  curd: 'curd',
  tableProps: null,
  pageProps: null,
  openModal: () => { },
  deleteForids: () => { }
}
export default TableList;
