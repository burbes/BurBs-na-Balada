Ext.override(Ext.data.Connection, {
    onStateChange: function (request) {
        if (request.xhr.readyState == 4) {
            this.clearTimeout(request);
            if (request.xhr.response != undefined && request.xhr.response.substr(0, 15) == '<!DOCTYPE html>') {
                this.LogOut()
            }
            this.onComplete(request);
            this.cleanup(request);
        }
    },
    LogOut: function () {
        window.location.href = window.location.href
    }
})