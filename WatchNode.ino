#include <Dhcp.h>
#include <Dns.h>
#include <Ethernet.h>
#include <EthernetClient.h>
#include <EthernetServer.h>
#include <EthernetUdp.h>
#include <SPI.h>

// IP Address of device (port 80 for HTTP):
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 29, 134);
EthernetServer server(80);

void setup() {
  Ethernet.init(10);  // Using device pin 10
  Serial.begin(9600); // Open serial communications and wait for port to open:
  Serial.println("connected");
  Ethernet.begin(mac, ip); // start connection:
  // start the server
  server.begin();
  Serial.print("ip: ");
  Serial.println(Ethernet.localIP());
}

void loop() {
  EthernetClient client = server.available();
  if (client) {
    Serial.println("client connected"); // an http request ends with a blank line
    bool currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);// http request has ended,send a reply
        if (c == '\n' && currentLineIsBlank) {
          //http response
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          client.println("{name: 'WatchNode10',"); //temp: 67, water: 'false', motion: 'false'}");
          //analog pin readings
          for (int analogChannel = 0; analogChannel < 2; analogChannel++) {
            int sensorReading = analogRead(analogChannel);
            client.print("sensor");
            client.print(analogChannel);
            client.print(": ");
            client.print(sensorReading);
            client.println(",");
          }
          client.println("}");
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        } else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
}
