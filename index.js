const http = require('http');

const hostname = 'localhost';
const port = '3000';

const server = http.createServer((req,resp)=>
    {
        console.log(req.headers);
        
        
        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'text/html');
        resp.end('<html><body><h1>Hello World! Message from Ishan</h1></body></html>');
    });

server.listen(port,hostname, ()=>
    {
            console.log(`Server running at http://${hostname}:${port}`)
    })