const express = require('express');
const router = express.Router();
const empRepo = require('./employee.repository');
const users = require('../../database/data-user');

router.route('/employee')
  //แบบใช้ callback
  .get((req,res)=> {
    empRepo().getAll((data)=> {
      const result = {
        "status": 200,
        "data": data
      }
      return res.status(200).json(result);
    });
  })
  .post((req, res)=> {
    let user = {
      "id": users.length+1,
      "name": req.body.uname,
      "email": req.body.uemail
    }
    empRepo().addEmployee(user, (data)=> {
      const result = {
        "status": 200,
        "data": data
      }
      return res.json(result);
    })
  })
  
router.route('/employee/:id')
  .all((req,res,next) => {
    const uid = req.params.id;
    empRepo().getEmployee(uid, (data)=> {
      if (!parseInt(uid)) {
        return res.status(400).json({ "status": 400, "message": `Bad request id(${uid})` });
      }
      else if(!data || data.length === 0) {
        return res.status(404).json({"status":404, "message": `Not found employee this id(${uid})`});
      }
      else {
        res.emp = data;
        next();
      }
    })
  })
  .get((req,res)=> {
    const result = {
      "status": 200,
      "data": res.emp
    }
    return res.status(200).json(result);
  })
  .delete((req, res) => {
    const uid = req.params.id;
    empRepo().delEmployee(uid, (data) => {
      const result = {
        "status": 200,
        "data": data
      }

      return res.status(200).json(result);
    })
  })

  module.exports = router;