'use strict';

const fs = require('fs');
const path = require('path');

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        } else {
            filelist.push(file);
        }
    });
    return filelist;
};

const files = walkSync(path.join(__dirname, '../'));
console.log(files);