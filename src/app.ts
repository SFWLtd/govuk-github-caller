"use strict";
import * as request from "./request";
import * as input from "./input";

console.info("Running");

var minutes = 0.5;
var interval = minutes * 60 * 1000;

setInterval(function() {
    var users = input.readLines("users.txt"); 
    request.query(users);
}, interval);