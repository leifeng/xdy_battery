import React, { PropsType } from 'react';
import styles from './index.less'
import _ from 'lodash';
import Forms from '../Forms';
import { Form, Row, Col, Button } from 'antd';

function SearchForm({children, handleSearch, handleResetQuery, forms, form}) {
  const { resetFields, validateFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  function handleReset() {
    resetFields();
    handleResetQuery();
  }
  function onSubmit(e) {
    e.preventDefault();
    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let values = Object.assign({}, fieldsValue)
      const dateTypeField = _.filter(forms, { type: 'DatePicker' });
      _.map(dateTypeField, (item, index) => {
        const name = item['field']
        values[name] = fieldsValue[name] ? fieldsValue[name].format(item.setting.format) : '';
      })
      console.log(values)
      handleSearch(values);
    })
  }
  return (
    <div className={styles.normal}>
      <Form
        horizontal
        className={styles.searchform}
        onSubmit={onSubmit}
        >
        <Row gutter={40}>
          {forms.map((item, i) => {
            return <Col span={8} key={i}>
              <Forms {...item} form={form} formItemLayout={formItemLayout} key={i} />
            </Col>
          })}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
SearchForm.PropsType = {

}
export default Form.create({
  onFieldsChange(props, changedFields) {
    props.handleChange(changedFields[Object.keys(changedFields)[0]])
  },
})(SearchForm);
