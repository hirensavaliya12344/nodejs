const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const { log } = require('console')
const { describe } = require('node:test')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
 
// Get all data  
app.get('/todos',async (request, response) => {
    db.query('SELECT * FROM todo ', (error, results) => {
      if (error) {
        throw error
      }
      console.log("res.rows",results.rows)
      response.status(200).json(results.rows)
    }) 
})

// insert data
app.post('/todos',async (request, response) => {
    
      const { description } = request.body;
             
        console.log("res.rows",description )
     
        const  newTodo  = await db.query("INSERT INTO todo (description) VALUES($1,) RETURNING *",
          [ description ], (error, res) => {
            if (error) {
              throw error
            }
          // console.log("response.rows>>>>>",res)
          // console.log("response>>>>>???",res.rows[0].todo_id)
          // res.json(newTodo);   
        response.status(201).send(`User added with ID: ${res.rows[0].todo_id}`)
        })
})

// get specfic row data
app.get('/todos/:id',async (request, response) => {
  const id = parseInt(request.params.id)
  
    db.query('SELECT * FROM todo WHERE todo_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })   
  })

// update data 
  
app.put('/todos/:id',async (request, response) => {
  
  const id = parseInt(request.params.id)
  console.log("request >>?? :: ",id)
  console.log("request >>?? :: ",request.body)
  const { name, description} = request.body

 await db.query(
    'UPDATE todo SET description = $1 WHERE todo_id = $2',
    [ description, id],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log("response.rows>>>>>",results)
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
})

// delete data
app.delete('/todos/:id',async (request, response) => {
  const id = parseInt(request.params.id)
  
    db.query('DELETE FROM todo WHERE todo_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })   
  })
app.listen(6000, () => {
    console.log(`App running on port 6000`)
  })