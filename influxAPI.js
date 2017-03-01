'use strict'

const Influx = require('influx');

const influxAPI = function(parameters) {
    /* Attributes */
    this.m_ip_address = parameters.ip;
    this.m_port = parameters.port;

    /* Member functions */
    this.createDatabases = function(databaseName) {
        return this.influx.createDatabase(databaseName);
    }
    this.connect = function(parameters) {
        this.m_database = parameters.database;
        this.m_username = parameters.username;
        this.m_password = parameters.password;
        var ip = this.m_ip_address;
        var port = this.m_port;
        this.influx = new Influx.InfluxDB({
            host: ip,
            database : parameters.database,
            username : parameters.username,
            password : parameters.password,
            port : port
        })
        return this.influx.getDatabaseNames()
        .then(names => {
            if (!names.find(name => { return name === parameters.database })) {
                return this.createDatabases(parameters.database);
            }
        })
    }
    this.insertItem = function(parameters) {
        return this.influx.writePoints([{
            measurement: parameters.name,
            tags : { host : parameters.host },
            fields : parameters.param
        }])
    }
    this.select = function(query) {
        return this.influx.query(query);
    }
    this.removeItem = function(whereClause) {
        return this.influx.dropMeasurement(whereClause);
    }
    this.removeDatabase = function(database) {
        return this.influx.dropDatabase(database);
    }
}

module.exports = {
    create : function(parameters) {
        return new influxAPI(parameters);
    }
}