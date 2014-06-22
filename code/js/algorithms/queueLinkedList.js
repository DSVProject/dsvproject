// Defines a Queue object (Linked-List Implementation). Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var item;
  var next;
  var drawing;
  var edge;
}

var QueueLinkedList = function(){
  var coreAnim = new CoreAnimObject();
  coreAnim.init();

  var first = null;
  var last = null;
  var N = 0;
  
  var firstD = coreAnim.newSquareObject("first", 50, 50, "First");
  var lastD = coreAnim.newSquareObject("last", 150, 50, "Last");
  coreAnim.saveState();
  coreAnim.play(0);
  
  /*
  this.init = function() {
    var first = null;
    var last = null;
    var N = 0;
    
    var firstD = coreAnim.newSquareObject("first", 50, 50, "null", "first");
    var lastD = coreAnim.newSquareObject("last", 150, 50, "null", "last");
    coreAnim.saveState();
    coreAnim.play(0);
  }
  */
    
  this.isEmpty = function() { return first == null; }
  
  this.size = function() { return N; }
          
  this.enqueue = function(item) { 
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    var oldlast = last;
    
    if (oldlast != null) {
      oldlast.edge.setStroke(EDGE_STROKE_DEFAULT);
    }
    
    last = new Node();
    last.item = item;
    last.next = null;
    last.drawing = coreAnim.newSquareObject(N+1,(N+1)*100, 300, item, null);
    last.edge = coreAnim.newEdgeObject(N+1, last.drawing.getID(), last.next);
    last.edge.setStroke(EDGE_STROKE_NULL);
    
    //lastD.setText(N+1);
    coreAnim.saveState();
    
    if(this.isEmpty()){
      first = last;
      //firstD.setText(lastD.getText());
    }
    else{
      oldlast.next = last;
    }
      
    N++;
    coreAnim.play();
  }
  
  this.dequeue = function() {
    coreAnim.clearLog();
    coreAnim.newStateList();
    var item = first.item;
    
    alert(first.drawing.getID());
    first.drawing.remove();
    coreAnim.saveState();
    first = first.next;
    
    var it = first;
    while(it != null) {
      it.drawing.moveShape((it.drawing.getCoordinateX()-100), it.drawing.getCoordinateY());
      it.edge.moveEdge(it.edge.getCoordinateX1(), it.edge.getCoordinateY1());
      coreAnim.saveState();
      
      it = it.next;
    }
    
    if(this.isEmpty())
      last = null;
    N--;
    
    coreAnim.play();
    return item;
  }
}