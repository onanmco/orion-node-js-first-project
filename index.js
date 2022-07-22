const http = require("http");


http.createServer((request, response) => {
    
    let chunks = [];
    if (request.url == '/hello') {
        request.on("data", chunk => {
            chunks.push(chunk);
        });
        request.on("end", () => {
            chunks = Buffer.concat(chunks);
            chunks = chunks.toString("utf-8");
            chunks = JSON.parse(chunks);
            response.statusCode = 200;
            response.end(`Hello ${chunks.name}`);
        })
    } else {
        response.statusCode = 404;
        response.end();
    }
})
.listen(3000, () => {
    console.log("server is running on port number 3000.");
})
