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
  * Defines a Stack object (Array implementation). Used to keep track of the object internally and to interact with the animations.
  */
var StackArray = function(){
  var self = this;
  var coreObj = new CoreObject();
  //coreObj.init();
  
  coreObj.newStateList();
  coreObj.saveState();
  
  var learnObj = [];

  var cap = 16;
  var top = new Pointer();
  var mArray = [];
  
  const PUSH = 0,
        POP = 1;
  
  for (var i=0; i<16; i++){
    mArray[i] = coreObj.newSquareObject(i, (i+1)*50, 300, null, i, null, null, null, null, EDGE_POSITION.TOP);  
  }
  
  top.value = 0;
  top.drawing = coreObj.newSquareObject("top", 50, 50, 0, "top", null, null, null, EDGE_POSITION.BOTTOM, null);
  //top.edge = coreObj.newEdgeObject("top", top.drawing.getID(), top.drawing.getCoordinateX() + 25, top.drawing.getCoordinateY() + 100, mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY(), EDGE_TYPE.UNIDIRECTIONAL);
  
  top.edge = coreObj.newEdgeObject("top", top.drawing.getID(), mArray[top.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  top.edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  coreObj.saveState();
  coreObj.play(0);

  this.getCore = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case PUSH:
          coreObj.addPseudocodeLine(0, "Array[top] = value;");
          coreObj.addPseudocodeLine(1, "top++;");
          break;
        case POP:
          coreObj.addPseudocodeLine(0, "top--;");
          coreObj.addPseudocodeLine(1, "Value = Array[top];");
          coreObj.addPseudocodeLine(2, "Array[top] = '';");
          break;
    }
  }
  
  this.init = function() {
    coreObj.clearLog();
    coreObj.saveState();
    
    top.value = 0;
    top.drawing.setText(top.value);
    top.edge.setIdObjectB(mArray[0].getID());
    //top.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
    
    for(var i=0; i<16; i++){
      mArray[i].setText(null);
    }
    
    coreObj.saveState();
    coreObj.play(coreObj.getAnimationDuration());
  }
  
  this.isEmpty = function () { return top.value == 0; }
  
  this.push = function (item) {
    if (top.value >= cap && item == "") {
      return false;
    }
    
    coreObj.clearLog();
    coreObj.newAction();
    //coreObj.saveState();
    
    if (coreObj.isLearningMode()){
      coreObj.clearPseudocode();
      
      learnObj["newValue"] = coreObj.newUserObject("newValue", 500, 75, 25, item, "learning", null, USER_OBJ_TYPE.VALUE, true, null);
      learnObj["newTopPointer"] = coreObj.newUserObject("newTopPointer", top.edge.getCoordinateX2(), top.edge.getCoordinateY2(), 10, null, "learning", null, USER_OBJ_TYPE.MOVEMENT, null, top.edge.getID());
      
      for (var key in mArray) {
        mArray[key].setIsValidTarget(true);
        coreObj.saveState();
      }
      
      coreObj.saveState("Use the grey circles to create the final state.");
      coreObj.play(0);
      
    } else {
      this.generatePseudocode(PUSH);
      
      mArray[top.value].setText(item);
      coreObj.saveState("Inserting the new value", 0);
  
      top.value++;
      top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
      coreObj.saveState();
      
      //top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
      top.edge.setIdObjectB(mArray[top.value].getID());
      
      top.drawing.setText(top.value);
      top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
      coreObj.saveState("Update the top pointer.", 1);
      
      //top.drawing.moveShape(500, 50);
      //coreObj.saveState();
      
      coreObj.play(coreObj.getAnimationDuration());
    }
    
    coreObj.printVariableWatch("top", top.value);
    coreObj.printVariableWatch("isEmpty", self.isEmpty());
    
    return true;
  }
  
  this.pop = function () {
    if(this.isEmpty()){
      return false;
    }
    
    coreObj.clearLog();
    coreObj.newAction();
    this.generatePseudocode(POP);
    //coreObj.saveState();
    
    top.value--;
    
    top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
    coreObj.saveState();
    
    //top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
    top.edge.setIdObjectB(mArray[top.value].getID());
    
    top.drawing.setText(top.value);
    top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
    coreObj.saveState("Update the top pointer.", 0);
    
    mArray[top.value].setFill(defaultProperties["shape"]["delete"]["fill"]);
    coreObj.saveState(null, 1);
    
    mArray[top.value].setText(null);
    mArray[top.value].setFill(defaultProperties["shape"]["default"]["fill"]);
    coreObj.saveState("Pop the top position.", 2);
    
    coreObj.play(coreObj.getAnimationDuration());
    
    return true;
  }
}