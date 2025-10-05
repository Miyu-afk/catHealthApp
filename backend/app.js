const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
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

connection.connect((error) => {
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

app.post('/cats', async (req, res) => {
  const{name, mood, poop, meal ,vitality, record, owner_id, memo} = req.body;
  const existingRecord = await connection.promise().query('SELECT * FROM catHealth WHERE name= ? AND record= ?, [name, record] ');

  if (existingRecord.length > 0){
   await connection.promise().query( `UPDATE catHealth 
   SET mood = ?, poop = ?, meal = ?, vitality = ? , memo = ?
   WHERE name = ? AND record = ?`,
  [mood, poop, meal, vitality, memo, name, record] 
);
  (err, result) =>{
    if(err) throw error;
  }
}else{
   const insertQuery = `
  INSERT INTO catHealth (name, mood, poop, meal, vitality, record, owner_id, memo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.promise().query(query, [name, mood, poop, meal, vitality, record, owner_id, memo]);;
  connection.query(insertQuery, (error) => {
    if(error) throw error;
    res.end()
  })
}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});