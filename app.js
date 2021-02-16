const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT||3000;

app.use(bodyParser.json());
app.use('/', require('./repository/employee/employee.router'));
// app.get('/',(req, res)=> {
//   res.json("Welcome to mychannel");
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
