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

// Defines a Stack object (Linked-List Implementation). Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var item,
    next,
    drawing,
    edge;
}

var StackLinkedList = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  const PUSH = 0,
        POP = 1;

  var head = null;
  var N = 0;
  var counterID = 0;
  
  var headD = coreObj.newSquareObject("head", 50, 200, "head", null, null, null, "pointer");
  var edgeHeadD = coreObj.newEdgeObject("head", headD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);

  coreObj.newStateList();
  
  coreObj.saveState();
  coreObj.begin(0);
  
  this.getCore = function () {
    return coreObj;
  }
  
  this.generateAlgorithm = function (command) {
    coreObj.clearAlgorithm();
    
    switch (command) {
        case PUSH:
          coreObj.addAlgorithmLine(0, "newNode = new Node();");
          coreObj.addAlgorithmLine(1, "newNode.item = input;");
          coreObj.addAlgorithmLine(2, "newNode.next = head;");
          coreObj.addAlgorithmLine(2, "head = newNode;");
          break;
        case POP:
          coreObj.addAlgorithmLine(0, "toReturn = head.item;");
          coreObj.addAlgorithmLine(1, "head = head.next;");
          break;
    }
  }
  
  this.init = function () {
    coreObj.newStateList();
    
    head = null;
    N = 0;
    counterID = 0;

    edgeHeadD.setIdObjectB(null);
    
    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return head == null; }
  
  this.size = function () { return N; }
          
  this.push = function(item) {
    if (item.trim() == "") {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    }

    this.generateAlgorithm(PUSH);
    coreObj.newStateList();
    
    newNode = new Node();
    newNode.item = item;
    newNode.drawing = coreObj.newSquareObject(++counterID, 150, 200, null, null, "node", null, null);
	newNode.edge = coreObj.newEdgeObject(counterID, newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
    
    coreObj.saveState("Inserting new node.", 0);
    
    newNode.drawing.setText(item);
    coreObj.saveState("New node value is: " + item, 1);
    
    newNode.next = head;
    newNode.edge.setIdObjectB(head == null ? null : head.drawing.getID());
    coreObj.saveState("New node points to the old head.", 2);
    
    head = newNode;
    edgeHeadD.setIdObjectB(head.drawing.getID());
    coreObj.saveState("Update the head pointer.", 3);
    
    coreObj.repositionDAG(head.drawing, 250, 100, ORIENTATION.BOTTOM);
    coreObj.saveVariableToWatch("head", head.item);
    coreObj.saveState();
    
    N++;
    coreObj.begin();
  }
  
  this.pop = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The stack is already empty.");
    }
    
    this.generateAlgorithm(POP);
    coreObj.newStateList();
    
    var item = head != null ? head.item : null;
    
    coreObj.removeShape(head.drawing.getID());
    coreObj.saveState("Pop the head position, returning: " + item, 0);

    head = head.next;
    
    if (head != null){
      edgeHeadD.setIdObjectB(head.drawing.getID());
      coreObj.saveState("Update the head pointer.", 1);
      coreObj.repositionDAG(head.drawing, 250, 100, ORIENTATION.BOTTOM);
      coreObj.saveVariableToWatch("head", head.item);
      coreObj.saveState();
    } else {
      edgeHeadD.setIdObjectB(null);
      coreObj.saveVariableToWatch("head", head != null ? head.item : null);
      coreObj.saveState("Update the head pointer.", 1);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}