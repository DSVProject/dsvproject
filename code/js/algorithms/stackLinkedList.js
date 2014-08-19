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

  var top = null;
  var N = 0;
  var counterID = 0;
  
  var topD = coreObj.newSquareObject("top", 50, 200, "Top", null, null, null, "pointer");
  var edgeTopD = coreObj.newEdgeObject("top", topD.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);

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
          coreObj.addPseudocodeLine(1, "top = temp;");
          coreObj.addPseudocodeLine(2, "top.next = oldtop;");
          break;
        case POP:
          coreObj.addPseudocodeLine(0, "top = top.next;");
          coreObj.addPseudocodeLine(1, "if (isEmpty()) top = null;");
          break;
    }
  }
  
  this.init = function () {
    coreObj.newStateList();
    
    top = null;
    N = 0;
    counterID = 0;

    edgeTopD.setIdObjectB(null);
    
    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return top == null; }
  
  this.size = function () { return N; }
          
  this.push = function(item) {
    if (item.trim() == "") {
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }

    this.generatePseudocode(PUSH);

    var oldtop = top;

    top = new Node();
    top.item = item;
    top.next = oldtop;
    top.drawing = coreObj.newSquareObject(++counterID, 150, 200, item, null, "node", null, null);
	top.edge = coreObj.newEdgeObject(counterID, top.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

    coreObj.saveState("Inserting new node.", 0);

    edgeTopD.setIdObjectB(top.drawing.getID());

    coreObj.saveState("Update the top pointer.", 1);

    top.drawing.moveShape(250, 100);
    
    var iterator = oldtop;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX(), iterator.drawing.getCoordinateY()+100);
      
      iterator = iterator.next;
    }
    
    coreObj.saveState();

    if (oldtop != null) {
      top.edge.setIdObjectB(oldtop.drawing.getID());
      
      oldtop.drawing.setLabel();
      
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
    
    var item = top.item;
    
    coreObj.removeShape(top.drawing.getID());
    coreObj.saveState();

    top = top.next;
    
    if (top != null){
      edgeTopD.setIdObjectB(top.drawing.getID());
      coreObj.saveState("Pop the top position.", 0);
    }
    
    var iterator = top;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX(), iterator.drawing.getCoordinateY()-100);
      
      iterator = iterator.next;
    }
    
    coreObj.saveState();
    
    if (this.isEmpty()){
      top = null;
      
      edgeTopD.setIdObjectB(null);
      coreObj.saveState("Update the top pointer.", 1);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}