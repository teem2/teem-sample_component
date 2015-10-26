define.class(function fetcher(server) {

    //attribute RPC isn't working yet
    //this.attribute("url", {type:String, value:""});
    //this.attribute("response", {type:String, value:""});

    // request will be performed on the server
    this.request = function(url) {
        if (/^https?:.*/.test(url)) {
            try {
                var srequest = require('sync-request');
                var res = srequest('GET', url);
                var body = res.getBody().toString();
                return body;
            } catch(err) {
                return ['[ERROR]', err.message].join(' ');
            }
        } else if (url) {
            return url.split('').reverse().join('');
        }
    }

});