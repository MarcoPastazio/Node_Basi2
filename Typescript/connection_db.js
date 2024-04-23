"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var http = require('http');
var Pool = require('pg').Pool;
//create one pool req
exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'music_store',
    password: 'marcopastore',
    port: 5432,
});
