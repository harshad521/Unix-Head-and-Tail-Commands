const lib = require('./tailLib.js');
const fs = require('fs');
const streamIn = process.stdin;
const streamOut = process.stdout;
const argument =process.argv;
process.stdout.write(lib.execute(fs,streamIn,streamOut,argument));
