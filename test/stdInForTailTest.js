const stdInForTail = require('./../src/stdInForTail.js');
const assert = require('assert');
let test={};
test["readInput4N should read mentioned number of lines"]=function(){
  const EventHandler = require('events');
  let dummyStreamIn = new EventHandler();
  let unref = false;
  let contents="";
  let encoding;

  dummyStreamIn.on('data',function(data){
    contents+=data;
  });

  dummyStreamIn.setEncoding=function(parameter){
    encoding=parameter;
  };

  dummyStreamIn.setEncoding=function(parameter){
    encoding=parameter;
  };

  let output ="";
  let dummyStreamOut = {
    write : function(data){
      output=data;
    }
  };

  let end = false;
  dummyStreamIn.on('end',function(parameter){
    end = true;
  });

  stdInForTail.readInput4N(dummyStreamIn,dummyStreamOut,5);

  assert.ok(!end);
  assert.equal(encoding,"utf8");
  assert.ok(!end);
  dummyStreamIn.emit('data',"hi\n");
  dummyStreamIn.emit('data',"hello\n");
  dummyStreamIn.emit('data',"take care\n");
  dummyStreamIn.emit('data',"good morning\n");
  dummyStreamIn.emit('data',"goodbye\n");
  dummyStreamIn.emit('data',"all d best\n");
  dummyStreamIn.emit('data',"happy weekend\n");

  dummyStreamIn.emit('end');
  assert.ok(end);
  let expectedOutput = "take care\ngood morning\ngoodbye"+
                        "\nall d best\nhappy weekend";
  assert.equal(expectedOutput,output);
};
test["readInput4C should read mentioned number of characters"]=function(){
  const EventHandler = require('events');
  let dummyStreamIn = new EventHandler();
  let unref = false;
  let contents="";
  let encoding;
  let output ="" ;

  dummyStreamIn.on('data',function(data){
    contents+=data;
  });

  dummyStreamIn.setEncoding=function(parameter){
    encoding=parameter;
  };

  dummyStreamIn.unref=function(){
    unref = true;
  };

  dummyStreamOut = {
    write : function(content){
        output=content;
    }
  };

  let end = false;
  dummyStreamIn.on('end',function(parameter){
    end = true;
  });

  stdInForTail.readInput4C(dummyStreamIn,dummyStreamOut,15);
  assert.equal(encoding,"utf8");
  assert.ok(!end);
  dummyStreamIn.emit('data',"hi\n");
  dummyStreamIn.emit('data',"hello\n");
  dummyStreamIn.emit('data',"take care");
  dummyStreamIn.emit('end');
  assert.ok(end);
  assert.equal(output,"hello\ntake care");
}

 exports.test = test;
