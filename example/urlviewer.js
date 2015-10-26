define.class(function(view, text, editor, button) {

    this.attribute("fetcher", {type:String, value:"fetcher"});

    this.render = function() {
        var fetcher = this.rpc[this.classroot.fetcher];
        return [
            view(
                {height:50, width:500, bgcolor:'transparent'},
                editor({ name:'urlbox', x:10,  width:300, height:30, bgcolor:'#222', fgcolor:'#f0f0f0', text:'http://example.com'}),
                button({text:'Load',  x:100, height:40, click:function() {
                    var self = this;
                    fetcher.request(this.parent.urlbox.text).then(function(answer){
                        self.parent.contents.text = answer.value
                    })
                }}),
                text({name:'contents', text:'', x:0, y:10, height:500, width:500, fgcolor:'#f0f0f0'})
            )
        ]
    }

});
