// Defines a Stack object (Linked-List Implementation). Used to keep track of the object internally and to interact with the animations

var Node = function(){
  var item;
  var next;
}

var StackLinkedList = function(){
  //var anim = new StackLinkedListAnim();

  var first = null;
  var N = 0;
  
  /*
  this.getAnim = function(){
    return anim;
  }
  */
  this.init = function() {
    var first = null;
    var N = 0;
    
    //anim.empty();
  }
    
  this.isEmpty = function() { return first == null; }
  
  this.size = function() { return N; }
          
  this.push = function(item) { 
    var oldfirst = first;
    first = new Node();
    first.item = item;
    first.next = oldfirst;
    N++;
    
    //anim.enqueue()
  }
  
  this.pop = function() {
    var item = first.item;
    first = first.next;
    N--;
    
    return item;
  }
}