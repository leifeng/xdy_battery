import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './SysParamsSet.less';
import { Popconfirm } from 'antd';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Modalcus from '../../components/Modalcus';

function SysParamsSet({dispatch, sysParamsSet}) {
    console.log('SysParamsSet')
    const {selectedRowKeys, loading, data, pageSize, total, current, visible, modalType, record} = sysParamsSet;
    const dic = { 0: '女', 1: '男' }

    function onDeleteItem(id) {
        dispatch({
            type: 'sysParamsSet/remove',
            id
        })
    }
    function openModal(type, record) {
        if (record) {
            dispatch({
                type: 'sysParamsSet/recordState',
                data: {
                    modalType: type,
                    record
                }
            })
        } else {
            if (type === 'add') {
                dispatch({
                    type: 'sysParamsSet/recordState',
                    data: {
                        modalType: type,
                        record: null
                    }
                })
            } else {
                dispatch({
                    type: 'sysParamsSet/visibleState',
                    data: {
                        modalType: type,
                        visible: true
                    }
                })
            }
        }
    }

    const columns = [{
        title: '字段编号',
        dataIndex: 'fieldCode',
        key: 'fieldCode',
    }, {
        title: '字段名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
    }, {
        title: '参数值',
        dataIndex: 'paramValue',
        key: 'paramValue',
    }, {
        title: '参数名称',
        dataIndex: 'paramName',
        key: 'paramName',
    }, {
        title: '对应编号',
        dataIndex: 'relativeId',
        key: 'relativeId',
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
            { label: '字段编号', field: 'fieldCode', type: 'Input' },
            { label: '字段名称', field: 'fieldName', type: 'Input' },
            {
                label: '状态', field: 'status', type: 'Select', dic: [
                    { name: '可用', value: 1 },
                    { name: '不可用', value: 0 }
                ]
            },

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
                        type: 'sysParamsSet/selectedRowKeysState',
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
                    type: 'sysParamsSet/query',
                    args: {
                        pageSize
                    }
                })
            },
            onChange(current) {
                dispatch({
                    type: 'sysParamsSet/query',
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
                type: 'sysParamsSet/visibleState',
                data: false
            })
        },
        onCancel() {
            dispatch({
                type: 'sysParamsSet/visibleState',
                data: false
            })
        },
        modalForms: [
            { label: '字段编号', field: 'fieldCode', type: 'Input' },
            { label: '字段名称', field: 'fieldName', type: 'Input' },
            { label: '参数值', field: 'paramValue', type: 'Input' },
            { label: '参数名称', field: 'paramName', type: 'Input' },
            { label: '对应编号', field: 'relativeId', type: 'Input' },
            {
                label: '状态', field: 'status', type: 'Select', dic: [
                    { name: '可用', value: 1 },
                    { name: '不可用', value: 0 }
                ]
            },
            { label: '备注', field: 'remark', type: 'TextArea' },
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

SysParamsSet.propTypes = {
};

function mapStateToProps({sysParamsSet}) {
    return { sysParamsSet }
}
export default connect(mapStateToProps)(SysParamsSet);
