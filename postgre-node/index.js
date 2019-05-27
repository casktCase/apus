/*
const pg = require(‘pg’);
const pool = new pg.Pool({
    user: ‘postgres’,
    host: ‘127.0.0.1’,
    database: ‘capitaliot’,
    password: ‘audia4’,
    port: ‘5432’
});

pool.query(“SELECT NOW() ”, (err, res) => {
    console.log(err, res);
    pool.end();
});
*/
//var dbOperations = require("./dbOperations.js");
const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:audia4@127.0.0.1:5432/capitaliot'
const pool = new Pool({ connectionString: connectionString, })
var tempRead = '';
var meterRead = '';

const query = {
    text: 'INSERT INTO temps (reading, time) VALUES ($1, $2);',
    values: [tempRead, meterRead]
}


pool.query(query, (err, res) => {
    console.log(err, res)
    pool.end()
})



/*

const client = new Client({
    connectionString: connectionString,
})
client.connect()

client.query('SELECT * FROM public.temps LIMIT 100', (err, res) => {
    console.log(err, res)
    client.end()
})
*/