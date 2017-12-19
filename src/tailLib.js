const Parser = require('./parser.js');
const lib = require('./errorHandling.js');
const utility = require('./utility.js');
const stdInForHead = require('./stdInForHead.js');
const tailUtility = require('./tailUtility.js');
exports.execute = function(fs,streamIn,streamOut,argument){

  let validRules = {
    validOptions : ["-n","-c"],
    explicitOptions : ["--help","--"],
    defaultOption : "-n",
    defaultValue : 10,
    parserPurpose : "tail"
  };
  
  let parser = new Parser(validRules,argument);
  parser.getExactArgs();
  parser.sortFilesAndOptions();
  parser.sliceValueFromOption();
  parser.handleMinusOption(parser);
  lib.validateOptions(parser);
  parser.selectOptionAndValue();
  let contents = tailUtility.getFinalContent(fs,streamIn,streamOut,parser);
  return parser.help||parser.error||contents;
}
