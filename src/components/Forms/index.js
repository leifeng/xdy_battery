import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash';
import { getName } from '../../utils/dicFilter';
import UpFile from '../UpFile'
import CustomImage from '../CustomImage'
import { Input, Checkbox, Cascader, InputNumber, Select, Radio, DatePicker, Form, TreeSelect, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Forms extends Component {
  constructor(props) {
    super(props);
    this.disabledDate = this.disabledDate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onRadioGroupChange = this.onRadioGroupChange.bind(this);
  }

  render() {
    //console.log('Forms')
    const { field, valueField, value, type, rules, form, setting, label, formItemLayout, modalType, unique, dic, help, formType, defaultValue } = this.props;
    const { getFieldDecorator } = form;

    //console.log(field,value)
    //初始化值-start
    let defaultvalue = ((value == 0 || value) && value + '') || '';
    if (valueField) {
      defaultvalue = form.getFieldValue(valueField)
    }
    switch (type) {
      case 'DatePicker':
        defaultvalue = value ? moment(value, setting.format) : null;
        break;
      case 'TreeSelect':
        defaultvalue = [(value == 0 || value) && value.toString()]
        break;
      case 'Select':
        if (modalType == 'add') defaultvalue = ''
        break;
      case 'InputNumber':
        defaultvalue = ((value == 0 || value) && value + '') || 0;
        break;
    }
    if (modalType === 'add'&&defaultValue) {
      defaultvalue = defaultValue
    }
    //初始化值-end
    // console.log(type, field, defaultvalue)

    //验证-start
    let defaultRules = rules;
    if (modalType !== 'add' && unique) {
      defaultRules = []
    }
    //验证-end

    const options = {
      initialValue: defaultvalue,
      rules: defaultRules
    }

    const FormItemProps = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      label: label
    }
    if (help) {
      FormItemProps['help'] = help;
    }
    if (formType === 'hidden') {
      FormItemProps['className'] = 'hidden';
    }

    if (field !== '' && type !== 'Image') {
      return (
        <FormItem {...FormItemProps} >
          {getFieldDecorator(field, options)(
            this.renderForm()
          )}
        </FormItem>
      )
    } else if (type === 'Image') {
      if (value) {
        return (
          <FormItem {...FormItemProps}>
            {getFieldDecorator(field, options)(
              <CustomImage url={value} />
            )}
          </FormItem>
        )
      }
      return null

    } else {
      return (
        <FormItem {...FormItemProps}>
          {this.renderForm()}
        </FormItem>
      )
    }

  }

  renderForm() {
    const { dic, formType, type, setting, unique, modalType, inputProps, form } = this.props;
    switch (type) {
      case 'Input':
        return <Input type={formType} disabled={modalType !== 'add' && unique} {...inputProps} />
      case 'TextArea':
        return <Input type="textarea" />
      case 'Checkbox':
        let _dic = [];
        _.forEach(dic, function (item, key) {
          _dic.push({ label: item.name, value: item.value })
        });
        return <CheckboxGroup options={_dic} />
      case 'Cascader':
        return <Cascader />
      case 'InputNumber':
        let disabled = false;
        const { disabledFn } = this.props;
        if (disabledFn) {
          const { linkField } = this.props;
          disabled = disabledFn(form.getFieldValue(linkField))
        }
        return <InputNumber min={setting && setting.min || 0} max={setting && setting.max || Infinity} disabled={disabled} />
      case 'Select':
        return <Select onChange={this.onSelectChange} disabled={modalType !== 'add' && unique}>
          <Option value="">请选择</Option>
          {dic.map((item, i) => {
            return <Option value={(item.value || item.value == 0) && item.value.toString()} key={i}>{item.name}</Option>
          })}
        </Select>
      case 'Radio':
        return <RadioGroup disabled={modalType !== 'add' && unique} onChange={this.onRadioGroupChange} >
          {dic.map((item, i) => {
            return <Radio value={(item.value || item.value == 0) && item.value.toString()} key={i}>{item.name}</Radio>
          })}
        </RadioGroup>
      case 'DatePicker':
        return <DatePicker
          disabled={modalType !== 'add' && unique}
          showTime={setting && setting.showTime}
          format={setting && setting.format}
          disabledDate={setting && setting.disabledDate !== null ? setting.disabledDate : this.disabledDate}
        />
      case 'UpFile':
        const { linkField, requireField } = this.props;
        const batsCode = form.getFieldValue(requireField);
        return <UpFile form={form} linkField={linkField} disabled={batsCode == '' ? true : false} batsCode={batsCode} />
      case 'TreeSelect':
        dic.unshift({
          label: '根目录',
          value: '0',
          key: '0',
        })
        return <TreeSelect
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={dic}
          placeholder="请选择"
          treeDefaultExpandAll
        />
      // case 'AutoComplete':
      //   const { AutoCompleteChange, AutoCompleteSelect } = this.props;
      //   return <AutoComplete dataSource={dic} onChange={AutoCompleteChange} onSelect={AutoCompleteSelect} allowClear={true} optionLabelProp="value" />
      case 'disabled':
        return <Input disabled />
      case 'disabledSelect':
        return <Select disabled>
          <Option value="">请选择</Option>
          {dic.map((item, i) => {
            return <Option value={(item.value).toString()} key={i}>{item.name}</Option>
          })}
        </Select>
      case 'SelectAuto':
        const { AutoCompleteChange, AutoCompleteSelect, placeholder } = this.props;
        return <Select
          mode="combobox"
          allowClear={true}
          onSelect={AutoCompleteSelect}
          onSearch={AutoCompleteChange}
          placeholder={placeholder}
        >
          {dic.map((item, index) => {
            return <Option key={item.value} title={item.value}>{item.text}</Option>
          })}
        </Select>
      default:
        return <Input type={formType} {...inputProps} />
    }
  }

  //限制时间范围
  disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }
  onSelectChange(value) {
    const { onChange, form, linkField } = this.props;
    if (!onChange) return
    const newState = {};
    newState[linkField] = ''
    form.setFieldsValue(newState)
    onChange(value);
  }
  onRadioGroupChange(e) {
    const { onChange } = this.props;
    if (!onChange) return
    onChange(e.target.value)
  }
}
Forms.defaultProps = {
  field: '',//绑定的字段
  type: '',//什么类型组件
  rules: null,//验证规则
  help: null,//帮助信息，可以覆盖验证提示
  value: null,
  unique: false,//是否在编辑时可以修改
  formType: 'text',//input的type
  requireField: '',//需要优先输入值
  inputProps: null,
  linkField: '',//用于联动功能对应的字段
  onChange: null,
  customer: null,//自定义form格式
  setting: {//antd组件设置
    showTime: false,
    format: 'YYYY-MM-DD'
  },
  defaultValue: ''
}
export default Forms;


/*
{
  label: '标题',
  field: '绑定的字段',
  type: '组件类型',
  formType：原生input类型
  unique：是否在编辑时可用
  linkField: '关联的字段（多用于联动菜单【配合onchange事件】，上传文件，地图标点）',
  onChange：'多用于联动菜单，配合linkField'
  requireField: '当xx对应的组件不为空时，这个组件才可以使用',
  help: '提示（会覆盖验证的提示）',
  rules: 验证规则见antd的form
  setting: antd组件的配置(多用于时间控件)
  customer: { nodeName: '节点名称', keyName: "键名称", keyValue: '键值' } 用于自定义表单数据的结构
  defaultValue:'默认值'
}
 */
