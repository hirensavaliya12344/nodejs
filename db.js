// const {Client} = require('pg');
const Pool = require('pg').Pool
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    dbname: 'postgres',
    password: 'admin',
    port: 5432
  })
  const getUsers = (request, response) => {
    pool.query('SELECT * FROM todo ', (error, results) => {
      if (error) {
        throw error
      }
      console.log("res.rows",results.rows)
      response.status(200).json(results.rows)
    })}
//   }
//   client.connect();
//   client.query("select * from todo",(err,res)=> {
//     if(!err){
//       console.log("res.rows",res.rows)
//     }else{
//       console.log("err.message",err.message)
//     }
//     client.end();
//   })
module.exports = pool