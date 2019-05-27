var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var fs = require('fs');
const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:password@127.0.0.1:5432/host'
const pool = new Pool({ connectionString: connectionString, })
var tempRead = '';
var meterRead = '';

var crlf = new Buffer(2);
crlf[0] = 0xD; //CR - CR character
crlf[1] = 0xA; //LF - LF character

server.on("message", function (msg, rinfo) { //every time new data arrives do this:
  tempRead = msg.toString().substring(0, 5);
  meterRead = msg.toString().substring(5, 10);
  //console.log("server: " + msg.toString() + " from " + rinfo.address + ":" + rinfo.port); // you can comment this line out
  console.log("temp: " + tempRead + " water: " + meterRead + " msg: " + msg.toString() + " from " + rinfo.address + ":" + rinfo.port); // you can comment this line out
  fs.appendFile('mydata.txt', msg.toString() + crlf, encoding = 'utf8', (err) => {
  });//write the value to file and add CRLF for line break

  ///get value of sensors, log it to db and process for alerts
  const query = {
    text: 'INSERT INTO temps (reading, time) VALUES ($1, $2) RETURNING *;',
    values: [tempRead, meterRead]
  };

  return new Promise(function (resolve, reject) {
    pool.query(query, (err, res) => {
      if (err) {
        logger.error('Error saving to db: ' + err);
        console.log('Error saving to db: ' + err);
        reject(0)
        //return 0;
      }
      else {
        //This would be a good place to log a message to the console if required
      }
    })
  })
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});

server.bind(6000); //listen to udp traffic on port 6000
