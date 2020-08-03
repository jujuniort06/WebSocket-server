const net = require('net');

const port = 4321

const server = new net.Server();

const connections = [];

server.listen(port, () => {
  console.log('Server Abriu');
})

server.on('connection', (socket) => {
  connections.push(socket);
  console.log('Conectou');

  socket.on('data', (data) => {    
    console.log(data.toString());

    for (const element of connections){
      if (element != socket){
        element.write(data.toString());
      }
    }
    socket.write(data.toString());
  });

  socket.on('close', () => {
    console.log('Fechou a conexão');
  })
})