const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = '3000';

const server = http.createServer((req,resp)=>
    {
        console.log('Request for ' + req.url + 'by method' + req.method);
        
        
        if(req.method=== 'GET')
        {
            var fileUrl;
            if(req.url == '/') fileUrl = '/index.html'
            else fileUrl = req.url;
            
            var filePath = path.resolve('./public'+fileUrl );
            const fileExt = path.extname(filePath);
            if(fileExt==='.html'){
                fs.exists(filePath,(exists)=>
                    {
                        if(!exists){
                            resp.statusCode = 404;
                            resp.setHeader('Content-Type','text/html');
                            resp.end ('<html><body>Error 404 '+fileUrl+'not found </body></html>');
                            return;
                        }   
                        resp.statusCode = 200;
                        resp.setHeader("Content-Type", 'text/html');
                        //take the file and construct it into response
                        fs.createReadStream(filePath).pipe(resp);
                 });

            }
            else{
                resp.statusCode = 404;
                resp.setHeader('Content-Type','text/html');
                resp.end ('<html><body>Error 404 '+fileUrl+' not a html file </body></html>');
                return;
            }
        }
        else{
            resp.statusCode = 404;
            resp.setHeader('Content-Type','text/html');
            resp.end ('<html><body>Error 404 '+req.method+' req method not supported  </body></html>');
            return; 
        }
    });

server.listen(port,hostname, ()=>
    {
            console.log(`Server running at http://${hostname}:${port    }`)
    });