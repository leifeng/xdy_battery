import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './RolesMG.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function RolesMG({dispatch, rolesMG}) {
    console.log('RoleMG')
    const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = rolesMG;
    const dic = { 0: '女', 1: '男' }
    console.log(loading)
    function onDeleteItem(id) {
        dispatch({
            type: 'rolesMG/remove',
            id
        })
    }
    function openModal(type, record) {
        if (record) {
            dispatch({
                type: 'rolesMG/recordState',
                data: {
                    modalType: type,
                    record
                }
            })
        } else {
            if (type === 'add') {
                dispatch({
                    type: 'rolesMG/recordState',
                    data: {
                        modalType: type,
                        record: null
                    }
                })
            } else {
                dispatch({
                    type: 'rolesMG/visibleState',
                    data: {
                        modalType: type,
                        visible: true
                    }
                })
            }
        }
    }
    const columns = [{
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
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
        handleSearch(searchForm) {
            dispatch({
                type: 'rolesMG/query',
                args: {
                    searchForm
                }
            })
        },
        forms: [
            { label: '角色名称', field: 'name', type: 'Input' },
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
        deleteForids() {
            dispatch({
                type: 'rolesMG/removeForids',
                ids: selectedRowKeys
            })
        },
        tableProps: {
            data,
            columns,
            selectedRowKeys,
            loading,
            rowSelection: {
                onChange(selectedRowKeys, selectedRows) {
                    dispatch({
                        type: 'rolesMG/selectedRowKeysState',
                        data: selectedRowKeys
                    })
                }
            },
        },
        pageProps: {
            current,
            pageSize,
            total,
            onChange(current) {
                dispatch({
                    type: 'rolesMG/query',
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
        onOk(args) {
            if (modalType === 'add') {
                dispatch({
                    type: 'rolesMG/create',
                    args
                })
            } else {
                dispatch({
                    type: 'rolesMG/update',
                    args,
                })
            }

        },
        onCancel() {
            dispatch({
                type: 'rolesMG/visibleState',
                data: false
            })
        },
        modalForms: [
            { label: '角色名称', field: 'name', type: 'Input' },
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

RolesMG.propTypes = {
};

function mapStateToProps({rolesMG}) {
    return { rolesMG }
}
export default connect(mapStateToProps)(RolesMG);
