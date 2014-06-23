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
  var counterID = 0;
  
  var firstD = coreAnim.newSquareObject("first", 50, 50, "First");
  var lastD = coreAnim.newSquareObject("last", 150, 50, "Last");
  var edgeFirstD = coreAnim.newEdgeObject("first", firstD.getID(), firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 50, null, null, "down");
  var edgeLastD = coreAnim.newEdgeObject("last", lastD.getID(), lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 50, null, null, "down");
  
  edgeFirstD.setStroke(EDGE_STROKE_NULL);
  edgeLastD.setStroke(EDGE_STROKE_NULL);
  
  coreAnim.saveState();
  coreAnim.play(0);

  this.isEmpty = function () { return first == null; }
  
  this.size = function () { return N; }
          
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
    last.drawing = coreAnim.newSquareObject(++counterID, (N+1)*100, 300, item, null);
    last.edge = coreAnim.newEdgeObject(counterID, last.drawing.getID(), last.drawing.getCoordinateX() + 50, last.drawing.getCoordinateY() + 25, null, null, "right");
    last.edge.setStroke(EDGE_STROKE_NULL);
    
    coreAnim.saveState("Inserting new node.");
    
    edgeLastD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
    edgeLastD.setStroke(EDGE_STROKE_DEFAULT);

    coreAnim.saveState("Update the last pointer.");
    
    if (this.isEmpty()) {
      first = last;
      
      edgeFirstD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
      edgeFirstD.setStroke(EDGE_STROKE_DEFAULT);
      
      coreAnim.saveState("If the list was empty, update the first pointer too.");
    } else {
      oldlast.next = last;
    }
      
    N++;
    coreAnim.play();
  }
  
  this.dequeue = function() {
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    var item = first.item;
    
    coreAnim.removeShape(first.drawing.getID());
    coreAnim.saveState();

    first = first.next;
    
    if (first != null){
      edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      coreAnim.saveState("Dequeue the first position.");
    }
    
    var iterator = first;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX()-100, iterator.drawing.getCoordinateY());
      
      iterator = iterator.next;
    }
    
    if (this.isEmpty()){
      last = null;
      
      edgeFirstD.moveEdgeEnd(firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 100);
      edgeFirstD.setStroke(EDGE_STROKE_NULL);
      edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
      edgeLastD.setStroke(EDGE_STROKE_NULL);
    } else {
      edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      edgeLastD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
    }
    
    coreAnim.saveState("Update the pointers.");
    
    N--;
    
    coreAnim.play();
    return item;
  }
}