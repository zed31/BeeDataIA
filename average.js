module.exports = {
    averrage : function(objs, callback) {
        console.log(objs.length)
        var i = 0;
        var res = 0;
        var j = 0;
        for (i in objs) 
        {
            objs[i].averrage = 0;
            for (j in objs[i].value) 
            {
                res += objs[i].value[j]
                objs[i].averrage += objs[i].value[j];
            }
            objs[i].averrage = (objs[i].averrage) / j;
            res = (objs[i].averrage * objs[i].coeff);
            j = 0;
        }
        res /= 16
        objs[objs.length + 1] = {
            name : "Moyenne finale",
            averrage : res
        }
        callback(objs)
    }
}
