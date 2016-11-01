import React, { Component } from 'react';
import { Input, Checkbox, Cascader, InputNumber, Select, Radio, DatePicker } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Forms extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { field, value, form} = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        {getFieldDecorator(field, {
          initialValue: value
        })(
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
      case 'Checkbox':
        return <Checkbox />
      case 'Cascader':
        return <Cascader />
      case 'InputNumber':
        return <InputNumber />
      case 'Select':
        return <Select />
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

export default Forms;
