// Defines a Stack object (Array Implementation). Used to keep track of the object internally and to interact with the animations

var StackArray = function(){
  var anim = new StackArrayAnim();

  var internalStack = [];
  var cap = 16;
  var N = 0;
  
  this.getAnim = function(){
    return anim;
  }
  
  this.init = function() {
    internalStack = [];
    N = 0;
    
    anim.empty();
  }
  
  this.isEmpty = function() { return N == 0; }
  
  this.size = function() { return N; }
  
  this.push = function(item) {
    if(N < cap && item!="") {      
      internalStack[N] = item;
      anim.push(item, N, ++N);
    }
    
    return;
  }
  
  this.pop = function() {
    if(!this.isEmpty()){
      anim.pop(--N);
      
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