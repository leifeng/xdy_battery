import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './UsersMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function UsersMG({dispatch, usersMG}) {
    console.log('UsersMG')
    const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = usersMG;
    const dic = { 0: '女', 1: '男' }
    function onDeleteItem(id) {
        dispatch({
            type: 'usersMG/remove',
            id
        })
    }
    function openModal(type, record) {
        if (record) {
            dispatch({
                type: 'usersMG/recordState',
                data: {
                    modalType: type,
                    record
                }
            })
        } else {
            if (type === 'add') {
                dispatch({
                    type: 'usersMG/recordState',
                    data: {
                        modalType: type,
                        record: null
                    }
                })
            } else {
                dispatch({
                    type: 'usersMG/visibleState',
                    data: {
                        modalType: type,
                        visible: true
                    }
                })
            }

        }

    }
    const columns = [{
        title: '账号',
        dataIndex: 'account',
        key: 'account',
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
    }, {
        title: '用户类型',
        dataIndex: 'userType',
        key: 'userType',
    }, {
        title: '所属企业编码',
        dataIndex: 'companyId',
        key: 'companyId',
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    }, {
        title: '到期日期',
        dataIndex: 'dueDate',
        key: 'dueDate',
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
                <span className="ant-divider" />
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
                    <a>删除</a>
                </Popconfirm>
            </span>
        }

    }];
    const searchFormProps = {
        handleSearch(searchForm) {
            dispatch({
                type: 'usersMG/query',
                args: {
                    searchForm
                }
            })
        },
        forms: [
            { label: '账号', field: 'account', type: 'Input' },
            { label: '名称', field: 'name', type: 'Input' },
            {
                label: '用户类型', field: 'userType', type: 'Select', dic: [
                    { name: '知豆用户', value: 1 },
                    { name: '企业用户', value: 0 }
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
                        type: 'usersMG/selectedRowKeysState',
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
                    type: 'usersMG/query',
                    args: {
                        pageSize
                    }
                })
            },
            onChange(current) {
                dispatch({
                    type: 'usersMG/query',
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
                type: 'usersMG/visibleState',
                data: false
            })
        },
        onCancel() {
            dispatch({
                type: 'usersMG/visibleState',
                data: false
            })
        },
        modalForms: [
            { label: '账号', field: 'account', type: 'Input' },
            { label: '名称', field: 'name', type: 'Input' },
            { label: '昵称', field: 'nickName', type: 'Input' },
            {
                label: '用户类型', field: 'userType', type: 'Select', dic: [
                    { name: '知豆用户', value: 1 },
                    { name: '企业用户', value: 0 }
                ]
            },
            {
                label: '所属企业编码', field: 'companyId', type: 'Select', dic: [
                    { name: '知豆用户', value: 1 },
                    { name: '企业用户', value: 0 }
                ]
            },
            {
                label: '状态', field: 'status', type: 'Radio', dic: [
                    { name: '可用', value: 1 },
                    { name: '不可用', value: 0 }
                ]
            },
            { label: '到期日期', field: 'dueDate', type: 'DatePicker' },
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

UsersMG.propTypes = {
};

function mapStateToProps({usersMG}) {
    return { usersMG }
}
export default connect(mapStateToProps)(UsersMG);
