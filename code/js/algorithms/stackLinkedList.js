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

var StackLinkedList = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  const PUSH = 0,
        POP = 1;

  var head = null;
  var N = 0;
  var counterID = 0;
  
  var headD = coreObj.newSquareObject("head", 50, 200, "Head", null, null, null, "pointer");
  var edgeHeadD = coreObj.newEdgeObject("head", headD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);

  coreObj.newStateList();
  
  coreObj.saveState();
  coreObj.begin(0);
  
  this.getCore = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case PUSH:
          coreObj.addPseudocodeLine(0, "Node temp = value;");
          coreObj.addPseudocodeLine(1, "head = temp;");
          coreObj.addPseudocodeLine(2, "head.next = oldhead;");
          break;
        case POP:
          coreObj.addPseudocodeLine(0, "head = head.next;");
          coreObj.addPseudocodeLine(1, "if (isEmpty()) head = null;");
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
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }

    this.generatePseudocode(PUSH);

    var oldhead = head;

    head = new Node();
    head.item = item;
    head.next = oldhead;
    head.drawing = coreObj.newSquareObject(++counterID, 150, 200, item, null, "node", null, null);
	head.edge = coreObj.newEdgeObject(counterID, head.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

    coreObj.saveState("Inserting new node.", 0);

    edgeHeadD.setIdObjectB(head.drawing.getID());

    coreObj.saveState("Update the head pointer.", 1);
    
    if (oldhead == null) coreObj.reposition(head.drawing, 250, 100, ORIENTATION.BOTTOM);
    /*
    head.drawing.moveShape(250, 100);
    
    var iterator = oldhead;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX(), iterator.drawing.getCoordinateY()+100);
      
      iterator = iterator.next;
    }
    */
    
    coreObj.saveState();

    if (oldhead != null) {
      head.edge.setIdObjectB(oldhead.drawing.getID());
      coreObj.reposition(head.drawing, 250, 100, ORIENTATION.BOTTOM);
      
      oldhead.drawing.setLabel();
      
      coreObj.saveState("Update the pointer of the previous node.", 2);
    }

    N++;
    coreObj.begin();
  }
  
  this.pop = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert("The stack is already empty.");
    }
    
    this.generatePseudocode(POP);
    
    var item = head.item;
    
    coreObj.removeShape(head.drawing.getID());
    coreObj.saveState();

    head = head.next;
    
    if (head != null){
      edgeHeadD.setIdObjectB(head.drawing.getID());
      coreObj.reposition(head.drawing, 250, 100, ORIENTATION.BOTTOM);
      coreObj.saveState("Pop the head position.", 0);
    }
    /*
    var iterator = head;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX(), iterator.drawing.getCoordinateY()-100);
      
      iterator = iterator.next;
    }
    
    coreObj.saveState();
    */
    if (this.isEmpty()){
      head = null;
      
      edgeHeadD.setIdObjectB(null);
      coreObj.saveState("Update the head pointer.", 1);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}