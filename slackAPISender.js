var serializeResult = function(value, oncall) {
    var str = "";
    for (idxObj in value) {
        str += value[idxObj].name + " " + value[idxObj].averrage + ", ";
    }
    oncall(str);
}

module.exports = {
    sendResult : function(value) {
        serializeResult(value, function(str) {
            var slack = require("slack-node")
            var webhook = "https://hooks.slack.com/services/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";
            var slack = new slack();
            slack.setWebhook(webhook);
            slack.webhook({
                channel: "#averrage_notif",
                username: "BeeIA",
                text: "Eh Aïe Aïe Aïe. " + str
            }, function(err, response) {
                console.log(response);
            });
        })
    }
}
