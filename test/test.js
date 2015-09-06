'use strict';

/**
 * Test runner for gulp-cordova-preference
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  6 Sep. 2015
 */

// module dependencies
var chai = require('chai'),
    tempfile = require('tempfile'),
    fs = require('fs-extra'),
    path = require('path'),
    os = require('os'),
    gutil = require('gulp-util');

// use should flavour
var should = chai.should();

var pref = require('../');

describe('gulp-cordova-preference', function() {

    beforeEach(function() {
        this.tmp = tempfile();

        fs.copySync(path.join(__dirname, '/fixtures/config.xml'), path.join(this.tmp, 'config.xml'));
    });

    it('Should add one preference if the preference is passed as argument', function(cb) {
        var tmp = this.tmp;
        var result = [
            '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
            '<widget>',
            '    <preference name="ShowTitle" value="true" />',
            '</widget>'
        ];

        // Create the stream
        var stream = pref('ShowTitle', true);

        stream.on('data', function() { });

        stream.on('end', function() {
            var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

            // Assert the content
            content.should.be.equal(result.join(os.EOL) + os.EOL);

            cb();
        });

        // Write the file to the stream
        stream.write(new gutil.File({
            cwd: __dirname,
            base: tmp,
            path: tmp,
            stat: fs.statSync(tmp)
        }));

        stream.end();
    });

    it('Should add multiple preferences if an object of key-value pairs is passed', function(cb) {
        var tmp = this.tmp;
        var result = [
            '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
            '<widget>',
            '    <preference name="ShowTitle" value="true" />',
            '    <preference name="AndroidLaunchMode" value="singleTop" />',
            '</widget>'
        ];

        // Create the stream
        var stream = pref({
            'ShowTitle': true,
            'AndroidLaunchMode': 'singleTop'
        });

        stream.on('data', function() { });

        stream.on('end', function() {
            var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

            // Assert the content
            content.should.be.equal(result.join(os.EOL) + os.EOL);

            cb();
        });

        // Write the file to the stream
        stream.write(new gutil.File({
            cwd: __dirname,
            base: tmp,
            path: tmp,
            stat: fs.statSync(tmp)
        }));

        stream.end();
    });
});