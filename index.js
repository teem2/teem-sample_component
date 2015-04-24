// The MIT License (MIT)
// 
// Copyright ( c ) 2015 Teem2 LLC
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
//
// Based upon the design of the rovi server plugin.

'use strict';

var request = require('request');
var querystring = require('querystring');

module.exports = {
  // Called from server.js to initialize the patterns to intercept
  initialize: function(app) {
    // Intercept server-size calls to /sample_component
    app.use(this.sample_server(new RegExp('^\/sample_component\/')));
  },

  // The sample server component takes requests to /sample_component/* and
  //   - Makes a web request to the specified url,
  //   - Returns the response
  // The 'request' component is used.
  sample_server: function (pattern) {
    return function(req, res, next) {
      var url = req.url;
      if (url.match(pattern)) {
        // strip off matched pattern
        var newpath = url.replace(pattern, '');
        // strip off query string
        newpath = newpath.replace(/\?.*/, '');

        var query = req.query;
        req.url = newpath + '?' + querystring.stringify(query);
        console.log('loading', req.url);

        // Use request() to retrieve the response, and pipe it back
        // to the component.
        // (This does not include error handling)
        req.pipe(request({url: req.url, followRedirect: true})).pipe(res);
      } else {
        next();
      }
    }
  },

};
