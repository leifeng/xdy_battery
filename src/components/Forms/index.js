import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash';
import { Input, Checkbox, Cascader, InputNumber, Select, Radio, DatePicker, Form } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Forms extends Component {
  constructor(props) {
    super(props);
    this.disabledDate = this.disabledDate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  render() {
    const { field, value, type, rules, form, setting, label, formItemLayout, modalType, unique} = this.props;
    const { getFieldDecorator } = form;
    //初始化值-start
    let defaultvalue = value;
    if (value && type === 'DatePicker') {
      defaultvalue = moment(value, setting.format);
    }
    //初始化值-end

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
    return (
      <FormItem
        {...formItemLayout}
        label={label}
        >
        {getFieldDecorator(field, options)(
          this.renderForm()
        )}
      </FormItem>
    )
  }


  renderForm() {
    const {  dic, formType, type, setting, unique, modalType,inputProps} = this.props;
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
        return <InputNumber />
      case 'Select':
        return <Select>
          {dic.map((item, i) => {
            return <Option value={item.value.toString()} key={i}>{item.name}</Option>
          })}
        </Select>
      case 'Radio':
        return <RadioGroup>
          {dic.map((item, i) => {
            return <Radio value={item.value} key={i}>{item.name}</Radio>
          })}
        </RadioGroup>
      case 'DatePicker':
        return <DatePicker
          showTime={setting && setting.showTime}
          format={setting && setting.format}
          disabledDate={this.disabledDate}
          />
      default:
        return <Input type={formType} {...inputProps}/>
    }
  }
  //限制时间范围
  disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }

}
Forms.defaultProps = {
  value: null,
  unique: false,
  formType: 'text',
  inputProps:null,
  setting: {
    showTime: false,
    format: 'YYYY-MM-DD'
  }
}
export default Forms;
