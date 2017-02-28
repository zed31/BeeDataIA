var avg = [{
    coeff : 10,
    name : "poid",
    value : [10.2, 20.4, 30.5, 50.5]
}, {
    coeff : 4,
    name : "température",
    value : [10.4, 20.8, 40.4, 55.8]
}]
var influxDB = require('./influxAPI');
var lol = influxDB.create({
    ip : 'localhost', port : 18088 
});
lol.connect({
    database : 'test', username : '', password : '', nameseries : 'response_times', host : 'host'
}).then(() => {
    console.log("connected");
    //lol.insertItem({name : "response_times", param : {path : "izi", duration : 8}, host : 'host', });
    lol.select("SELECT * from response_times").then(result => {
        //console.log(result.groupRows[0].rows[0].duration);
        lol.removeDatabase('test');
        lol.removeItem('response_times').then(result => console.log(result)).catch(err => console.log(err));
    }).catch(err => {
        console.log(err);
    })
})