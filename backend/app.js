const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app=express();
const port = 3000;


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'db_cathealth'
})

connection.connect ((error) => {
  if(error) throw error;
  console.log('接続が成功しました');
  });

app.use(cors());
app.use(express.json());

app.get('/accounts/login/', (req, res) => {
  connection.query('SELECT owner_id FROM catHealth', (error, result) => {
    if(error){
      res.status(500).json({error:error});
    }
    res.json(result);
  })
})

app.get('/cats', (req, res) => {
  connection.query('SELECT * FROM catHealth', (error, result, fields) => {
    if(error){
      res.status(500).json({error:error});
    }
    res.json(result);
  });
});

app.post('/cats', (req, res) => {
  const{name, mood, poop, meal ,vitality, record, owner_id} = req.body;
  const insertQuery = `INSERT INTO catHealth(id, name, mood, poop, meal, vitality, record, owner_id) VALUES(null, "${name}, ${mood}, ${poop}, ${meal}, ${vitality}, "${record}, ${owner_id})`;
  connection.query(insertQuery, (error) => {
    if(error) throw error;
    res.end()
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});