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
  var self = this;
  var coreObj = new CoreObject();
  
  const ENQUEUE = 0,
        DEQUEUE = 1;

  var first = null;
  var last = null;
  var N = 0;
  var counterID = 0;
  
  var firstD = coreObj.newSquareObject("first", 50, 50, "First", null, null, null, "pointer");
  var lastD = coreObj.newSquareObject("last", 150, 50, "Last", null, null, null, "pointer");
  var edgeFirstD = coreObj.newEdgeObject("first", firstD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
  var edgeLastD = coreObj.newEdgeObject("last", lastD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

  coreObj.newStateList();
  
  coreObj.saveState();
  coreObj.begin(0);
  
  this.getCore = function () {
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
    coreObj.newStateList();
    
    first = null;
    last = null;
    N = 0;
    counterID = 0;

    edgeFirstD.setIdObjectB(null);
    edgeLastD.setIdObjectB(null);
    
    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return first == null; }
  
  this.size = function () { return N; }
          
  this.enqueue = function(item) {
    if (item.trim() == "") {
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }

    this.generatePseudocode(ENQUEUE);

    var oldlast = last;
    
    if (oldlast != null) oldlast.drawing.setLabel("oldLast");

    last = new Node();
    last.item = item;
    last.next = null;
    last.drawing = coreObj.newSquareObject(++counterID, 200, 200, item, null, "node", null, null);
	last.edge = coreObj.newEdgeObject(counterID, last.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);

    coreObj.saveState("Inserting new node.", 0);

    edgeLastD.setIdObjectB(last.drawing.getID());

    coreObj.saveState("Update the last pointer.", 1);

    last.drawing.moveShape((N+1)*100, 300);
    coreObj.saveState();

    if (this.isEmpty()) {
      first = last;

      edgeFirstD.setIdObjectB(last.drawing.getID());

      coreObj.saveState("If the list was empty, update the first pointer too.", 2);
    } else {
      oldlast.next = last;
    }

    if (oldlast != null) {
      oldlast.edge.setIdObjectB(last.drawing.getID());
      
      oldlast.drawing.setLabel();
      
      coreObj.saveState("Update the pointer of the previous node.", 3)
    }

    N++;
    coreObj.begin();
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert("The queue is already empty.");
    }
    
    this.generatePseudocode(DEQUEUE);
    
    var item = first.item;
    
    coreObj.removeShape(first.drawing.getID());
    coreObj.saveState();

    first = first.next;
    
    if (first != null){
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
      
      edgeFirstD.setIdObjectB(null);
      coreObj.saveState("Update the first pointer.", 0);
      edgeLastD.setIdObjectB(null);
      coreObj.saveState("Update the last pointer.", 1);
    } else {
      coreObj.saveState("Update the first pointer.", 0);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}