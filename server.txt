var express = require('express');
var app = express();
var fs = require("fs");

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json');

    // Pass to next layer of middleware
    next();
});

app.use(express.json());

app.get('/ekart/categories', function (req, res) {
	fs.readFile( __dirname + "/categories.json", 'utf8', function (err, data) {
        res.end( data );
        //res.end( JSON.stringify(data) );
    });
})

app.get('/ekart/orders', function (req, res) {
    fs.readFile( __dirname + "/orders.json", 'utf8', function (err, data) {
        //res.end( data );
        res.end( data );
    });
})
app.get('/ekart/users/:id', function (req, res) {
	fs.readFile( __dirname + "/users.json", 'utf8', function (err, data) {
       res.end( data );
    });
})

app.get('/ekart/deliverycheck/:pincode', function (req, res) {
	fs.readFile( __dirname + "/pincode.json", 'utf8', function (err, data) {
       res.end( data );
    });
})

app.post('/ekart/processOrder', function(request, res){
    console.log(request, 'order body...');
    res.end(JSON.stringify({status: 200 , message: 'Order created'}))
});

var server = app.listen(9000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)
})