const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dot = require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


router.get('/',(req,res,next)=>{

  async function connectgetDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });

  //select
      const result4 = await connection.execute(
        "SELECT deptno, dname FROM dept");

      //console.log(result4.rows);
      console.log(result4.rows);
      res.status(200).json({
        departments: result4.rows
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectgetDB();
});

router.post('/',(req,res,next)=>{

console.log(JSON.parse(req.body.id));
console.log(req.body.name);
console.log(req.body.loc);
  async function connectpostDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });


  //insert
      const result = await connection.execute(
     "INSERT INTO dept VALUES (:id, :nm,:loc)",
  { id : {val: JSON.parse(req.body.id) }, nm : {val: req.body.name} , loc: {val: req.body.loc}},{autoCommit: true});

      console.log("Rows inserted: " + result.rowsAffected);

      res.status(200).json({
        departments: "Added"
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectpostDB();
});

router.delete('/:delId',(req,res,next)=>{

  async function connectDeleteFromDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });


  //delete
  const result3 = await connection.execute(
     `DELETE from dept where deptno = :id`,
     [req.params.delId],
     { autoCommit: true });  // commit once for all DML in the script
   console.log("Rows updated: " + result3.rowsAffected);

      res.status(200).json({
        departments: "Deleted"
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectDeleteFromDB();
});

router.patch('/:upId',(req,res,next)=>{

  async function connectUpdateInDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });

  //Update
  const result2 = await connection.execute(
     `UPDATE dept SET dname = :nm where deptno = :id`,
     [req.body.dname,req.params.upId],
     { autoCommit: true });  // commit once for all DML in the script
   console.log("Rows updated: " + result2.rowsAffected); // 2


      res.status(200).json({
        departments: "Updated"
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectUpdateInDB();
});

module.exports= router;
