var through = require('through2');
var nodefy = require('nodefy').parse;
var gutil = require('gulp-util');
var Buffer = require('buffer').Buffer;
var path = require('path');

module.exports = function () {
    var transform = function (file, enc, cb) {
        if (file.isNull()) return cb(null, file); 
        if (file.isStream()) return cb(new gutil.PluginError('gulp-nodefy', 'Streaming not supported'));

        var data;
        var str = file.contents.toString('utf8');

        try {
            data = nodefy(str);
        } catch (err) {
            return cb(new gutil.PluginError('gulp-nodefy', err));
        }

        file.contents = new Buffer(data);
        cb(null, file);
    };

    return through.obj(transform);
};
