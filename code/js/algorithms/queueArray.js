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

/**
  * Defines a Pointer object, that contains:
  *   {Number} value
  *   {Object} drawing : an instace of one of the basic shapes (squareObject, nodeObject, etc)
  *   {Object} edge : an instace of the edgeObject
  */
var Pointer = function () {
  var value;
  var drawing;
  var edge;
}

/**
  * Defines a Queue object (Array implementation). Used to keep track of the object internally and to interact with the animations.
  */
var QueueArray = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  var learnObj = [];

  var cap = 16;
  var head = new Pointer();
  var tail = new Pointer();
  var mArray = [];
  
  const ENQUEUE = 0,
        DEQUEUE = 1;
  
  coreObj.newStateList();
  
  for (var i=0; i<16; i++){
    mArray[i] = coreObj.newSquareObject(i, (i+1)*50, 300, null, i, null, null, null);  
  }
  
  head.value = 0;
  head.drawing = coreObj.newSquareObject("head", 50, 50, 0, "head", null, null, null);
  head.edge = coreObj.newEdgeObject("head", head.drawing.getID(), mArray[head.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
  
  tail.value = 0
  tail.drawing = coreObj.newSquareObject("tail", 150, 50, 0, "tail", null, null, null);
  tail.edge = coreObj.newEdgeObject("tail", tail.drawing.getID(), mArray[tail.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);

  coreObj.saveState();
  coreObj.begin(0);

  this.getCore = function () {
    return coreObj;
  }
  
  this.generateAlgorithm = function (command) {
    coreObj.clearAlgorithm();
    
    switch (command) {
        case ENQUEUE:
          coreObj.addAlgorithmLine(0, "Array[tail] = value;");
          coreObj.addAlgorithmLine(1, "tail++;");
          break;
        case DEQUEUE:
          coreObj.addAlgorithmLine(0, "Value = Array[head];");
          coreObj.addAlgorithmLine(1, "Array[head] = '';");
          coreObj.addAlgorithmLine(2, "head++;");
          coreObj.addAlgorithmLine(3, "if (head == tail) head = 0; tail = 0;");
          break;
    }
  }

  this.init = function () {
    coreObj.newStateList();
    
    head.value = 0;
    head.drawing.setText(head.value);
    head.edge.setIdObjectB(mArray[0].getID());
    
    tail.value = 0;
    tail.drawing.setText(tail.value);
    tail.edge.setIdObjectB(mArray[0].getID());
    
    for(var i=0; i<16; i++){
      mArray[i].setText(null);
    }
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return tail.item === 0; }
          
  this.enqueue = function (item) {
    if (tail.value >= cap || item.trim() == "") {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The input should not be empty.");
      return false;
    }
    
    this.generateAlgorithm(ENQUEUE);
    coreObj.newStateList();

    mArray[tail.value].setText(item);
    coreObj.saveState("Inserting the new value", 0);

    tail.value++;
    tail.drawing.setFill(defaultProperties["shape"]["fill"]["update"]);
    coreObj.saveState();

    tail.edge.setIdObjectB(mArray[tail.value].getID());

    tail.drawing.setText(tail.value);
    tail.drawing.setFill(defaultProperties["shape"]["fill"]["default"]);
    coreObj.saveState("Update the tail pointer.", 1);
    
    coreObj.begin();
  }
    
  this.dequeue = function () {
    if (this.isEmpty()) {
      coreObj.displayAlert(ALERT_TYPES.NEGATIVE, "The queue is already empty.");
      return false;
    }
    
    this.generateAlgorithm(DEQUEUE);
    coreObj.newStateList();
    
    mArray[head.value].setFill(defaultProperties["shape"]["fill"]["delete"]);
    coreObj.saveState(null, 0);
    
    mArray[head.value].setText(null);
    mArray[head.value].setFill(defaultProperties["shape"]["fill"]["default"]);
    coreObj.saveState("Dequeue the head position.", 1);
    
    head.value++;
    head.drawing.setFill(defaultProperties["shape"]["fill"]["update"]);
    coreObj.saveState();
    
    head.edge.setIdObjectB(mArray[head.value].getID());
    
    head.drawing.setText(head.value);
    head.drawing.setFill(defaultProperties["shape"]["fill"]["default"]);
    coreObj.saveState("Update the head pointer.", 2);
    
    if (head.value == tail.value) {
      head.value = 0;
      head.drawing.setText(head.value);
      head.edge.setIdObjectB(mArray[head.value].getID());

      tail.value = 0;
      tail.drawing.setText(tail.value);
      tail.edge.setIdObjectB(mArray[tail.value].getID());
      
      coreObj.saveVariableToWatch("head", head.value);
      coreObj.saveVariableToWatch("tail", tail.value);
      coreObj.saveState(null, 3);
    }
    
    coreObj.begin();
  }
}