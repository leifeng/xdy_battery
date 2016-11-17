import React, { Component } from 'react';
import moment from 'moment'
import { Input, Checkbox, Cascader, InputNumber, Select, Radio, DatePicker } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class Forms extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { field, value, type, form} = this.props;
    const { getFieldDecorator } = form;
    let defaultvalue = value;
    if (value && type === 'DatePicker') {
      defaultvalue = moment(value, 'YYYY-MM-DD');
    }
    const options = { initialValue: defaultvalue }
    return (
      <div>
        {getFieldDecorator(field, options)(
          this.renderForm()
        )}
      </div>
    )
  }

  renderForm() {
    const { value, dic, type} = this.props;
    switch (type) {
      case 'Input':
        return <Input />
      case 'TextArea':
        return <Input type="textarea" />
      case 'Checkbox':
        return <CheckboxGroup options={dic} />
      case 'Cascader':
        return <Cascader />
      case 'InputNumber':
        return <InputNumber />
      case 'Select':
        return <Select>
          {dic.map((item, i) => {
            return <Option value={item.value.toString()} key={i}>{item.name}</Option>
          })}
        </Select >
      case 'Radio':
        return <RadioGroup>
          {dic.map((item, i) => {
            return <Radio value={item.value} key={i}>{item.name}</Radio>
          })}
        </RadioGroup>
      case 'DatePicker':
        return <DatePicker />
      default:
        return <Input />
    }
  }
}
Forms.defaultProps = {
  value: null
}
export default Forms;
