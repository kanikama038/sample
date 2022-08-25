const http = require("http");
const fs = require("fs");
const socket = require("socket.io");
const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(fs.readFileSync("./index.html"));
}).listen(8000 || process.env.PORT);

const io = socket(server);

io.on("connection", (socket)=>{
    socket.on("a", (data)=>{
        io.sockets.emit("b", {value: data.value});
    });
});