'use strict';

var through = require('through2');
var vNamespacer = require('v-namespace');
var PluginError = require('gulp-util').PluginError;

function main(options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError("gulp-v-namespace", "Streaming not supported."));
        }
        //func(file.contents.toString(), options)
        var reoutput = vNamespacer(file.contents.toString())
        file.contents = new Buffer(reoutput);
       
        this.push(file);
        
        return cb();
    });
}

function mainFactoryCall(options) {
    return main(options);
}

module.exports = mainFactoryCall;
