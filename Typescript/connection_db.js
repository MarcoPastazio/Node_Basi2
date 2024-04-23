"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
//create one pool req
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "music_store",
    password: "marcopastore",
    port: 5432,
});
