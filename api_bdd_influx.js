'use strict'

const Influx = require('influx');
const express = require('express');
const http = require('http');
const os = require('os');

const app = express();

const influxAPI = function(parameters) {
    this.m_ip_address = parameters.ip;
    this.m_port = parameters.port;
}

influxAPI.prototype.connect = function(parameters) {
    this.m_database = parameters.database;
    this.m_username = parameters.username;
    this.m_password = parameters.password;
    var ip = this.m_ip_address;
    var port = this.m_port;
    this.influx = new Influx.InfluxDB({
        host: ip,
        database : parameters.database,
        port: port,
        username: parameters.username,
        password: parameters.password
    })
    return this.influx.getDatabaseName()
            .then(names => {
                if (!names.includes(parameter.database)) {
                    return influxAPI.createDatabase(parameter.database);
                }
            })
}

influxAPI.prototype.createDatabase = function(databaseName) {
    return this.influx.createDatabase(databaseName);
}

module.exports = function(parameters) {
    return new influxAPI(parameters);
}