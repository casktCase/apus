var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var fs = require('fs');

var crlf = new Buffer(2);
crlf[0] = 0xD; //CR - CR character
crlf[1] = 0xA; //LF - LF character

server.on("message", function (msg, rinfo) { //every time new data arrives do this:
  console.log("server got: " + msg.readUInt16LE(0) + " from " + rinfo.address + ":" + rinfo.port); // you can comment this line out
  fs.appendFile('mydata.txt', msg.readUInt16LE(0) + crlf, encoding = 'utf8', (err) => {
  });//write the value to file and add CRLF for line break

  ///get value of sensors, log it to db and process for alerts

});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);



});

server.bind(6000); //listen to udp traffic on port 6000
