const http = require("http");
const fs = require("fs");
const socket = require("socket.io");
const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(fs.readFileSync("./index.html"));
}).listen(process.env.PORT || 8000);

const io = socket(server);

io.on("connection", (socket)=>{
    socket.on("a", (data)=>{
        io.sockets.emit("b", {value: data.value});
    });
});

const { Client } = require("pg");
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

client.query("select * from sample;", (err, res)=>{
    console.log(res.rows[0]["idx"] + "位 " + res.rows[0]["name"]);
    client.end();
});