const http =     require('http');
const net =      require('net');
const readline = require('readline');
const url =      require('url');

const pr = () => console.log('askkkjs:');

const stdin = process.openStdin();
const proxy = http.createServer();

proxy.on(
  'connect',
  (req, cltSocket, head) => {
    const srvUrl = url.parse(`http://${req.url}`);
    const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                        'Proxy-agent: Node.js-Proxy\r\n' +
                        '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
      });
  });

proxy.listen(1337, '127.0.0.1', () => {
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: "127.0.0.1:7474"
  };

  stdin.addListener("data", (input) => {

    const req = http.request(options);
    req.end();

    const input_words = input.toString().trim();

    req.on('connect', (res, socket, head) => {
      socket.write(`${input_words}\r\n`);
      socket.on('data', (chunk) => {
        console.log(`\n${chunk.toString()}\n`);
        pr();
      });
    });
  });

});

pr();
