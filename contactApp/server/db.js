const sql = require('mssql');

const config = {
  user: 'rama',
  password: 'rk1234',
  server: '127.0.0.1',
  database: 'cBiz_Demo',
  options: {
    encrypt: true,
    trustServerCertificate: true 
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
};