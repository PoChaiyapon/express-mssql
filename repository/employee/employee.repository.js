const users = require('../../database/data-user');
const dbController = require('../../database/dbController');

function employeeRepository() {
  //แบบ callback
  function getEmployeeAll(callback) {
    // callback(users);
    var parameters = [];
    var query = 'select*From UXFMUNI..VIEW_EMPY_EPZ where STAUS = 1'
    dbController.getQuery(query,parameters, false, (err, result) => {
      callback(result);
    })
  }
  
  function getEmployeeByID(id,callback) {
    // let user = users.find(u => u.id === parseInt(id));
    // if(!user) {
    //   callback(null)
    // } else {
    //   callback(user);
    // }
    var parameters = [];
    var query = `select*From UXFMUNI..VIEW_EMPY_EPZ where STAFF_ID = ${id}`// 'select*From UXFMUNI..VIEW_EMPY_EPZ where STAFF_ID = 1'
    dbController.getQuery(query, parameters, false, (err, result) => {
      callback(result);
    })
  }

  function addEmployee(emp, callback) {
    users.push(emp);
    callback(users);
  }

  function deleteEmployee(id, callback) {
    const user = users.filter(u => u.id !== parseInt(id));
    callback(user);
  }

  return {
    getAll: getEmployeeAll,
    getEmployee: getEmployeeByID,
    addEmployee: addEmployee,
    delEmployee: deleteEmployee
  }
}

module.exports = employeeRepository;