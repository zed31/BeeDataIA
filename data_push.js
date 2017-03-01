var influxDB = require('./influxAPI');
var database = influxDB.create({
    ip : '92.91.153.36', port : 18086
});
database.connect({
    database : 'hive_monitoring', username : 'franco', password : 'franco12345', nameseries : ['temperature', 'poid', 'hydrometrie'], host : 'hpst'
}).then(() => {
    var itemTemperature = 
    [
        {
            UID : 1, value : 20
        },
        {
            UID : 2, value : 18
        },
        {
            UID : 3, value : 15
        },
        {
            UID : 4, value : 16
        },
        {
            UID : 5, value : 22
        },
        {
            UID : 6, value : 25
        },
        {
            UID : 7, value : 26
        },
        {
            UID : 8, value : 20
        },
        {
            UID : 9, value : 21
        },
        {
            UID : 10, value : 23
        }
    ];
    var itemPoid = 
    [
        {
            UID : 1, value : 50
        },
        {
            UID : 2, value : 58
        },
        {
            UID : 3, value : 55
        },
        {
            UID : 4, value : 56
        },
        {
            UID : 5, value : 52
        },
        {
            UID : 6, value : 55
        },
        {
            UID : 7, value : 56
        },
        {
            UID : 8, value : 50
        },
        {
            UID : 9, value : 51
        },
        {
            UID : 10, value : 53
        }
    ];
    var itemHydrometrie = 
    [
        {
            UID : 1, value : 50
        },
        {
            UID : 2, value : 58
        },
        {
            UID : 3, value : 55
        },
        {
            UID : 4, value : 56
        },
        {
            UID : 5, value : 52
        },
        {
            UID : 6, value : 55
        },
        {
            UID : 7, value : 56
        },
        {
            UID : 8, value : 50
        },
        {
            UID : 9, value : 51
        },
        {
            UID : 10, value : 53
        }
    ];
    for (i in itemTemperature) {
        database.insertItem({name : "temperature", param : itemTemperature[i], host : 'franco', });
    }
    for (i in itemPoid) {
        database.insertItem({name : "poid", param : itemPoid[i], host : 'tamer', });        
    }
    for (i in itemHydrometrie) {
        database.insertItem({name : "hydrometrie", param : itemHydrometrie[i], host : 'fdp', });        
    }
})