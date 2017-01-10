import _ from 'lodash'

export function getName(obj, value) {
  if (!value&&value!==0) return ''
  if (obj.length) {
    const o = _.find(obj, { value: value - 0 });
    return (o && o.name) || '';
  }
  return ''
}

export function getList(obj, code) {
  if (obj) {
    return _.filter(obj, (o) => { return o.code == code && o.parentId !== 0 });
  }
  return null
}
