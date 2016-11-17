import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './UsersAuthMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function UsersAuthMG({dispatch, usersAuthMG}) {
    console.log('UsersAuthMG')
    const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = usersAuthMG;
    console.log(visible)
    const dic = { 0: '女', 1: '男' }

    function onDeleteItem(id) {
        dispatch({
            type: 'usersAuthMG/remove',
            id
        })
    }
    function openModal(type, record) {
        if (record) {
            dispatch({
                type: 'usersAuthMG/recordState',
                data: {
                    modalType: type,
                    record
                }
            })
        } else {
            if (type === 'add') {
                dispatch({
                    type: 'usersAuthMG/recordState',
                    data: {
                        modalType: type,
                        record: null
                    }
                })
            } else {
                dispatch({
                    type: 'usersAuthMG/visibleState',
                    data: {
                        modalType: type,
                        visible: true
                    }
                })
            }
        }
    }
    const columns = [{
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
    }, {
        title: '角色编号',
        dataIndex: 'roleId',
        key: 'roleId',
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
        handleSearch: null,
        forms: [
            { label: '用户编号', field: 'userId', type: 'Input' },
            { label: '角色编号', field: 'roleId', type: 'Input' },
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
                type: 'usersAuthMG/visibleState',
                data: false
            })
        },
        onCancel() {
            dispatch({
                type: 'usersAuthMG/visibleState',
                data: false
            })
        },
        modalForms: [
            { label: '用户编号', field: 'userId', type: 'Input' },
            { label: '角色编号', field: 'roleId', type: 'Input' },
            {
                label: '状态', field: 'status', type: 'Select', dic: [
                    { name: '可用', value: 1 },
                    { name: '不可用', value: 0 }
                ]
            },
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

UsersAuthMG.propTypes = {
};

function mapStateToProps({usersAuthMG}) {
    return { usersAuthMG }
}
export default connect(mapStateToProps)(UsersAuthMG);
