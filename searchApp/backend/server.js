const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
    user: 'rama',
    password: 'rk1234',
    server: 'localhost',
    database: 'cBiz_Demo',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/contacts', async (req, res) => {
    const { search, page, pageSize } = req.query;
    const offset = (page - 1) * pageSize;

    let query = `SELECT FirstName, LastName, Email1, MobilePhone, JobTitle, City, State, Country, Summary1 FROM Contacts WHERE 
                 FirstName LIKE @search OR 
                 LastName LIKE @search OR 
                 Email1 LIKE @search OR 
                 MobilePhone LIKE @search OR
                 JobTitle LIKE @search OR
                 City LIKE @search OR 
                 State LIKE @search OR 
                 country LIKE @search OR 
                 Summary1 LIKE @search  
                 ORDER BY FirstName 
                 OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`;

                 //For Total count of search result
    let countQuery = `SELECT COUNT(*) AS total FROM Contacts WHERE 
                      FirstName LIKE @search OR
                      LastName LIKE @search OR 
                      Email1 LIKE @search OR 
                      MobilePhone LIKE @search OR
                      JobTitle LIKE @search OR
                      City LIKE @search OR
                      State LIKE @search OR
                      Country LIKE @search OR
                      Summary1 LIKE @search`;

    try {
        const request = new sql.Request();
        request.input('search', sql.NVarChar, `%${search}%`); //changed VarChar to NVarChar
        request.input('offset', sql.Int, parseInt(offset));
        request.input('pageSize', sql.Int, parseInt(pageSize));
        
        const result = await request.query(query);
        const countResult = await request.query(countQuery);

        res.json({ 
            data: result.recordset, 
            total: countResult.recordset[0].total 
        });
    } catch (err) {
        console.error('Error running query: ', err);
        res.status(500).send(err.message);
    }
});

//start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});