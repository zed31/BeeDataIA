module.exports = {
    averrage : function(objs, callback) {
        var i = 0;
        var res = 0;
        var j = 0;
        for (i in objs)  {
            objs[i].averrage = 0;
            for (j in objs[i].value) {
                objs[i].averrage += objs[i].value[j];
            }
            objs[i].averrage /= (j + 1);
            j = 0;
        }
        callback(objs)
    }
}
