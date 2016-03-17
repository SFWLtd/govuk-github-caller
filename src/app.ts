"use strict";
import * as request from "./request";
import * as input from "./input";
import * as http from "http";
import * as sr from "./server";

console.info("Running");

var minutes = 90;
var interval = minutes * 60 * 1000;

setInterval(function() {
    var users = input.readLines("users.txt");
    request.query(users);
}, interval);

const port: number = process.env.PORT || 3000;


var server = http.createServer(sr.onRequest);

server.listen(port, function() {
    console.info("Listening on port " + port);
});