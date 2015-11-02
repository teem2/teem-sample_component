define.class(function(composition, screens, screen, view, text, button, sample$fetcher, sample$example$urlviewer) {

    this.render = function() {
        return [
            sample$fetcher({name:'fetchy'}),
            screens(
                screen(
                    sample$example$urlviewer({ fetcherName:'fetchy' })
                )
            )
        ]
    }

});
