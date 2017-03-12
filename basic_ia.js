var influxDB = require('./influxAPI').create({
    ip : '92.91.153.36', port : 18086 
});

const coeff = { poid : 10, temperature : 4, hydrometrie : 2, sum : 16 }

var avg_final = []

influxDB.connect({
    database : 'hive_monitoring', username : 'franco', password : 'franco12345', nameseries : ['poid', 'temperature', 'hydrometrie'], host : 'ia_beeData'
}).then(() => {
    console.log("connected");
    influxDB.select("SELECT * FROM temperature").then(result => {
        result.forEach(elem => {
            var avg_element = avg_final.find(haystack => (haystack.UID === elem.UID && haystack.name === "temperature"))    
            if (avg_element != undefined) {
                avg_element.value.push(elem.value);
            } else {
                avg_final.push({ UID : elem.UID, name : "temperature", coeff : coeff.temperature, value : [elem.value] })
            }
        })
        influxDB.select("SELECT * FROM poid").then(result => {
            result.forEach(elem => {
                var avg_element = avg_final.find(haystack => (haystack.UID === elem.UID && haystack.name === "poid"))
                if (avg_element != undefined) {
                    avg_element.value.push(elem.value)
                } else {
                    avg_final.push({ UID : elem.UID, name : "poid", coeff : coeff.poid, value : [elem.value] })
                }
            })
            influxDB.select("SELECT * FROM hydrometrie").then(result => {
                result.forEach(elem => {
                    var avg_element = avg_final.find(haystack => (haystack.UID === elem.UID && haystack.name === "hydrometrie"))
                    if (avg_element != undefined) {
                        avg_element.value.push(elem.value)
                    } else {
                        avg_final.push({ UID : elem.UID, name : "hydrometrie", coeff : coeff.hydrometrie, value : [elem.value] })
                    }
                })
                avg_final.sort((lhs, rhs) => {
                    return lhs.UID > rhs.UID ? 1 : lhs.UID < rhs.UID ? -1 : 0;
                })
                var slack = require('./slackAPISender');
                require('./average').averrage(avg_final, avg_final => {
                    var uid_available = [];
                    avg_final.forEach(elem => {
                        var isExist = uid_available.find(haystack => elem.UID === haystack);
                        if (isExist == undefined) {
                            uid_available.push(elem.UID);
                        }
                    })
                    uid_available.forEach(uid => {
                        var filter_uid = avg_final.filter(elem => elem.UID == uid);
                        var avg = 0;
                        filter_uid.forEach(elem => {
                            avg += elem.averrage * elem.coeff;
                            console.log(elem.UID, elem.averrage)
                        })
                        avg /= coeff.sum;
                        console.log(avg)
                        filter_uid.push({UID : uid, name : "Moyenne finale", averrage : avg})
                        slack.sendResult(filter_uid);
                        console.log("------------------------")
                    })
                })
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }).catch(err => {
        console.log(err);
    })
})

// var sender = require("./slackAPISender")
// sender.sendResult(8);
// console.log(avg);
