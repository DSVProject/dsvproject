/**
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

// Defines a Doubly Linked List. Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var item,
    next,
    prev,
      
    drawing,
    edgeNext,
    edgePrev;
}

var DoublyLinkedList = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  const INSERT_FIRST = 0,
        INSERT_BEFORE = 1,
        INSERT_LAST = 2,
        DELETE_FIRST = 3,
        DELETE_AT = 4,
        DELETE_LAST = 5;

  var first = null;
  var last = null;
  var N = 0;
  var counterID = 0;
  
  var firstD = coreObj.newSquareObject("first", 50, 50, "first", null, null, null, "pointer");
  var lastD = coreObj.newSquareObject("last", 150, 50, "last", null, null, null, "pointer");
  var edgeFirstD = coreObj.newEdgeObject("first", firstD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
  var edgeLastD = coreObj.newEdgeObject("last", lastD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

  coreObj.newStateList();
  
  coreObj.saveState();
  coreObj.begin(0);
  
  this.getCore = function () {
    return coreObj;
  }
  
  this.generateAlgorithm = function (command) {
    coreObj.clearAlgorithm();
    
    switch (command) {
        case INSERT_FIRST:
          coreObj.addAlgorithmLine(0, "newNode = new Node();");
          coreObj.addAlgorithmLine(1, "newNode.value = input;");
          coreObj.addAlgorithmLine(2, "if (isEmpty()) {");
          coreObj.addAlgorithmLine(3, "&nbsp;&nbsp;first = last = newNode;");
          coreObj.addAlgorithmLine(4, "} else {");
          coreObj.addAlgorithmLine(5, "&nbsp;&nbsp;newNode.next = first;");
          coreObj.addAlgorithmLine(6, "&nbsp;&nbsp;first.prev = newNode;");
          coreObj.addAlgorithmLine(7, "&nbsp;&nbsp;first = first.prev;");
          coreObj.addAlgorithmLine(8, "}");
          break;
        case INSERT_LAST:
          coreObj.addAlgorithmLine(0, "newNode = new Node();");
          coreObj.addAlgorithmLine(1, "newNode.value = input;");
          coreObj.addAlgorithmLine(2, "if (isEmpty()) {");
          coreObj.addAlgorithmLine(3, "&nbsp;&nbsp;first = last = newNode;");
          coreObj.addAlgorithmLine(4, "} else {");
          coreObj.addAlgorithmLine(5, "&nbsp;&nbsp;newNode.prev = last;");
          coreObj.addAlgorithmLine(6, "&nbsp;&nbsp;last.next = newNode;");
          coreObj.addAlgorithmLine(7, "&nbsp;&nbsp;last = last.next;");
          coreObj.addAlgorithmLine(8, "}");
          break;
        case INSERT_BEFORE:
          break;
        case DELETE_FIRST:
          coreObj.addAlgorithmLine(0, "toReturn = first.item;");
          coreObj.addAlgorithmLine(1, "if (first == last) {");
          coreObj.addAlgorithmLine(2, "&nbsp;&nbsp;first = last = null;");
          coreObj.addAlgorithmLine(3, "} else {");
          coreObj.addAlgorithmLine(4, "&nbsp;&nbsp;first = first.next;");
          coreObj.addAlgorithmLine(5, "}");
          break;
        case DELETE_LAST:
          coreObj.addAlgorithmLine(0, "toReturn = last.item;");
          coreObj.addAlgorithmLine(1, "if (first == last) {");
          coreObj.addAlgorithmLine(2, "&nbsp;&nbsp;first = last = null;");
          coreObj.addAlgorithmLine(3, "} else {");
          coreObj.addAlgorithmLine(4, "&nbsp;&nbsp;last = last.prev;");
          coreObj.addAlgorithmLine(5, "}");
          break;
        case DELETE_AT:
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
  
  this.repositionDLL = function (node, x, y) {
    if (node != null) {
      node.drawing.moveShape(x, y);
    
      x += SHAPE_POSITION.DISTANCE;

      node = node.next;
      
      this.repositionDLL(node, x, y);
    }
  }
          
  this.insertFirst = function (item) {
    if (item.trim() == "") {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    }
     
    this.generateAlgorithm(INSERT_FIRST);
    coreObj.newStateList();
    
    var newNode = new Node();

    newNode.drawing = coreObj.newSquareObject(++counterID, 200, 200, null, null, "node", null, null);
    newNode.edgeNext = coreObj.newEdgeObject(counterID + "n", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
    newNode.edgePrev = coreObj.newEdgeObject(counterID + "p", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.LEFT, EDGE_POSITION.RIGHT);

    coreObj.saveState("Inserting new node.", 0);

    newNode.item = item;
    newNode.drawing.setText(item);
    coreObj.saveState("New node value is: " + item, 1);

    if (this.isEmpty()) {
      first = last = newNode;
      edgeFirstD.setIdObjectB(newNode.drawing.getID());
      edgeLastD.setIdObjectB(newNode.drawing.getID());

      coreObj.saveState("The list was empty, so update first and last pointers.", 3);
    } else {      
      newNode.next = first;
      newNode.edgeNext.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Update the next pointer of the new node.", 5)
      
      first.prev = newNode;
      first.edgePrev.setIdObjectB(newNode.drawing.getID());
      
      coreObj.saveState("Update the previous pointer of the old first.", 6)

      first = first.prev;
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Update the first pointer.", 7);
    }

    //coreObj.repositionDAG(first.drawing, 100, 300, ORIENTATION.RIGHT);
    this.repositionDLL(first, 100, 300);

    //tail.drawing.moveShape((N+1)*100, 300);
    coreObj.saveVariableToWatch("first", first.item);
    coreObj.saveVariableToWatch("last", last.item);
    coreObj.saveState();

    N++;

    coreObj.begin();
  }
  
  this.insertLast = function (item) {
    if (item.trim() == "") {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    }
     
    this.generateAlgorithm(INSERT_LAST);
    coreObj.newStateList();
    
    var newNode = new Node();

    newNode.drawing = coreObj.newSquareObject(++counterID, 200, 200, null, null, "node", null, null);
    newNode.edgeNext = coreObj.newEdgeObject(counterID + "n", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
    newNode.edgePrev = coreObj.newEdgeObject(counterID + "p", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.LEFT, EDGE_POSITION.RIGHT);

    coreObj.saveState("Inserting new node.", 0);

    newNode.item = item;
    newNode.drawing.setText(item);
    coreObj.saveState("New node value is: " + item, 1);

    if (this.isEmpty()) {
      first = last = newNode;
      edgeFirstD.setIdObjectB(newNode.drawing.getID());
      edgeLastD.setIdObjectB(newNode.drawing.getID());

      coreObj.saveState("The list was empty, so update first and last pointers.", 3);
    } else {      
      newNode.prev = last;
      newNode.edgePrev.setIdObjectB(last.drawing.getID());
      coreObj.saveState("Update the previous pointer of the new node.", 5)
      
      last.next = newNode;
      last.edgeNext.setIdObjectB(newNode.drawing.getID());
      
      coreObj.saveState("Update the next pointer of the old last.", 6)

      last = last.next;
      edgeLastD.setIdObjectB(last.drawing.getID());
      coreObj.saveState("Update the last pointer.", 7);
    }

    //coreObj.repositionDAG(first.drawing, 100, 300, ORIENTATION.RIGHT);
    this.repositionDLL(first, 100, 300);

    //tail.drawing.moveShape((N+1)*100, 300);
    coreObj.saveVariableToWatch("first", first.item);
    coreObj.saveVariableToWatch("last", last.item);
    coreObj.saveState();

    N++;

    coreObj.begin();
  }
  
  this.insertBefore = function (item, position) {
    if (item.trim() == "") {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    } else if (isNaN(position)) {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The position should be a numeric value.");
      return false;
    }
     
    this.generateAlgorithm(INSERT_BEFORE);
    coreObj.newStateList();

    if (this.isEmpty() || position < 0) {
      this.insertFirst(item);
    } else if (position > this.size) {
      this.insertLast(item);
    } else {
      var cNode;
      
      for (c = 0; c < position; c++) {
        cNode = cNode.next;
      }
      
      var newNode = new Node();

      newNode.drawing = coreObj.newSquareObject(++counterID, 200, 200, null, null, "node", null, null);
      newNode.edgeNext = coreObj.newEdgeObject(counterID + "n", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
      newNode.edgePrev = coreObj.newEdgeObject(counterID + "p", newNode.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.LEFT, EDGE_POSITION.RIGHT);

      coreObj.saveState("Inserting new node.", 0);

      newNode.item = item;
      newNode.drawing.setText(item);
      coreObj.saveState("New node value is: " + item, 1);
      
      newNode.next = cNode;
      newNode.edgeNext.setIdObjectB(cNode.drawing.getID());
      cNode.prev = newNode;
      cNode.edgePrev.setIdObjectB(newNode.drawing.getID());
      
      coreObj.saveState("Update the previous pointer of the old first.", 5)
    }

    //coreObj.repositionDAG(first.drawing, 100, 300, ORIENTATION.RIGHT);

    //tail.drawing.moveShape((N+1)*100, 300);
    coreObj.saveVariableToWatch("first", first.item);
    coreObj.saveVariableToWatch("last", last.item);
    coreObj.saveState();

    N++;

    coreObj.begin();
  }
  
  this.deleteFirst = function () {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The list is already empty.");
    }

    this.generateAlgorithm(DELETE_FIRST);
    coreObj.newStateList();

    var item = first.item;
    
    coreObj.removeShape(first.drawing.getID());
    coreObj.saveState("Delete the first position, returning: " + item, 0);

    if (first == last) {
      first = last = null;
      edgeFirstD.setIdObjectB(null);
      edgeLastD.setIdObjectB(null);
      
      coreObj.saveState("The list had 1 item, so update first and last pointers.", 2);
    } else {
      first = first.next;
      first.edgePrev.setIdObjectB(null);
      
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Update the first pointer.", 4);

      //coreObj.repositionDAG(first.drawing, 100, 300, ORIENTATION.RIGHT);
      this.repositionDLL(first, 100, 300);
      coreObj.saveVariableToWatch("first", first.item);
      coreObj.saveVariableToWatch("last", last.item);
      coreObj.saveState();
    }

    N--;

    coreObj.begin();
    return item;
  }
  
  this.deleteLast = function () {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The list is already empty.");
    }

    this.generateAlgorithm(DELETE_LAST);
    coreObj.newStateList();

    var item = last.item;
    
    coreObj.removeShape(last.drawing.getID());
    coreObj.saveState("Delete the last position, returning: " + item, 0);
    
    if (first == last) {
      first = last = null;
      edgeFirstD.setIdObjectB(null);
      edgeLastD.setIdObjectB(null);
      
      coreObj.saveState("The list had 1 item, so update first and last pointers.", 2);
    } else {
      last = last.prev;
      last.edgeNext.setIdObjectB(null);
      
      edgeLastD.setIdObjectB(last.drawing.getID());
      coreObj.saveState("Update the last pointer.", 4);

      //coreObj.repositionDAG(first.drawing, 100, 300, ORIENTATION.RIGHT);
      this.repositionDLL(first, 100, 300);
      coreObj.saveVariableToWatch("first", first.item);
      coreObj.saveVariableToWatch("last", last.item);
      coreObj.saveState();
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
  
  this.deleteAt = function (position) {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The list is already empty.");
    } else if (isNaN(position)) {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The position should be a numeric value.");
      return false;
    } else if (position < 0 || position > this.size()) {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The position should be at least 0, and not greater than " + (this.size() - 1) + ".");
      return false;
    }
    
    var cNode = first;
    
    this.generateAlgorithm(DELETE_AT);
    coreObj.newStateList();
    
    for (c = 0; c < position; c++) {
      cNode = cNode.next;
    }

    var item = cNode.item;
    
    coreObj.removeShape(cNode.drawing.getID());
    coreObj.saveState("Delete the " + position + " position, returning: " + item, 0);
    
    if (first == last) {
      first = last = null;
      edgeFirstD.setIdObjectB(null);
      edgeLastD.setIdObjectB(null);
      
      coreObj.saveState("The list had 1 item, so update first and last pointers.", 2);
    } else if (cNode.prev == null) {
      first = first.next;
      first.edgePrev.setIdObjectB(null);
      
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Update the first pointer.", 4);
    } else if (cNode.next == null) {
      last = last.prev;
      last.edgeNext.setIdObjectB(null);
      
      edgeLastD.setIdObjectB(last.drawing.getID());
      coreObj.saveState("Update the last pointer.", 4);
    } else {
      cNode.next.prev = cNode.prev;
      cNode.next.edgePrev.setIdObjectB(cNode.prev.drawing.getID());
      
   	  cNode.prev.next = cNode.next;
      cNode.prev.edgeNext.setIdObjectB(cNode.next.drawing.getID());
      coreObj.saveState("Update the last pointer.", 4);
    }
    
    if (first != null) this.repositionDLL(first, 100, 300);
    coreObj.saveVariableToWatch("first", first.item);
    coreObj.saveVariableToWatch("last", last.item);
    coreObj.saveState();
    
    N--;
    
    coreObj.begin();
    return item;
  }
}