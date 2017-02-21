module.exports({
    averrage : function(objs, callback) {
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
            objs[i].averrage = (objs[i].averrage * objs[i].coeff) / j;
            res = res / objs[i].value.length;
            j = 0;
        }
        res /= objs.length;
        objs[objs.length + 1] = {
            name : "Moyenne finale",
            averrage : res
        }
        callback(objs)
    }
})
