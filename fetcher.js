define.class(function fetcher($server$, service) {

    this.attributes = {
        response: String,
        url: String
    };

    //when the url is set, go and grab the content and stick it in the response attribute
    this.onurl = function(url) {
        this.response = this.request(url.value)
    };

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
        } else if (typeof(url) == 'string') {
            return url.split('').reverse().join('');
        } else {
            return "Unknown URL Format: " + url;
        }
    }

});