const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'db_cathealth'
})

app.use(cors());
app.use(express.json());

app.get("/accounts/login/", (req, res) => {
  connection
    .promise()
    .query("SELECT * FROM users") 
      .then(([rows, fields]) => {
      res.json(rows);
      })
      .catch((err) => {
        res.status(500).json({error:err})
      });
    });


app.get("/cats", (req, res) => {
  connection
    .promise()
    .query("SELECT ch.*, users.user_name AS usersname FROM catshealth AS ch INNER JOIN users ON ch.owner_id = users.id") 
      .then(([rows, fields]) => {
      res.json(rows);
      })
      .catch((err) => {
        res.status(500).json({error:err})
      });
    });

app.post("/cats", async(req, res) => {
  try{
    const { name, mood, poop, meal, vitality, record, owner_id, memo } = req.body;
    const existingRecord = await connection
    .promise()
    .query("SELECT * FROM catsHealth WHERE name = ? AND record = ?" , [
      name,
      record,
    ])

  if (existingRecord && existingRecord.length > 0) {
    await connection
    .promise()
    .query(
      `UPDATE catsHealth 
  SET mood = ?, poop = ?, meal = ?, vitality = ?, memo = ?
  WHERE name = ? AND record = ?`,
      [mood, poop, meal, vitality, memo, name, record]
    );
    res.end();
  } else {
    const insertQuery = `
  INSERT INTO catsHealth (name, mood, poop, meal, vitality, record, memo, owner_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await connection
      .promise()
      .query(insertQuery, [
        name,
        mood,
        poop,
        meal,
        vitality,
        record,
        memo,
        owner_id,
      ])
    }
    res.status(200).end();
  }catch(err) {
    console.log(err);
    res.status(500).json({error:err})
      }; 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
