define.class(function fetcher(server) {

    this.attribute("response", {type:String, value:""});

    this.attribute("url", {type:String, value:""});

    //when the url is set, go and grab the content and stick it in the response attribute
    this.onurl = function(url) {
        this.response = this.request(url)
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
        } else if (url) {
            return url.split('').reverse().join('');
        }
    }

});