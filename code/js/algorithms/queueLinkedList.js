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
  
  this.generateAlgorithm = function (command) {
    coreObj.clearAlgorithm();
    
    switch (command) {
        case ENQUEUE:
          coreObj.addAlgorithmLine(0, "newNode = new Node();");
          coreObj.addAlgorithmLine(1, "newNode.value = input;");
          coreObj.addAlgorithmLine(2, "if (isEmpty()) {");
          coreObj.addAlgorithmLine(3, "&nbsp;&nbsp;head = tail = newNode;");
          coreObj.addAlgorithmLine(4, "} else {");
          coreObj.addAlgorithmLine(5, "&nbsp;&nbsp;tail.next = newNode;");
          coreObj.addAlgorithmLine(6, "&nbsp;&nbsp;tail = newNode;");
          coreObj.addAlgorithmLine(7, "}");
          break;
        case DEQUEUE:
          coreObj.addAlgorithmLine(0, "toReturn = head.item;");
          coreObj.addAlgorithmLine(1, "if (head == tail) {");
          coreObj.addAlgorithmLine(2, "&nbsp;&nbsp;head = tail = null;");
          coreObj.addAlgorithmLine(3, "} else {");
          coreObj.addAlgorithmLine(4, "&nbsp;&nbsp;head = head.next;");
          coreObj.addAlgorithmLine(5, "}");
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
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    }

    if (coreObj.isLearningMode()) {
      coreObj.clearAlgorithm();
      
      // Create the first user object
      learnObj["newValue"] = coreObj.newUserObject("newValue", 500, 75, 25, item, "learning value", null, USER_OBJ_TYPE.VALUE, null, null);
      learnObj["newValue"].setIsValidTarget(true);
      
      //learnObj[edgeHeadD.getID() + 1] = coreObj.newUserObject("h1" + edgeHeadD.getID(), edgeHeadD.getCoordinateX1(), edgeHeadD.getCoordinateY1(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, edgeHeadD.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_A, false);
      learnObj[edgeHeadD.getID()] = coreObj.newUserObject("u" + edgeHeadD.getID(), edgeHeadD.getCoordinateX2(), edgeHeadD.getCoordinateY2(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, edgeHeadD.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_B);
      
      //learnObj[edgeTailD.getID() + 1] = coreObj.newUserObject("t1" + edgeTailD.getID(), edgeTailD.getCoordinateX1(), edgeTailD.getCoordinateY1(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, edgeTailD.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_A, false);
      learnObj[edgeTailD.getID()] = coreObj.newUserObject("u" + edgeTailD.getID(), edgeTailD.getCoordinateX2(), edgeTailD.getCoordinateY2(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, edgeTailD.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_B);
      
      var iterator = head;
      while(iterator != null) {
        // Set object as valid target for UPDATE_TEXT, SWAP_TEXT, UPDATE_EDGE_A, UPDATE_EDGE_B
        iterator.drawing.setIsValidTarget(true);
        
        // Create user objects for DELETE_ITEM
        learnObj[iterator.drawing.getID()] = coreObj.newUserObject("d" + iterator.drawing.getID(), iterator.drawing.getCoordinateX() + 25, iterator.drawing.getCoordinateY() + iterator.drawing.getHeight(), 10, "X", "learning delete", "learning delete", USER_OBJ_TYPE.DELETING, iterator.drawing.getID(), LEARN_ACTION_CODES.DELETE_ITEM, false);
        
        // Create user objects on the edges, used to update the position
        //learnObj[iterator.edge.getID() + "1"] = coreObj.newUserObject("e1" + iterator.edge.getID(), iterator.edge.getCoordinateX1(), iterator.edge.getCoordinateY1(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, iterator.edge.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_A, false);
        learnObj[iterator.edge.getID()] = coreObj.newUserObject("u" + iterator.edge.getID(), iterator.edge.getCoordinateX2(), iterator.edge.getCoordinateY2(), 10, null, "learning edge", null, USER_OBJ_TYPE.EDGE, iterator.edge.getID(), LEARN_ACTION_CODES.UPDATE_EDGE_B);

        iterator = iterator.next;
      }
      
      coreObj.saveLearnState();
      coreObj.beginLearn();
      coreObj.displayAlert(ALERT_TYPES.INFORMATION, "Click on the grey circles to schedule the changes of this method.</br>The <strong>Green</strong> is used to create a new node or update an existing node value. The <strong>Purple</strong> is used to update where an edge is poiting to.")
      
      DEFERRED.done(function() {
        coreObj.cancelLearn();
        coreObj.displayAlert("Correct solution!");
        self.enqueue(item, 0);
      });
      
    } else {      
      this.generateAlgorithm(ENQUEUE);
      coreObj.newStateList();

      var newNode = new Node();
      newNode.item = item;
      newNode.next = null;

      newNode.drawing = coreObj.newSquareObject(++counterID, 200, 200, null, null, "node", null, null);
      newNode.edge = coreObj.newEdgeObject(counterID, newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);

      coreObj.saveState("Inserting new node.", 0);
      
      newNode.drawing.setText(item);
      coreObj.saveState("New node value is: " + item, 1);

      if (this.isEmpty()) {
        head = tail = newNode;
        edgeHeadD.setIdObjectB(newNode.drawing.getID());
        edgeTailD.setIdObjectB(newNode.drawing.getID());

        coreObj.saveState("The list was empty, so update head and tail pointers.", 3);
      } else {
        tail.next = newNode;
        tail.edge.setIdObjectB(newNode.drawing.getID());
        coreObj.saveState("Update the pointer of the previous node.", 5)

        tail = newNode;
        edgeTailD.setIdObjectB(newNode.drawing.getID());
        coreObj.saveState("Update the tail pointer.", 6);
      }

      coreObj.repositionDAG(head.drawing, 100, 300, ORIENTATION.RIGHT);
      
      //tail.drawing.moveShape((N+1)*100, 300);
      coreObj.saveVariableToWatch("head", head.item);
      coreObj.saveVariableToWatch("tail", tail.item);
      coreObj.saveState();

      N++;

      coreObj.begin(duration);
    }
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The queue is already empty.");
    }

    this.generateAlgorithm(DEQUEUE);
    coreObj.newStateList();

    var item = head.item;
    
    coreObj.removeShape(head.drawing.getID());
    coreObj.saveState("Dequeue the first position, returning: " + item, 0);

    if (head == tail) {
      head = tail = null;
      edgeHeadD.setIdObjectB(null);
      edgeTailD.setIdObjectB(null);
      
      coreObj.saveState("The queue had 1 item, so update head and tail pointers.", 2);
    } else {
      head = head.next;
      edgeHeadD.setIdObjectB(head.drawing.getID());
      coreObj.saveState("Update the head pointer.", 4);

      coreObj.repositionDAG(head.drawing, 100, 300, ORIENTATION.RIGHT);
      coreObj.saveVariableToWatch("head", head.item);
      coreObj.saveVariableToWatch("tail", tail.item);
      coreObj.saveState();
    }

    N--;

    coreObj.begin();
    return item;
  }
}