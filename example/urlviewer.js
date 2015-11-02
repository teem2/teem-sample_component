define.class(function(view, text, editor, button) {

    this.bgcolor = 'transparent';
    this.flexdirection = 'column';

    this.attribute("fetcherName", {type:String, value:"fetcher"});

    this.render = function() {
        var fetcher = this.rpc[this.classroot.fetcherName];
        return [
            editor({ name:'urlbox', width:300, height:30, bgcolor:'#222', fgcolor:'#f0f0f0', text:'http://example.com'}),
            button({text:'Load URL',  width:90, click:function() { fetcher.url = this.parent.urlbox.text; }}),
            text({name:'contents', text:'${this.rpc.' + this.classroot.fetcherName + '.response}', fgcolor:'#f0f0f0'})
        ]
    }

});
