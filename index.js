let http = require("http");
let fs = require("fs");
let socket = require("socket.io");
let server = http.createServer((req, res)=>{
    if (req.url=="/"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(fs.readFileSync("./index.html"));
    }
}).listen(process.env.PORT || 8000);
let io = socket(server);