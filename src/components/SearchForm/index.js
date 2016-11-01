import React, { PropsType } from 'react';
import styles from './index.less'
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
function SearchForm({children, handleSearch, forms, form}) {
  const { getFieldDecorator, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  function handleReset() {
    resetFields();
  }
  return (
    <div className={styles.normal}>
      <Form
        horizontal
        className={styles.searchform}
        onSubmit={handleSearch}
        >
        <Row gutter={40}>
          {forms.map((item, i) => {
            return <Col span={8} key={i}>
              <FormItem
                {...formItemLayout}
                label={item.label}
                >
                {getFieldDecorator(item.label)(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
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
export default Form.create()(SearchForm);
