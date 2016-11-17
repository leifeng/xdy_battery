'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久（模拟100条数据）
let rolesData = {};
if (!global.rolesData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      name: '@cname',
      'age|11-99': 1,
      'sex|0-1': 0,
      address: '@region',
      haha: '@guid'
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  rolesData = data;
  global.rolesData = rolesData;
} else {
  rolesData = global.rolesData;
}


module.exports = {
  //查询
  'GET /api/roles'(req, res) {
    const params = qs.parse(req.query);//把参数转换为对象
    const pageSize = params.pageSize || 10;//页面大小
    const currentPage = params.current || 1;//当前页
    let data = rolesData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);//模拟分页数据
    rolesData.page.current = currentPage * 1;
    //新分页对象
    let newPage = {
      current: rolesData.page.current,
      total: rolesData.page.total
    };

    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: newPage
      });
    }, 500);
  },

  //添加
  'POST /api/roles'(req, res) {
    const newData = JSON.parse(req.body);
    newData.id = rolesData.data.length + 1;
    rolesData.data.unshift(newData);
    rolesData.page.total = rolesData.data.length;
    rolesData.page.current = 1;
    global.rolesData = rolesData;

    setTimeout(function () {
      res.json({
        success: true,
        data: rolesData.data,
        page: rolesData.page
      });
    }, 500);
  },

  //删除
  'DELETE /api/roles'(req, res) {
    const deleteItem = qs.parse(req.body);
    rolesData.data = rolesData.data.filter(function (item) {
      if (item.id == deleteItem.id) {
        return false;
      }
      return true;
    });

    rolesData.page.total = rolesData.data.length;
    global.rolesData = rolesData;

    setTimeout(function () {
      res.json({
        success: true,
        data: rolesData.data,
        page: rolesData.page
      });
    }, 500);
  },

  //更新
  'PUT /api/roles'(req, res) {
    const editItem = JSON.parse(req.body);
    const data=editItem.data;
    rolesData.data = rolesData.data.map(function (item) {
      if (item.id == data.id) {
        return data;
      }
      return item;
    });
    global.rolesData = rolesData;
    setTimeout(function () {
      res.json({
        success: true,
        data: rolesData.data,
        page: rolesData.page
      });
    }, 500);
  },
}
