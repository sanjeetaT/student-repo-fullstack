// Import the http modele
const http = require('http');
// see the port
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format


// create the http server
const server = http.createServer((req, res) => {
    // find the request route
    const route = new URL(req.url, `http://${req.headers.host}`).pathname;
    
     // Home page route
    if (route === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Node Routing Exercise');

    //welcome route
    } else if (route === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to my website!</h1>');
     
        // redirect route
    } else if (route === '/redirect') {
        res.writeHead(302, { 'Location': '/redirected' });
        res.end();
    
        // cache route
    } else if (route === '/redirected') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>You have been redirected!</h1>');
      
        // Cookie route
    } else if (route === '/cache') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=86400'
        });
        res.end('<h1>this resource was cached</h1>');

    } else if (route === '/cookie') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'hello=world'
        });
        res.end('cookies...yummm');

    // return a 404 error for other routs
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - page not found</h1>');
    }
});
// start server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
