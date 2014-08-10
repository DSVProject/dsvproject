/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães, Trinity College Dublin. All rights reserved.
  *
  * The views and conclusions contained in the software and documentation are those of the
  * authors and should not be interpreted as representing official policies, either expressed
  * or implied, of Trinity College Dublin.
  */

// Defines a Queue object (Linked-List Implementation). Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var item,
    next,
    drawing,
    edge;
}

var QueueLinkedList = function () {
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
  
  var firstD = coreAnim.newSquareObject("first", 50, 50, "First", null, "pointer", EDGE_POSITION.BOTTOM);
  var lastD = coreAnim.newSquareObject("last", 150, 50, "Last", null, "pointer", EDGE_POSITION.BOTTOM);
  //var edgeFirstD = coreAnim.newEdgeObject("first", firstD.getID(), firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  //var edgeLastD = coreAnim.newEdgeObject("last", lastD.getID(), lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  var edgeFirstD = coreAnim.newEdgeObject2("first", firstD.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  var edgeLastD = coreAnim.newEdgeObject2("last", lastD.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  
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
          coreAnim.addPseudocodeLine(0, "Node temp = value;");
          coreAnim.addPseudocodeLine(1, "last = temp;");
          coreAnim.addPseudocodeLine(2, "if (isEmpty()) first = last;");
          coreAnim.addPseudocodeLine(3, "else oldlast.next = last;");
          break;
        case DEQUEUE:
          coreAnim.addPseudocodeLine(0, "first = first.next;");
          coreAnim.addPseudocodeLine(1, "if (isEmpty()) last = null;");
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
    
    //edgeFirstD.moveEdgeEnd(firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 100);
    edgeFirstD.setIdObjectB(null);
    edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
    edgeFirstD.setMarkerEnd(defaultProperties.marker.null.end);
    //edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
    edgeLastD.setIdObjectB(null);
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
    this.generatePseudocode(ENQUEUE);

    coreAnim.saveState();

    var oldlast = last;
    
    if (oldlast != null) oldlast.drawing.setLabel("oldLast");

    last = new Node();
    last.item = item;
    last.next = null;
    last.drawing = coreAnim.newSquareObject(++counterID, 200, 200, item, null, "node", EDGE_POSITION.RIGHT, EDGE_POSITION.TOP);
	last.edge = coreAnim.newEdgeObject2(counterID, last.drawing.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
    last.edge.setStroke(defaultProperties.edge.null.stroke);

    coreAnim.saveState("Inserting new node.", 0);

    edgeLastD.setIdObjectB(last.drawing.getID());
    edgeLastD.setStroke(defaultProperties.edge.default.stroke);
    edgeLastD.setMarkerEnd(defaultProperties.marker.default.end);

    coreAnim.saveState("Update the last pointer.", 1);

    last.drawing.moveShape((N+1)*100, 300);
    coreAnim.saveState();

    if (this.isEmpty()) {
      first = last;

      edgeFirstD.setIdObjectB(last.drawing.getID());
      edgeFirstD.setStroke(defaultProperties.edge.default.stroke);
      edgeFirstD.setMarkerEnd(defaultProperties.marker.default.end);

      coreAnim.saveState("If the list was empty, update the first pointer too.", 2);
    } else {
      oldlast.next = last;
    }

    if (oldlast != null) {
      oldlast.edge.setStroke(defaultProperties.edge.default.stroke);
      oldlast.edge.setMarkerEnd(defaultProperties.marker.default.end);
      
      oldlast.drawing.setLabel();
      
      coreAnim.saveState("Update the pointer of the previous node.", 3)
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
    this.generatePseudocode(DEQUEUE);
    
    coreAnim.saveState();
    
    var item = first.item;
    
    coreAnim.removeShape(first.drawing.getID());
    coreAnim.saveState();

    first = first.next;
    
    if (first != null){
      //edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreAnim.saveState("Dequeue the first position.");
    }
    
    var iterator = first;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX()-100, iterator.drawing.getCoordinateY());
      
      iterator = iterator.next;
    }
    
    if (this.isEmpty()){
      last = null;
      
      //edgeFirstD.moveEdgeEnd(firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 100);
      edgeFirstD.setIdObjectB(null);
      edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
      edgeFirstD.setMarkerEnd(defaultProperties.marker.null.end);
      coreAnim.saveState("Update the first pointer.", 0);
      //edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
      edgeLastD.setIdObjectB(null);
      edgeLastD.setStroke(defaultProperties.edge.null.stroke);
      edgeLastD.setMarkerEnd(defaultProperties.marker.null.end);
      coreAnim.saveState("Update the last pointer.", 1);
    } else {
      //edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      //edgeLastD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
      //edgeFirstD.setIdObjectB(first.drawing.getID());
      //edgeLastD.setIdObjectB(last.drawing.getID());
      coreAnim.saveState("Update the first pointer.", 0);
    }
    
    N--;
    
    coreAnim.play();
    return item;
  }
}