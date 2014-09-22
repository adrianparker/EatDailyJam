#!/usr/bin/env node

/**
 * Downloads the daily jam from DailyJam.co.nz.  ./EatDailyJam -d /path/to/save/to
 */

var argv = require('argv'),
    htmlparser = require('htmlparser2'),
    http = require('http'),
    fs = require('fs'),
    version = '0.3.1',
    savePath,
    dailyJamHTML,
    title,
    artist;

function start() {
    console.log('Eat Daily Jam v ' + version);
    argv.version(version);
    argv.option({
        name: 'directory',
        short: 'd',
        type: 'path',
        description: 'Pot to put today\'s Jam in',
        example: "'EatDailyJam --directory=/your/music/folder' or 'EatDailyJam -d \"/Users/adrian/Music/iTunes/iTunes Media/Automatically Add to iTunes\"'"
    });
    var args = argv.run();
    if (!args || !args.options || !args.options.directory) {
        console.log('Please supply a directory using the -d option');
        argv.help();
        process.exit(1);
    } else {
        savePath = args.options.directory;
        fetchHTML();
    }
}

function fetchHTML() {
    console.log('   Saving jam to "' + savePath + '" folder.');
    var options = {
        host: 'dailyjam.co.nz',
        path: '/'
    };
    console.log('   Reading dailyjam.co.nz...');
    var jamMasterJay = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            dailyJamHTML = data;
            parseHTML();
        });
    });
    jamMasterJay.on('error', function (e) {
        console.log("Pooh. This error went down : " + e.message);
        process.exit(1);
    });
    jamMasterJay.end();
}

function parseHTML() {
    console.log('   Parsing...');
    var grabTitle = false,
        grabArtist = false,
        fileURL;
    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            grabTitle = (attribs.class === 'trackTitle');
            grabArtist = (attribs.class === 'artist');
            if (attribs.class === 'download_link') {
                fileURL = attribs.href;
            }
        },
        ontext: function (text) {
            if (grabTitle) {
                title = text;
            }
            if (grabArtist) {
                artist = text;
            }
        },
        onclosetag: function () {
            grabArtist = grabTitle = false;
        }
    });
    parser.write(dailyJamHTML);
    parser.end();
    console.log('   Today\'s jam is ' + title + ' by ' + artist + '...');
    downloadTrack('http://dailyjam.co.nz/' + fileURL, savePath, onComplete);
}

function downloadTrack(url, dest, cb) {
    console.log('   Downloading... (be patient, this takes a wee while)');
    var filename = url.substring(url.lastIndexOf('/'));
    dest += filename.substring(dest[dest.length - 1] !== '/' ? 0 : 1);
    var file = fs.createWriteStream(dest);
    file.on('error', function (err) {
        console.log('Arse. This happened writing the file: ' + err);
        process.exit(3);
    });

    http.get(url,function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    }).on('error', function (err) {
            fs.unlink(dest);
            console.log('Rats! This happened while downloading: ' + err.message);
            process.exit(2);
        });
}

function onComplete() {
    console.log('Done! Check out ' + title + ' by ' + artist + ' at ' + savePath + ' and kick out the jam!');
}

start();


