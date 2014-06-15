// Defines a Stack object (Array Implementation). Used to keep track of the object internally and to interact with the animations

var QueueArray = function(){
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
  
  var anim = new ArrayObject();

  var internalQueue = [];
  var cap = 16;
  var head = 0;
  var tail = 0;
  
  this.getAnim = function(){
    return anim;
  }
  
  this.init = function() {
    internalQueue = [];
    head = 0;
    tail = 0;
    
    anim.empty();
  }
    
  this.isEmpty = function() { return tail == 0; }
          
  this.enqueue = function(item) { 

      if(tail < cap && item!="") {
        internalQueue[tail] = item;
        anim.enqueue(item, tail, ++tail); // possivel merda
      }
  }
  
  this.dequeue = function() {
    if(!this.isEmpty()) {
      var v = queue[head];
      anim.dequeue(head, ++head); // possivel merda
      
      if(head == tail)
        this.init();
        
      return v;
    }
  }
}