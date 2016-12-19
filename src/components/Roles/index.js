import React from 'react';
import { Checkbox, Modal } from 'antd';
const CheckboxGroup = Checkbox.Group;

function Roles({modalRolesVisible, closeModalRoles, saveModalRoles, onChange, roles, rolesbyUser}) {

  let options = [];
  roles.map((item, index) => {
    options.push({ label: item.roleName, value: item.id })
  })

  return (
    <Modal title="角色绑定" visible={modalRolesVisible}
      onOk={saveModalRoles} onCancel={closeModalRoles}
      >
      <CheckboxGroup options={options} value={rolesbyUser} onChange={onChange} />
    </Modal>
  )

}
Roles.defaultProps = {
  roles: [],
  rolesbyUser: []
}
export default Roles;
