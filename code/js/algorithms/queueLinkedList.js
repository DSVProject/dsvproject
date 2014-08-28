/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães.
  *
  * This file is part of DSVProject.
  *
  * DSVProject is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.
  *
  * DSVProject is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * Redistribution and use in source and binary forms, with or without modification, are
  * permitted provided that the above copyright notice, license and this disclaimer are retained.
  *
  * This project was started as summer internship project in Trinity College Dublin.
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
  
  // ARRAY TO STORE LEARNING MODE OBJECTS
  var learnObj = [];
  
  const ENQUEUE = 0,
        DEQUEUE = 1;

  var head = null;
  var tail = null;
  var N = 0;
  var counterID = 0;
  
  var headD = coreObj.newSquareObject("head", 50, 50, "head", null, null, null, "pointer");
  var tailD = coreObj.newSquareObject("tail", 150, 50, "tail", null, null, null, "pointer");
  var edgeHeadD = coreObj.newEdgeObject("head", headD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
  var edgeTailD = coreObj.newEdgeObject("tail", tailD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

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
          coreObj.addPseudocodeLine(1, "tail = temp;");
          coreObj.addPseudocodeLine(2, "if (isEmpty()) head = tail;");
          coreObj.addPseudocodeLine(3, "else oldtail.next = tail;");
          break;
        case DEQUEUE:
          coreObj.addPseudocodeLine(0, "head = head.next;");
          coreObj.addPseudocodeLine(1, "if (isEmpty()) tail = null;");
          break;
    }
  }
  
  this.init = function () {
    coreObj.newStateList();
    
    head = null;
    tail = null;
    N = 0;
    counterID = 0;

    edgeHeadD.setIdObjectB(null);
    edgeTailD.setIdObjectB(null);
    
    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return head == null; }
  
  this.size = function () { return N; }
          
  this.enqueue = function(item, duration) {
    if (item.trim() == "") {
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }
    
    var oldtail = tail;

    if (coreObj.isLearningMode()) {
      coreObj.clearPseudocode();
      
      learnObj["newValue"] = coreObj.newUserObject("newValue", 500, 75, 25, item, "learning", null, USER_OBJ_TYPE.VALUE, true, null, null, null);
      
      var iterator = head;
      while(iterator != null) {
        iterator.drawing.setIsValidTarget(true);
        
        if (iterator.edge.getIdObjectB() == null) {
          iterator.edge.setIsValidTarget(true);
        }

        iterator = iterator.next;
      }
      
      coreObj.saveLearnState("Click on the grey circles to create the final state.");
      coreObj.beginLearn();
      
      DEFERRED.done(function() {
        coreObj.cancelLearn();
        coreObj.displayAlert("Correct solution!");
        self.enqueue(item, 0);
      });
      
    } else {
      this.generatePseudocode(ENQUEUE);
    
      if (oldtail != null) oldtail.drawing.setLabel("oldtail");

      tail = new Node();
      tail.item = item;
      tail.next = null;
      
      tail.drawing = coreObj.newSquareObject(++counterID, 200, 200, item, null, "node", null, null);
      tail.edge = coreObj.newEdgeObject(counterID, tail.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT, USER_TYPE_OBJ_CREATED.SQUARE_EDGE_1);

      coreObj.saveState("Inserting new node.", 0);

      edgeTailD.setIdObjectB(tail.drawing.getID());

      coreObj.saveState("Update the tail pointer.", 1);

      tail.drawing.moveShape((N+1)*100, 300);
      coreObj.saveState();
      
      if (this.isEmpty()) {
        head = tail;

        edgeHeadD.setIdObjectB(tail.drawing.getID());

        coreObj.saveState("If the list was empty, update the head pointer too.", 2);
      } else {
        oldtail.next = tail;
      }

      if (oldtail != null) {
        alert(oldtail.drawing.getID());
        oldtail.edge.setIdObjectB(tail.drawing.getID());

        oldtail.drawing.setLabel();

        coreObj.saveState("Update the pointer of the previous node.", 3)
      }

      //coreObj.reposition(head.drawing, 100, 300, ORIENTATION.RIGHT);
      //coreObj.saveState();

      N++;
      
      coreObj.begin(duration);
    }
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert("The queue is already empty.");
    }
    
    this.generatePseudocode(DEQUEUE);
    
    var item = head.item;
    
    coreObj.removeShape(head.drawing.getID());
    coreObj.saveState();

    head = head.next;
    
    if (head != null){
      edgeHeadD.setIdObjectB(head.drawing.getID());
      coreObj.saveState("Dequeue the head position.");
    }
    
    var iterator = head;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX()-100, iterator.drawing.getCoordinateY());
      
      iterator = iterator.next;
    }
    
    if (this.isEmpty()){
      tail = null;
      
      edgeHeadD.setIdObjectB(null);
      coreObj.saveState("Update the head pointer.", 0);
      edgeTailD.setIdObjectB(null);
      coreObj.saveState("Update the tail pointer.", 1);
    } else {
      coreObj.saveState("Update the head pointer.", 0);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}