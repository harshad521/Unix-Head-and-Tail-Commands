const Parser = require('./../src/parser.js');
const assert = require('assert');
let test = {};

test["getExactArgs() ==> Should slice first 2 fields from parameter"]=function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  assert.deepEqual(parser.shellArgs,["node","head.js","-n","10","one.txt"]);
  parser.getExactArgs();
  assert.deepEqual(parser.shellArgs,["-n","10","one.txt"]);
};

test["isOption() ==> Should return true if element is option"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);

  assert.ok(parser.isOption("-n",0,["-n",10,"-c",5]));
  assert.ok(parser.isOption("-c",2,["-n",10,"-c",5]));
  assert.ok(parser.isOption("-a",0,["-a",10,"-c",5]));
}

test["isOption() ==> Should return false if element is not option"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  assert.ok(!parser.isOption("a",0,["a",10,"-c",5]));
}

test["hasFiles() ==> Should return true if file is present"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.insertFileInList("one.txt");
  assert.ok(parser.hasFiles());
}

test["insertFileInList() ==> Should  insert file is files"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.insertFileInList("one.txt");
  parser.insertFileInList("abc.txt");
  assert.deepEqual(parser.files,["one.txt","abc.txt"]);
};

test["isOptionValid() ==> Should return true if option is valid"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  assert.ok(parser.isOptionValid("-n"));
  assert.ok(parser.isOptionValid("-c"));
};

test["isOptionValid() ==> Should return false if option is invalid"] = function(){
  let argument = ["node","head.js","-n","10","one.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  assert.ok(!parser.isOptionValid("-a"));
  assert.ok(!parser.isOptionValid(10));
};
test["isOptionValid() ==> Should return false if option is invalid"] = function(){
  let argument = ["-n","10","-c10","one.txt","abc.txt"];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.sortFilesAndOptions();
  assert.deepEqual(parser.options,["-n","10","-c10"])
  assert.deepEqual(parser.files,["one.txt","abc.txt"])
};
test["sliceValueFromOption() ==> Should return list with option and value seperated"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.options = ["-n10","-c10","-n","10","-c10"];
  parser.sliceValueFromOption();
  assert.deepEqual(parser.options,["-n","10","-c","10","-n","10","-c","10"]);
};

test["replaceNumberOptions() ==> Should return list by replacing numberOption with [-n,10]"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.options = ["-10","-c",10,"-n","10","-5"];
  parser.replaceNumberOptions();
  assert.deepEqual(parser.options,["-n",10,"-c",10,"-n",10,"-n",5]);
};

test["handleMinusOption() ==> Should return list by replacing numberOption with [-n,10]"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.shellArgs = ["--","-c",10,"-n","10","-5"];
  parser.handleMinusOption("--",["-n",10]);
  assert.deepEqual(parser.options,["-n",10]);
  assert.deepEqual(parser.files,["-c",10,"-n","10","-5"]);
};

test["selectLastOption() ==> Should select last option and value in list"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.options = ["-c",10,"-n",10,"-c",5];
  parser.selectLastOption();
  assert.equal(parser.option,"-c");
  assert.equal(parser.optionValue,5);
};

test["getOptionIndex() ==> Should return the index of given option"] = function(){
  let options = ["-c",10,"-n",10,"-c",5,-10];
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  assert.equal(parser.getOptionIndex(options,-10),6);
  assert.equal(parser.getOptionIndex(options,"-c"),0);
};


test["getNegativeOptions() ==> Should return the negative options from options"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  let options =  ["-c",10,-5,"-n",10,"-c",5,-10];
  assert.deepEqual(parser.getNegativeOptions(options),[-5,-10]);
};

test["hasHelp() ==> Should return help content if options contains --help"] = function(){
  let argument = [];
  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "head"
  };
  let parser = new Parser(validRules,argument);
  parser.options =  ["-c",10,-5,"-n",10,"-c",5,-10,"--help"];
  assert.equal(parser.hasHelp(),help);
};
exports.test = test;



let help = `EAD(1)\t\t  BSD General Commands Manual\t\t  HEAD(1)\n
NAME
\thead -- display first lines of a file\n
SYNOPSIS
\thead [-n count | -c bytes] [file ...]\n
DESCRIPTION
\tThis filter displays the first count lines or bytes of each of the specified files, or of the standard input
\tif no files are specified.  If count is omitted it defaults to 10.\n
\tIf more than a single file is specified, each file is preceded by a header consisting of the string==> XXX
\t<== where XXX is the name of the file.\n\nEXIT STATUS\n\tThe head utility exits 0 on success, and >0 if an error occurs.\n
SEE ALSO
\ttail(1)\n
HISTORY
\tThe head command appeared in PWB UNIX.\n
BSD\t\t\t      June 6, 1993\t\t\t      BSD
(END)\n\n`;
