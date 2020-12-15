var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
//var router = express.Router();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-Type", "application/json");

  // Pass to next layer of middleware
  next();
});

app.use(express.json());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ekart/userRegister", (req, res) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    let _data = JSON.parse(data);
    let param = req.body.userName;
    if (_data[param]) {
      res.end(JSON.stringify({
        message: "This mobile number is already registered with us.",
      }));
    } else {
      res.end(
        JSON.stringify({
          message: `Success: Mobile number ${param} registered`,
        })
      );
    }
  });
});

app.post("/ekart/getLogin", (req, res) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    let _data = JSON.parse(data);
    let param = req.body.userName;
    if (_data[param]) {
      res.end(JSON.stringify(_data[param]));
    } else {
      res.end(
        JSON.stringify({
          message: "This mobile number is not registered with us.",
        })
      );
    }
  });
});

app.get("/ekart/categories", function (req, res) {
  fs.readFile(__dirname + "/categories.json", "utf8", function (err, data) {
    res.end(data);
    //res.end( JSON.stringify(data) );
  });
});

app.get("/ekart/orders/:phone", function (req, res) {
  fs.readFile(__dirname + "/orders.json", "utf8", function (err, data) {
    //res.end( data );
    res.end(data);
  });
});

app.get("/ekart/getstatus/:phone", function (req, res) {
  fs.readFile(__dirname + "/getstatus.json", "utf8", function (err, data) {
    //res.end( data );
    res.end(data);
  });
})

app.get("/ekart/users/:id", function (req, res) {
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    let _data = JSON.parse(data);
    let param = req.params.id + "";
    res.end(JSON.stringify(_data[param]));
  });
});

app.get("/ekart/getotp/:username", function (req, res) {
  fs.readFile(__dirname + "/users.json", "utf8", function (err, data) {
    let _data = JSON.parse(data);
    let param = req.params.username + "";
    if (_data[param]) {
      res.end(
        JSON.stringify({ otp: Math.floor(100000 + Math.random() * 900000) })
      );
    } else {
      res.end(JSON.stringify({ otp: null }));
    }
  });
});

app.get("/ekart/deliverycheck/:pincode", function (req, res) {
  fs.readFile(__dirname + "/pincode.json", "utf8", function (err, data) {
    res.end(data);
  });
});

app.post("/ekart/processOrder", function (request, res) {
  console.log(request, "order body...");
  res.end(JSON.stringify({ status: 200, message: "Order created" }));
});

app.get("/ekart/areas", function (req, res) {
  fs.readFile(__dirname + "/area.json", "utf8", function (err, data) {
    res.end(data);
  });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Mamidikayalu app listening at http://%s:%s", host, port);
});
