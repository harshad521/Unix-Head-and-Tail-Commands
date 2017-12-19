const stdInForTail = require('./stdInForTail.js');
const utility = require('./utility.js');

let getContent=function (contents,option,optionValue){
  let seperationCriteria = {
    '-n' : "\n",
    '-c' : ""
  };
  let value = {
    '-n' : -optionValue,
    '-c' : -optionValue
  };
  let contentCriteria = {
    '-n' : contents.trimRight(),
    '-c' : contents
  }
  contents = contentCriteria[option];
  let seperator = seperationCriteria[option];
  return contents.split(seperator).slice(value[option]).join(seperator);
};

let isStdInput = function (streamIn,streamOut,parser) {
  let option = parser.option;
  let value = parser.optionValue;
  let files = parser.files;
  let numberOfFiles = files.length;
  let noFilesGiven =  numberOfFiles == 0;
  let stdInFunctions = {
    "-n" : stdInForTail.readInput4N,
    "-c" : stdInForTail.readInput4C,
  }
  return noFilesGiven && stdInFunctions[option](streamIn,streamOut,value);
};

let readSingleFile = function(fs,parser){
  let content ="";
  let option = parser.option;
  let optionValue = parser.optionValue;
  let file = parser.files[0];
  let error = `${parser.parserPurpose}: ${file}: No such file or directory\n`;
  let fileContent = utility.readFile(fs,file);
  content = fileContent && getContent(fileContent,option,optionValue)+"\n";
  content = content || error;
  return parser.getNumberOfFiles() == 1 && content;
};

let readMultipleFiles = function(fs,parser){
  let content = "";
  let files = parser.files;
  let filesContent = files.map(function(element){
    let err =`${parser.parserPurpose}: ${element}: No such file or directory\n`;
    try{
      fileContent = utility.readFile(fs,element);
      content = `==>${element}<==\n`;
      content += getContent(fileContent,parser.option,parser.optionValue);
    }catch(error){
      content = err;
    };
    return content;
  });
  return filesContent.join("\n");
};

exports.getFinalContent = function(fs,streamIn,streamOut,parser){
  let option = parser.option;
  let value = parser.optionValue;
  let files = parser.files;
  let numberOfFiles = files.length;
  let contents = false;
  contents = parser.error||isStdInput(streamIn,streamOut,parser);
  let singleFileContents = readSingleFile(fs,parser);
  let multiplFileContents = readMultipleFiles(fs,parser);
  return singleFileContents || multiplFileContents;
};

exports.getContent = getContent;
exports.readSingleFile = readSingleFile;
exports.readMultipleFiles = readMultipleFiles;
