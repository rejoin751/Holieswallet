var express = require("express");
var app = express();
var http = require("http").Server(app).listen(8001);
var io = require('socket.io')(http);
const path = require('path');
const routers = require('./Router/router');
const bodyparser = require('body-parser');
var Promise = require('promise');
var async = require('async');

var request = require('request');
var sessions = require('express-session');
var multer = require('multer');
//http.listen(process.env.PORT);
var session;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(sessions({
   secret: 'poussixthetruefighteroftheparadise',
   saveUninitialized: true,
   resave: true
}));
app.use("/assets", express.static("./assets"));


app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
var web3_main = require('./web3.js');
var helios_web3 = web3_main.web3;
var accountHelpers = require('./account_helpers.js');
var fileSaver = require("file-saver");
var numerical = require("./numerical_helpers");
var HeliosUtils = require('helios-utils');

var ConnectionMaintainer = HeliosUtils.ConnectionMaintainer;
var getNodeMessageFromError = HeliosUtils.getNodeMessageFromError;
var KeystoreServer = HeliosUtils.KeystoreServer;

var availableNodes = {
    1: [
        "wss://bootnode.heliosprotocol.io:30304",
        "wss://bootnode2.heliosprotocol.io:30304",
        "wss://bootnode3.heliosprotocol.io:30304",
        "wss://masternode1.heliosprotocol.io:30304"
    ],
    42: [
        "wss://hypothesis1.heliosprotocol.io:30304"
    ]
};
var connectionMaintainer = new ConnectionMaintainer(helios_web3, availableNodes);
connectionMaintainer.startNetworkConnectionMaintainerLoop();


var memeberid = 0;
var ip;
app.get("/", routers);
app.get("/dashboard", routers);
app.get("/transactions", routers);

app.get('*', routers);
