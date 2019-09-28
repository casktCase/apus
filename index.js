const  connectionString = 'postgresql://user:password@127.0.0.1:5432/host';
const { Pool } = require('pg');
const pool = new Pool({ connectionString: connectionString, })
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3011;

const getTemps = (request, response) => {
  response.json({ info: `getting current temp`})
  pool.query('SELECT * FROM temps', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const queryTime = {
  text: 'SELECT CURRENT_TIME;'
};

const queryTemp = {
  text: 'SELECT "time", reading, id	FROM public.temps ORDER BY id DESC LIMIT 1;'
};

const getCurrTemp = (request, response) => {
  const id = parseInt(request.params.id)
  response.json({ info: `getting current time`})
  pool.query(queryTemp, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Root of express app' })
  })

  app.get('/temps', (request, response) => {
    response.json({ info: 'Getting temps' })
  })  

  app.get('/temp', (request, response) => {
    //response.json({ info: 'Getting temp' })
    pool.query(queryTemp, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })  

  //app.get('/temps', function(req, res){ getTemps})
  //app.get('/temp', function(req, res){ getCurrTemp})

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
