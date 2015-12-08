# Sample Component

This is a sample [DreemGL](https://github.com/teem2/dreemgl) component.

## Adding Components to the Dreem GL server

Dreem GL components provide additonal fucntionality to compositions and are implemented as sibling directories (by default) that live
along side the compositions, and can even be entire composition hierarchies themselves.  The simplest way to add a
component to a Dreem GL server is with a symlink

    ln -s /path/to/component/directory/ <componentname>
    
The name you choose for `<componentname>` is important as it will be the namespace that other compositions will use to 
instantiate it's classes later.  For example, if this `teem-sample_component` is linked to `sample` like so:    

    ln -s ../../teem-sample_component/ sample
    
Then all of the classes provided by this repositiory can then be accessed using `sample$<classname>`.  For example, this
repo provides the fetcher.js class, which would be accessible via `sample$fetcher` in the javascript.  

If required, be sure to install any dependancies in the component directory:
 
    npm install

## Using Added Components in Dreem

Classes from components can be used in your compositions by referencing the component and class using the '$' syntax,
like so:

    define.class(function($server$, composition, $component$subdir$classname) {
        this.render = function() {
            return [
                $component$subdir$classname({text:'used like any dreemgl class'})
            ]
        }
    });

This class would look in the root directory for a file named `component/subdir/classname.js`, 
and if found will load it out of that directory.

As a concrete example, if placed into the root directory as `sample` you can then use the fetcher 
from this repo as `$sample$, fetcher` like so:

    define.class(function($server$, composition, role, $ui$, screen, button, $sample$, fetcher) {
        this.render = function() {
            return [
                fetcher({name:'fetcher'}),
                role(
                    screen(
                        button({text:'click me', click:function() {
                            this.rpc.fetcher.request('http://example.com').then((function(answer){
                                this.text = answer.value
                            }).bind(this))
                        }})
                    )
                )
            ]
        }
    });

You can find an additional example in the `example.js` (mounted at `http://localhost:2000/sample/example`).  In this example a 
simple widget wires up both ends of fetcher, first programmatically on click (`this.rpc.fetchy.url = this.parent.urlbox.text`) 
then the result with attribute constraints (`wire('this.rpc.fetchy.response')`).

## Struture of a Dreem GL component

Dreem GL does not require external components to take on any special structure to function, only that the component's 
directory structure be copied or linked into the server's `compositions/` directory.  External libraries can be placed 
in `node_modules` and `package.json` defines it's contents and dependancies like a typical `npm` package. 

