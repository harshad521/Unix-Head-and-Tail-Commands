exports.readFile = function(stream,filename){
  return stream.existsSync(filename) && stream.readFileSync(filename,"utf8");
};
