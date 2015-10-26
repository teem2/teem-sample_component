# Sample Component

This is a sample [DreemGL](https://github.com/teem2/dreemgl) component.

## Adding Components to the Dreem GL server

Dreem GL components provide additonal fucntionality to compositions and are implemented as sibling directories that live
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

    define.class(function(composition, component$subdir$classname) {
        this.render = function() {
            return [
                component$subdir$classname({text:'used like any dreemgl class'})
            ]
        }
    });

This class would look in the `compositions` directory for a file named `component/subdir/classname.js`, 
and if found will load it out of that directory.

As a concrete example, the sample$fetcher can be used elsewhere like so:

    define.class(function(composition, screens, screen, button, sample$fetcher) {
        this.render = function() {
            return [
                sample$fetcher({name:'fetcher'}),
                screens(
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


## Struture of a Dreem GL component

Dreem GL does not require external components to take on any special structure to function, only that the component's 
directory structure be copied or linked into the server's `compositions/` directory.  External libraries can be placed 
in `node_modules` and `package.json` defines it's contents and dependancies like a typical ``npm` package. 