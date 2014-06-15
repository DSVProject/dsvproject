// Defines a Stack object (Array Implementation). Used to keep track of the object internally and to interact with the animations

var StackArray = function(){
  //array
  var arrayObj = {
    "id": null,
  
    "cell": {
      "class": null,
      "cx": null,
      "cy": null,
      "x": null,
      "y": null,
      "r": null,
      "width": null,
      "height": null,
      "fill": null,
      "stroke": null,
      "stroke-width": null
    },
  
    "text": {
      "class": null,
      "x": null,
      "y": null,
      "text": null,
      "fill": null,
      "font-family": null,
      "font-weight": null,
      "font-size": null,
      "text-anchor": null
    }
  }
  
  //linked list
  var llistObj = {
    "id": null,
  
    "pointer": null,
  
    "cell": {
      "class": null,
      "cx": null,
      "cy": null,
      "x": null,
      "y": null,
      "r": null,
      "fill": null,
      "width": null,
      "height": null,
      "stroke": null,
      "stroke-width": null
    },
  
    "cellPointer": {
      "class": null,
      "cx": null,
      "cy": null,
      "x": null,
      "y": null,
      "r": null,
      "fill": null,
      "width": null,
      "height": null,
      "stroke": null,
      "stroke-width": null
    },
  
    "text": {
      "class": null,
      "x": null,
      "y": null,
      "fill": null,
      "font-family": null,
      "font-weight": null,
      "font-size": null,
      "text-anchor": null,
      "text": null
    }
  }
  
  //node
  var nodeObj = {
    "id": null,
  
    "parent": null,
  
    "leftChild": null,
  
    "rightChild": null,
  
    "subTreeCount": null,
  
    "cell": {
      "class": null,
      "cx": null,
      "cy": null,
      "x": null,
      "y": null,
      "r": null,
      "fill": null,
      "width": null,
      "height": null,
      "stroke": null,
      "stroke-width": null
    },
  
    "text": {
      "class": null,
      "x": null,
      "y": null,
      "fill": null,
      "font-family": null,
      "font-weight": null,
      "font-size": null,
      "text-anchor": null,
      "text": null
    }
  }

  var anim = new ArrayObject();

  var internalStack = [];
  var jsonStack = [];
  var cap = 16;
  var N = 0;
  
  this.getAnim = function(){
    return anim;
  }
  
  this.init = function() {
    internalStack = [];
    jsonStack = [];
    N = 0;
    
    anim.empty();
  }
  
  this.isEmpty = function() { return N == 0; }
  
  this.size = function() { return N; }
  
  this.push = function(item) {
    if(N < cap && item!="") {      
      internalStack[N] = item;
      N++;

      anim.push(item, N-1, N);
    }
    
    return;
  }
  
  this.pop = function() {
    if(!this.isEmpty()){
      N--;
      
      anim.pop(N);
      
      return internalStack[N];
    }
  }
  
  this.displayAll = function() { 
    var array = [];
    
    if(isEmpty() == true)
      return null;
    for(i=0;i<N;i++)
      array[i] = internalStack[i];
    return array; 
  }
}