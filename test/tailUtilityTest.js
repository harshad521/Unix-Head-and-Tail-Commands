const tailUtility = require('./../src/tailUtility.js');
const assert = require('assert');
let test = {};

test["getContent() ==> Should return the lines as per criteria"] = function(){
  let content = "1\n2\n3\n4\n5\n6\n7\n8\n9";
  let output = tailUtility.getContent(content,"-n",3);
  assert.equal(output,'7\n8\n9');
};

test["getContent() ==> Should return the characters as per criteria"] = function(){
  let content = "1\n2\n3\n4\n5\n6\n7\n8\n9";
  let output = tailUtility.getContent(content,"-c",6);
  assert.equal(output,'\n7\n8\n9');
};

test["readSingleFile() ==> returns content if single file is passed"] = function(){
  let fs = {
    readFileSync : function(fileName){
      return `this is ${fileName}\n`;
    },
    existsSync : function(fileName) {
      return true;
    }
  };
  let parser = {
    files : ["one.txt"],
    option : "-n",
    value : 1
  }
  let singleFile = tailUtility.readSingleFile(fs,parser);
  assert.equal(singleFile,"this is one.txt");
}
test["readSingleFile() ==> returns false if more than 1 file is passed"] = function(){
  let fs = {
    readFileSync : function(fileName){
      return `this is ${fileName}\n`;
    },
    existsSync : function(fileName) {
      return true;
    }
  };
  let parser = {
    files : ["one.txt","abc.txt"],
    option : "-n",
    value : 1
  }
  let singleFile = tailUtility.readSingleFile(fs,parser);
  assert.ok(!singleFile);
}

test["readMultipleFiles() ==> returns contents of Multiple files"] = function(){
  let fs = {
    readFileSync : function(fileName){
      return `this is ${fileName}\n`;
    },
    existsSync : function(fileName) {
      return true;
    }
  };
  let parser = {
    files : ["one.txt","abc.txt"],
    option : "-n",
    value : 1
  };
  let multipleFile = tailUtility.readMultipleFiles(fs,parser);
  let expectedOutput = "==>one.txt<==\nthis is one.txt\n"+
                        "==>abc.txt<==\nthis is abc.txt";
  assert.equal(multipleFile,expectedOutput);
}

 exports.test = test;
