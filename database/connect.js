const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'utaxthailand',
  server: '192.168.7.11',
  database: 'UXFMUNI',
  options: {
    'enableArithAbort': true
  }
}

//async/await style:
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then(pool => {
//     console.log('Connected to mssql');
//     return pool;
//   })
//   .catch(err => {
//     console.log('Database Connect is Failed!')
//   })

module.exports = {
  pool,
  poolConnect
}
