// Defines a Queue object (Array Implementation). Used to keep track of the object internally and to interact with the animations

var QueueArray = function(){
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
        anim.enqueue(item, tail, ++tail);
      }
  }
  
  this.dequeue = function() {
    if(!this.isEmpty()) {
      var v = queue[head];
      anim.dequeue(head, ++head);
      
      if(head == tail)
        this.init();
        
      return v;
    }
  }
}