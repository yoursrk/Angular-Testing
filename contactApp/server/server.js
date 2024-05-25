const express = require('express');
const bodyParser = require('body-parser');
const { poolPromise, sql } = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/contacts10', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT TOP 10 FirstName, CompanyName, MobilePhone FROM contacts WHERE NOT ISNULL(CompanyName, '')='' AND NOT ISNULL(MobilePhone, '')=''`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/contacts100', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .query(`SELECT TOP 100 FirstName, CompanyName, MobilePhone FROM contacts WHERE NOT ISNULL(CompanyName, '')='' AND NOT ISNULL(MobilePhone, '')=''`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});