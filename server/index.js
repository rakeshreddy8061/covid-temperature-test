const express = require('express');
var cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());

app.use(express.json()); // => req.body

//ROUTES//

//get all tests

app.get("/test", async (req, res) => {
  try {
    const allTests = await pool.query("SELECT * FROM test");
    res.json(allTests.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a test

app.get("/test/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const test = await pool.query("SELECT * FROM test WHERE test_id = $1", [ id ]);
    res.json(test.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a test

app.post("/test", async (req, res) => {
  try {
    const { name, temp } = req.body;
    const newTest = await pool.query(
      "INSERT INTO test ( name, temp ) VALUES ( $1, $2 ) RETURNING *",
      [ name, temp ]
    );
    res.json(newTest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a test

app.put("/test/:id", async ( req, res ) => {
  try {
    const { id } = req.params;
    const { name, temp } = req.body;
    const updatedTest = await pool.query("UPDATE test SET name = $1, temp = $2 WHERE test_id = $3",
    [ name, temp, id]);
    res.json("Test was Updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a test

app.delete("/test/:id", async ( req, res ) => {
  try {
    const { id } = req.params;
    const deleteTest = await pool.query("DELETE FROM test WHERE test_id = $1", [ id ]);
    res.json("Test was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(8000, () =>{
  console.log("server is listening on port 8000")
});