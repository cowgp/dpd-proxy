var
    Resource = require('deployd/lib/resource'),
    util = require('util'),
    url = require('url'),
    curl = require('curlrequest');

function Proxy(name, options) {
    Resource.apply(this, arguments);
}
util.inherits(Proxy, Resource);
module.exports = Proxy;

Proxy.prototype.clientGeneration = true;

Proxy.prototype.handle = function (ctx, next) {
    if(ctx.req && ctx.req.method !== 'GET') return next();


    var completionCallback = function(error, response){
        if (error) {
            console.error(error);
            // Bad request
            ctx.res.statusCode = 400;
            ctx.res.end();
        }else{
            ctx.res.write(response);
            ctx.res.statusCode = 200;
            ctx.res.end();
        }

    };

    var fetchRequest = {url: decodeURIComponent(ctx.query.url)};
    curl.request(fetchRequest, completionCallback);

};
