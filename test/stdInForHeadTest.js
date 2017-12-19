const stdInForHead = require('./../src/stdInForHead.js');
const assert = require('assert');
let test={};
test["readInput4N should read mentioned number of lines"]=function(){
  const EventHandler = require('events');
  let dummyStreamIn = new EventHandler();
  let unref = false;
  let contents="";
  let encoding;

  dummyStreamIn.on('data',function(data){
    contents=data;
  });

  dummyStreamIn.setEncoding=function(parameter){
    encoding=parameter;
  };

  dummyStreamIn.unref=function(){
    unref = true;
  };

  let output ="";
  let dummyStreamOut = {
    write : function(data){
      if(!unref){
        output=data;
      }
    }
  };

  stdInForHead.readInput4N(dummyStreamIn,dummyStreamOut,5);

  assert.equal(encoding,"utf8");

  dummyStreamIn.emit('data',"hi");
  assert.equal(contents,"hi")
  assert.equal(output,"hi")
  assert.ok(!unref);

  dummyStreamIn.emit('data',"hello");
  assert.equal(contents,"hello")
  assert.equal(output,"hello")
  assert.ok(!unref);

  dummyStreamIn.emit('data',"take care");
  assert.equal(contents,"take care")
  assert.equal(output,"take care")
  assert.ok(!unref);

  dummyStreamIn.emit('data',"good morning");
  assert.equal(contents,"good morning");
  assert.equal(output,"good morning");
  assert.ok(!unref);

  dummyStreamIn.emit('data',"goodbye");
  assert.equal(contents,"goodbye");
  assert.equal(output,"goodbye");
  assert.ok(unref);

  dummyStreamIn.emit('data',"all d best");
  assert.equal(contents,"all d best");
  assert.notEqual(output,"all d best");

  dummyStreamIn.emit('data',"happy weekend");
  assert.equal(contents,"happy weekend");
  assert.notEqual(output,"happy weekend");

  assert.ok(unref);
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

  stdInForHead.readInput4C(dummyStreamIn,dummyStreamOut,15);
  assert.equal(encoding,"utf8");
  assert.ok(!unref);
  dummyStreamIn.emit('data',"hi\n");
  dummyStreamIn.emit('data',"hello\n");
  dummyStreamIn.emit('data',"take care\n");
  assert.ok(unref);
  assert.equal(output,"hi\nhello\ntake c")
}

exports.test = test;
