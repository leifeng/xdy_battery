import React from 'react';
import { Checkbox, Modal, Radio } from 'antd';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
function Roles({modalRolesVisible, closeModalRoles, saveModalRoles, onChange, roles, rolesbyUser,userName}) {

  let options = [];
  roles.map((item, index) => {
    options.push({ label: item.remark, value: item.id })
  })
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <Modal title={userName+"【角色绑定】"} visible={modalRolesVisible}
      onOk={saveModalRoles} onCancel={closeModalRoles}
    >
      {/*<CheckboxGroup options={options} value={rolesbyUser} onChange={onChange} />*/}

      <RadioGroup onChange={onChange} value={rolesbyUser}>
        {options.map((item, index) => {
          return <Radio style={radioStyle} value={item.value} key={index}>{item.label}</Radio>
        })}
      </RadioGroup>
    </Modal>
  )

}
Roles.defaultProps = {
  roles: [],
  rolesbyUser: [],
  userName:''
}
export default Roles;
