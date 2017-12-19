const utility = require('./../src/utility.js');
const assert = require('assert');
let test = {};
test["readFile() ==> Should read data from the given file"] = function(){
  let actualOutput = "";
  let dummyStream={
    readFileSync:function(filename){
      actualOutput+="this is "+filename;
    },
    existsSync: function(filename){
      return true
    }
  }
  utility.readFile(dummyStream,"one.txt");
  assert.equal(actualOutput,"this is one.txt");
};

test["readFile() ==> Should give false if file does not exists"] = function(){
  let actualOutput = "";
  let dummyStream={
    readFileSync:function(filename){
      actualOutput+="this is "+filename;
    },
    existsSync: function(filename){
      actualOutput = false;
    }
  }
  utility.readFile(dummyStream,"one.txt");
  assert.equal(actualOutput,false);
};
exports.test = test;
