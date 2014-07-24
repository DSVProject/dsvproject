// Defines a Queue object (Linked-List Implementation). Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var item;
  var next;
  var drawing;
  var edge;
}

var QueueLinkedList = function(){
  var selfie = this;
  var coreAnim = new CoreAnimObject();
  
  const ENQUEUE = 0,
        DEQUEUE = 1;
  
  coreAnim.init();
  coreAnim.newStateList();
  coreAnim.saveState();

  var first = null;
  var last = null;
  var N = 0;
  var counterID = 0;
  
  var firstD = coreAnim.newSquareObject("first", 50, 50, "First", null, "pointer");
  var lastD = coreAnim.newSquareObject("last", 150, 50, "Last", null, "pointer");
  var edgeFirstD = coreAnim.newEdgeObject("first", firstD.getID(), firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  var edgeLastD = coreAnim.newEdgeObject("last", lastD.getID(), lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  
  edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
  edgeLastD.setStroke(defaultProperties.edge.null.stroke);

  coreAnim.saveState();
  coreAnim.play(0);
  
  this.getAnim = function () {
    return coreAnim;
  }
  
  this.generatePseudocode = function (command) {
    coreAnim.clearPseudocode();
    
    switch (command) {
        case ENQUEUE:
          coreAnim.addPseudocodeLine(0, "If newNode != null");
          coreAnim.addPseudocodeLine(1, "&nbspnode temp = value");
          coreAnim.addPseudocodeLine(2, "&nbspnode temp = value");
          coreAnim.addPseudocodeLine(3, "&nbspnode temp = value");
          coreAnim.addPseudocodeLine(4, "&nbspnode temp = value");
          coreAnim.addPseudocodeLine(5, "&nbspnode temp = value");
          break;
        case DEQUEUE:
          coreAnim.addPseudocodeLine(0, "Test 0");
          coreAnim.addPseudocodeLine(1, "Test 1");
          break;
    }
  }
  
  this.init = function () {
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    first = null;
    last = null;
    N = 0;
    counterID = 0;
    
    edgeFirstD.moveEdgeEnd(firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 100);
    edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
    edgeFirstD.setMarkerEnd(defaultProperties.marker.null.end);
    edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
    edgeLastD.setStroke(defaultProperties.edge.null.stroke);
    edgeLastD.setMarkerEnd(defaultProperties.marker.null.end);
    
    coreAnim.removeAll("node");
    
    coreAnim.saveState();
    coreAnim.play();
  }

  this.isEmpty = function () { return first == null; }
  
  this.size = function () { return N; }
          
  this.enqueue = function(item) {
    if (item == "") {
      return false;
    }
    
    coreAnim.clearLog();
    //coreAnim.newStateList();
    this.generatePseudocode(ENQUEUE);
    
    coreAnim.saveState();
    
    var oldlast = last;
    
    last = new Node();
    last.item = item;
    last.next = null;
    last.drawing = coreAnim.newSquareObject(++counterID, (N+1)*100, 300, item, null, "node");
    last.edge = coreAnim.newEdgeObject(counterID, last.drawing.getID(), last.drawing.getCoordinateX() + 50, last.drawing.getCoordinateY() + 25, null, null, EDGE_UNIDIRECTIONAL, "right");
    last.edge.setStroke(defaultProperties.edge.null.stroke);
    
    coreAnim.saveState("Inserting new node.");
    
    if (oldlast != null) {
      oldlast.edge.setStroke(defaultProperties.edge.default.stroke);
      oldlast.edge.setMarkerEnd(defaultProperties.marker.default.end);
      coreAnim.saveState("Update the pointer of the previous node.")
    }
    
    edgeLastD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
    edgeLastD.setStroke(defaultProperties.edge.default.stroke);
    edgeLastD.setMarkerEnd(defaultProperties.marker.default.end);

    coreAnim.saveState("Update the last pointer.");
    
    if (this.isEmpty()) {
      first = last;
      
      edgeFirstD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
      edgeFirstD.setStroke(defaultProperties.edge.default.stroke);
      edgeFirstD.setMarkerEnd(defaultProperties.marker.default.end);
      
      coreAnim.saveState("If the list was empty, update the first pointer too.");
    } else {
      oldlast.next = last;
    }
      
    N++;
    coreAnim.play();
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
    }
    
    coreAnim.clearLog();
    //coreAnim.newStateList();
    
    coreAnim.saveState();
    
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
      edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
      edgeFirstD.setMarkerEnd(defaultProperties.marker.null.end);
      edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
      edgeLastD.setStroke(defaultProperties.edge.null.stroke);
      edgeLastD.setMarkerEnd(defaultProperties.marker.null.end);
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