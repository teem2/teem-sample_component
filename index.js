define.class(function(composition, screens, screen, view, text, button, sample$fetcher, sample$example$urlviewer) {

    this.render = function() {
        return [
            sample$fetcher({name:'sampfetcher'}),
            screens(
                screen({name:'main'},
                    sample$example$urlviewer({ x:10, y:10, bgcolor:"transparent", fetcher:'sampfetcher' })
                )
            )
        ]
    }

});
