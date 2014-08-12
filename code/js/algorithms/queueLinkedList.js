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
  var coreObj = new CoreObject();
  
  const ENQUEUE = 0,
        DEQUEUE = 1;
  
  coreObj.init();
  coreObj.newStateList();
  coreObj.saveState();

  var first = null;
  var last = null;
  var N = 0;
  var counterID = 0;
  
  var firstD = coreObj.newSquareObject("first", 50, 50, "First", null, "pointer", EDGE_POSITION.BOTTOM);
  var lastD = coreObj.newSquareObject("last", 150, 50, "Last", null, "pointer", EDGE_POSITION.BOTTOM);
  //var edgeFirstD = coreObj.newEdgeObject("first", firstD.getID(), firstD.getCoordinateX() + 25, firstD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  //var edgeLastD = coreObj.newEdgeObject("last", lastD.getID(), lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 50, null, null, EDGE_UNIDIRECTIONAL, "down");
  var edgeFirstD = coreObj.newEdgeObject2("first", firstD.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  var edgeLastD = coreObj.newEdgeObject2("last", lastD.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  
  edgeFirstD.setStroke(defaultProperties.edge.null.stroke);
  edgeLastD.setStroke(defaultProperties.edge.null.stroke);

  coreObj.saveState();
  coreObj.play(0);
  
  this.getAnim = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case ENQUEUE:
          coreObj.addPseudocodeLine(0, "Node temp = value;");
          coreObj.addPseudocodeLine(1, "last = temp;");
          coreObj.addPseudocodeLine(2, "if (isEmpty()) first = last;");
          coreObj.addPseudocodeLine(3, "else oldlast.next = last;");
          break;
        case DEQUEUE:
          coreObj.addPseudocodeLine(0, "first = first.next;");
          coreObj.addPseudocodeLine(1, "if (isEmpty()) last = null;");
          break;
    }
  }
  
  this.init = function () {
    coreObj.clearLog();
    coreObj.newStateList();
    
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
    
    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.play();
  }

  this.isEmpty = function () { return first == null; }
  
  this.size = function () { return N; }
          
  this.enqueue = function(item) {
    if (item == "") {
      return false;
    }

    coreObj.clearLog();
    this.generatePseudocode(ENQUEUE);

    coreObj.saveState();

    var oldlast = last;
    
    if (oldlast != null) oldlast.drawing.setLabel("oldLast");

    last = new Node();
    last.item = item;
    last.next = null;
    last.drawing = coreObj.newSquareObject(++counterID, 200, 200, item, null, "node", EDGE_POSITION.RIGHT, EDGE_POSITION.TOP);
	last.edge = coreObj.newEdgeObject2(counterID, last.drawing.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
    last.edge.setStroke(defaultProperties.edge.null.stroke);

    coreObj.saveState("Inserting new node.", 0);

    edgeLastD.setIdObjectB(last.drawing.getID());
    edgeLastD.setStroke(defaultProperties.edge.default.stroke);
    edgeLastD.setMarkerEnd(defaultProperties.marker.default.end);

    coreObj.saveState("Update the last pointer.", 1);

    last.drawing.moveShape((N+1)*100, 300);
    coreObj.saveState();

    if (this.isEmpty()) {
      first = last;

      edgeFirstD.setIdObjectB(last.drawing.getID());
      edgeFirstD.setStroke(defaultProperties.edge.default.stroke);
      edgeFirstD.setMarkerEnd(defaultProperties.marker.default.end);

      coreObj.saveState("If the list was empty, update the first pointer too.", 2);
    } else {
      oldlast.next = last;
    }

    if (oldlast != null) {
      oldlast.edge.setStroke(defaultProperties.edge.default.stroke);
      oldlast.edge.setMarkerEnd(defaultProperties.marker.default.end);
      
      oldlast.drawing.setLabel();
      
      coreObj.saveState("Update the pointer of the previous node.", 3)
    }

    N++;
    coreObj.play();
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
    }
    
    coreObj.clearLog();
    //coreObj.newStateList();
    this.generatePseudocode(DEQUEUE);
    
    coreObj.saveState();
    
    var item = first.item;
    
    coreObj.removeShape(first.drawing.getID());
    coreObj.saveState();

    first = first.next;
    
    if (first != null){
      //edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Dequeue the first position.");
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
      coreObj.saveState("Update the first pointer.", 0);
      //edgeLastD.moveEdgeEnd(lastD.getCoordinateX() + 25, lastD.getCoordinateY() + 100);
      edgeLastD.setIdObjectB(null);
      edgeLastD.setStroke(defaultProperties.edge.null.stroke);
      edgeLastD.setMarkerEnd(defaultProperties.marker.null.end);
      coreObj.saveState("Update the last pointer.", 1);
    } else {
      //edgeFirstD.moveEdgeEnd(first.drawing.getCoordinateX() + 25, first.drawing.getCoordinateY());
      //edgeLastD.moveEdgeEnd(last.drawing.getCoordinateX() + 25, last.drawing.getCoordinateY());
      //edgeFirstD.setIdObjectB(first.drawing.getID());
      //edgeLastD.setIdObjectB(last.drawing.getID());
      coreObj.saveState("Update the first pointer.", 0);
    }
    
    N--;
    
    coreObj.play();
    return item;
  }
}