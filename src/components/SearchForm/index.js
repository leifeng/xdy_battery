import React, { PropsType, Component } from 'react';
import styles from './index.less'
import _ from 'lodash';
import Forms from '../Forms';
import { Form, Row, Col, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

function SearchForm({ children, handleSearch, handleResetQuery, forms, form }) {
  console.log('SearchForm')
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
      handleSearch(values);
    })
  }
  return (
    <div className={styles.normal}>
      <Form
        layout="horizontal"
        className={styles.searchform}
        onSubmit={onSubmit}
      >
        <Row gutter={40}>
          <QueueAnim
            ease="easeInOutBack"
            type={['left', 'right']}
          >
            {forms.map((item, i) => {
              return <Col span={8} key={i}>
                <Forms {...item} form={form} formItemLayout={formItemLayout} key={i} />
              </Col>
            })}
          </QueueAnim>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <QueueAnim
              ease="easeInOutBack"
              type={['left', 'right']}
            >
              <Button type="primary" htmlType="submit" key="select">查询</Button>
              <Button onClick={handleReset} key="reset">重置</Button>
            </QueueAnim>
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

    const o = changedFields[Object.keys(changedFields)[0]];
    if (typeof o.value === 'string') {
      o.value = o.value.trim();
    } else {
      props.forms.map((item) => {
        if (item['field'] === Object.keys(changedFields)[0] && item['type'] === 'DatePicker') {
          o.value = o.value.format(item['setting'].format)
        }
      })
    }
    props.handleChange(o)
  }
})(SearchForm);
