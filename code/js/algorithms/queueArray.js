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
  var coreAnim = new CoreAnimObject();
  
  coreAnim.newStateList();
  coreAnim.saveState();
  
  var learnObj = [];

  var cap = 16;
  var head = new Pointer();
  var tail = new Pointer();
  var mArray = [];
  
  const ENQUEUE = 0,
        DEQUEUE = 1;
  
  for (var i=0; i<16; i++){
    mArray[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i, null, null, null, null, EDGE_POSITION.TOP);  
  }
  
  head.value = 0;
  head.drawing = coreAnim.newSquareObject("head", 50, 50, 0, "head", null, null, null, EDGE_POSITION.BOTTOM, null);
  head.edge = coreAnim.newEdgeObject("head", head.drawing.getID(), mArray[head.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  head.edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  tail.value = 0
  tail.drawing = coreAnim.newSquareObject("tail", 150, 50, 0, "tail", null, null, null, EDGE_POSITION.BOTTOM, null);
  tail.edge = coreAnim.newEdgeObject("tail", tail.drawing.getID(), mArray[tail.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  tail.edge.setMarkerEnd(defaultProperties.marker.default.end);

  coreAnim.saveState();
  coreAnim.play(0);

  this.getAnim = function () {
    return coreAnim;
  }
  
  this.generatePseudocode = function (command) {
    coreAnim.clearPseudocode();
    
    switch (command) {
        case ENQUEUE:
          coreAnim.addPseudocodeLine(0, "Array[top] = value;");
          coreAnim.addPseudocodeLine(1, "top++;");
          break;
        case DEQUEUE:
          coreAnim.addPseudocodeLine(0, "top--;");
          coreAnim.addPseudocodeLine(1, "Value = Array[top];");
          coreAnim.addPseudocodeLine(2, "Array[top] = '';");
          break;
    }
  }

  this.init = function () {
    coreAnim.clearLog();
    coreAnim.saveState();
    
    head.value = 0;
    head.drawing.setText(head.value);
    head.edge.setIdObjectB(mArray[0].getID());
    
    tail.value = 0;
    tail.drawing.setText(tail.value);
    tail.edge.setIdObjectB(mArray[0].getID());
    
    for(var i=0; i<16; i++){
      mArray[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }

  this.isEmpty = function () { return tail.item === 0; }
          
  this.enqueue = function (item) {
    if (tail.value >= cap && item == "") {
      return false;
    }
    
    coreAnim.clearLog();
    coreAnim.newAction();
    
    if (coreAnim.isLearningMode()){
      coreAnim.clearPseudocode();
      
      learnObj["newValue"] = coreAnim.newUserObject("newValue", 500, 75, 25, item, "learning", null, USER_OBJ_TYPE.VALUE, true, null);
      learnObj["newHeadPointer"] = coreAnim.newUserObject("newHeadPointer", head.edge.getCoordinateX2(), head.edge.getCoordinateY2(), 10, null, "learning", null, USER_OBJ_TYPE.MOVEMENT, null, head.edge.getID());
      learnObj["newTailPointer"] = coreAnim.newUserObject("newTailPointer", tail.edge.getCoordinateX2(), tail.edge.getCoordinateY2(), 10, null, "learning", null, USER_OBJ_TYPE.MOVEMENT, null, tail.edge.getID());
      
      for (var key in mArray) {
        mArray[key].setIsValidTarget(true);
        coreAnim.saveState();
      }
      
      coreAnim.saveState("Use the grey circles to create the final state.");
      coreAnim.play(0);
    } else {
      this.generatePseudocode(ENQUEUE);
      
      mArray[tail.value].setText(item);
      coreAnim.saveState("Inserting the new value");
      
      tail.value++;
      tail.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
      coreAnim.saveState();
      
      tail.edge.setIdObjectB(mArray[tail.value].getID());
      
      tail.drawing.setText(tail.value);
      tail.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
      coreAnim.saveState("Update the tail pointer.");
    }
    
    coreAnim.play();
  }
    
  this.dequeue = function () {
    if (this.isEmpty()) {
      return false;
    }

    coreAnim.clearLog();
    coreAnim.newAction();
    
    mArray[head.value].setFill(defaultProperties["shape"]["delete"]["fill"]);
    coreAnim.saveState();
    
    mArray[head.value].setText(null);
    mArray[head.value].setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Dequeue the head position.");
    
    head.value++;
    head.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
    coreAnim.saveState();
    
    head.edge.setIdObjectB(mArray[head.value].getID());
    
    head.drawing.setText(head.value);
    head.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Update the tail pointer.");
    
    if (head.value == tail.value) {
      head.value = 0;
      head.drawing.setText(head.value);
      head.edge.setIdObjectB(mArray[head.value].getID());

      tail.value = 0;
      tail.drawing.setText(tail.value);
      tail.edge.setIdObjectB(mArray[tail.value].getID());
      
      coreAnim.saveState();
    }
    
    coreAnim.play();
  }
}