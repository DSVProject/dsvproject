/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães, Trinity College Dublin. All rights reserved.
  *
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
  
  coreObj.newStateList();
  coreObj.saveState();
  
  var learnObj = [];

  var cap = 16;
  var head = new Pointer();
  var tail = new Pointer();
  var mArray = [];
  
  const ENQUEUE = 0,
        DEQUEUE = 1;
  
  for (var i=0; i<16; i++){
    mArray[i] = coreObj.newSquareObject(i, (i+1)*50, 300, null, i, null, null, null, null, EDGE_POSITION.TOP);  
  }
  
  head.value = 0;
  head.drawing = coreObj.newSquareObject("head", 50, 50, 0, "head", null, null, null, EDGE_POSITION.BOTTOM, null);
  head.edge = coreObj.newEdgeObject("head", head.drawing.getID(), mArray[head.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  head.edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  tail.value = 0
  tail.drawing = coreObj.newSquareObject("tail", 150, 50, 0, "tail", null, null, null, EDGE_POSITION.BOTTOM, null);
  tail.edge = coreObj.newEdgeObject("tail", tail.drawing.getID(), mArray[tail.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  tail.edge.setMarkerEnd(defaultProperties.marker.default.end);

  coreObj.saveState();
  coreObj.play(0);

  this.getAnim = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case ENQUEUE:
          coreObj.addPseudocodeLine(0, "Array[top] = value;");
          coreObj.addPseudocodeLine(1, "top++;");
          break;
        case DEQUEUE:
          coreObj.addPseudocodeLine(0, "top--;");
          coreObj.addPseudocodeLine(1, "Value = Array[top];");
          coreObj.addPseudocodeLine(2, "Array[top] = '';");
          break;
    }
  }

  this.init = function () {
    coreObj.clearLog();
    coreObj.saveState();
    
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
    coreObj.play();
  }

  this.isEmpty = function () { return tail.item === 0; }
          
  this.enqueue = function (item) {
    if (tail.value >= cap && item == "") {
      return false;
    }
    
    coreObj.clearLog();
    coreObj.newAction();
    
    if (coreObj.isLearningMode()){
      coreObj.clearPseudocode();
      
      learnObj["newValue"] = coreObj.newUserObject("newValue", 500, 75, 25, item, "learning", null, USER_OBJ_TYPE.VALUE, true, null);
      learnObj["newHeadPointer"] = coreObj.newUserObject("newHeadPointer", head.edge.getCoordinateX2(), head.edge.getCoordinateY2(), 10, null, "learning", null, USER_OBJ_TYPE.MOVEMENT, null, head.edge.getID());
      learnObj["newTailPointer"] = coreObj.newUserObject("newTailPointer", tail.edge.getCoordinateX2(), tail.edge.getCoordinateY2(), 10, null, "learning", null, USER_OBJ_TYPE.MOVEMENT, null, tail.edge.getID());
      
      for (var key in mArray) {
        mArray[key].setIsValidTarget(true);
        coreObj.saveState();
      }
      
      coreObj.saveState("Use the grey circles to create the final state.");
      coreObj.play(0);
    } else {
      this.generatePseudocode(ENQUEUE);
      
      mArray[tail.value].setText(item);
      coreObj.saveState("Inserting the new value");
      
      tail.value++;
      tail.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
      coreObj.saveState();
      
      tail.edge.setIdObjectB(mArray[tail.value].getID());
      
      tail.drawing.setText(tail.value);
      tail.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
      coreObj.saveState("Update the tail pointer.");
    }
    
    coreObj.play();
  }
    
  this.dequeue = function () {
    if (this.isEmpty()) {
      return false;
    }

    coreObj.clearLog();
    coreObj.newAction();
    
    mArray[head.value].setFill(defaultProperties["shape"]["delete"]["fill"]);
    coreObj.saveState();
    
    mArray[head.value].setText(null);
    mArray[head.value].setFill(defaultProperties["shape"]["default"]["fill"]);
    coreObj.saveState("Dequeue the head position.");
    
    head.value++;
    head.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
    coreObj.saveState();
    
    head.edge.setIdObjectB(mArray[head.value].getID());
    
    head.drawing.setText(head.value);
    head.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
    coreObj.saveState("Update the tail pointer.");
    
    if (head.value == tail.value) {
      head.value = 0;
      head.drawing.setText(head.value);
      head.edge.setIdObjectB(mArray[head.value].getID());

      tail.value = 0;
      tail.drawing.setText(tail.value);
      tail.edge.setIdObjectB(mArray[tail.value].getID());
      
      coreObj.saveState();
    }
    
    coreObj.play();
  }
}