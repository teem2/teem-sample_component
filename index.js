define.class(function(composition, screens, screen, view, label, button, fetcher) {

    this.render = function() {
        return [
            fetcher({name:'fetchy'}),
            screens(
                screen(
                    {
                        name:'main',
                    },
                    label({
                        name:'urlbox',
                        width:300,
                        height:30,
                        bgcolor:'#222',
                        fgcolor:'#f0f0f0',
                        text:'http://example.com'
                    }),
                    button({
                        text:'Load URL',
                        width:90,
                        click:function() {
                            this.rpc.fetchy.url = this.parent.urlbox.text;
                        }
                    }),
                    label({
                        name:'contents',
                        text:'${this.rpc.fetchy.response}',
                        fgcolor:'#f0f0f0',
                        bgcolor:'transparent'
                    })
                )
            )
        ]
    }

});
