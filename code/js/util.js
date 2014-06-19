function deepCopy(obj){
  var newObj;

  if(obj instanceof Array){
    var i;

    newObj = [];

    for (i = 0; i < obj.length; i++) {
      newObj.push(deepCopy(obj[i]));
    }
  }

  else if(obj instanceof Object){
    newObj = {};

    for(keys in obj){
      newObj[keys] = deepCopy(obj[keys]);
    }
  }

  else{
    newObj = obj;
  }

  return newObj;
}

function copy(obj){
  var newObj;
  
  if(obj instanceof Object){
    newObj = {};
    
    for(var key in obj){
      newObj[key] = obj[key].slice(0);
    }
  }
  
  return newObj;
}

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


/*
Object.prototype.clone = Array.prototype.clone = function(){
  if(Object.prototype.toString.call(this) === '[object Array]'){
    var clone = [];
    for (var i=0; i<this.length; i++)
      clone[i] = this[i].clone();

    return clone;
  }else if (typeof(this)=="object"){
    var clone = {};
    for (var prop in this)
      if (this.hasOwnProperty(prop))
        clone[prop] = this[prop].clone();

    return clone;
  }
  else
    return this;
}
*/

Function.prototype.clone = function() {
    var cloneObj = this;
    if(this.__isClone) {
      cloneObj = this.__clonedFrom;
    }

    var temp = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;
};

function cloneAttributes(objectList){
  var clone = {};
  
  for(var i = 0; i<Object.keys(objectList).length; i++){
    clone[i] = objectList[i].getAttributes();
  }
  
  return clone;
}