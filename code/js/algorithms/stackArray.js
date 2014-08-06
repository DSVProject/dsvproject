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
  var selfie = this;
  var coreAnim = new CoreAnimObject();
  coreAnim.init();
  
  coreAnim.newStateList();
  coreAnim.saveState();
  
  var learnObj = [];

  var cap = 16;
  var top = new Pointer();
  var mArray = [];
  
  const PUSH = 0,
        POP = 1;
  
  for (var i=0; i<16; i++){
    mArray[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i, "position", null, EDGE_POSITION.TOP);    
  }
  
  top.value = 0;
  top.drawing = coreAnim.newSquareObject("top", 50, 50, 0, "top", null, EDGE_POSITION.BOTTOM, null);
  //top.edge = coreAnim.newEdgeObject("top", top.drawing.getID(), top.drawing.getCoordinateX() + 25, top.drawing.getCoordinateY() + 100, mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY(), EDGE_TYPE.UNIDIRECTIONAL);
  
  top.edge = coreAnim.newEdgeObject2("top", top.drawing.getID(), mArray[top.value].getID(), EDGE_TYPE.UNIDIRECTIONAL);
  top.edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  coreAnim.saveState();
  coreAnim.play(0);

  this.getAnim = function () {
    return coreAnim;
  }
  
  this.generatePseudocode = function (command) {
    coreAnim.clearPseudocode();
    
    switch (command) {
        case PUSH:
          coreAnim.addPseudocodeLine(0, "Array[top] = value;");
          coreAnim.addPseudocodeLine(1, "top++;");
          break;
        case POP:
          coreAnim.addPseudocodeLine(0, "top--;");
          coreAnim.addPseudocodeLine(1, "Value = Array[top];");
          coreAnim.addPseudocodeLine(2, "Array[top] = '';");
          break;
    }
  }
  
  this.init = function() {
    coreAnim.clearLog();
    coreAnim.saveState();
    
    top.value = 0;
    top.drawing.setText(top.value);
    top.edge.setIdObjectB(mArray[0].getID());
    //top.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
    
    for(var i=0; i<16; i++){
      mArray[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play(coreAnim.getAnimationDuration());
  }
  
  this.isEmpty = function () { return top.value == 0; }
  
  this.push = function (item) {
    if (top.value >= cap && item == "") {
      return false;
    }
    
    coreAnim.clearLog();
    coreAnim.newAction();
    //coreAnim.saveState();
    
    if (coreAnim.isLearningMode()){
      learnObj["newValue"] = coreAnim.newUserObject("newValue", 500, 75, 25, item, "learning", USER_OBJ_TYPE.VALUE, false);
      learnObj["newTopPointer"] = coreAnim.newUserObject("newTopPointer", top.edge.getCoordinateX2(), top.edge.getCoordinateY2(), 10, null, "learning", USER_OBJ_TYPE.MOVEMENT, null, top.edge.getID());
      
      for (var key in mArray) {
        mArray[key].setIsValidTarget(true);
        coreAnim.saveState();
      }
      
      coreAnim.saveState("Use the grey circles to create the final state.");
      coreAnim.play(0);
      
    } else {
      this.generatePseudocode(PUSH);
      
      mArray[top.value].setText(item);
      coreAnim.saveState("Inserting the new value", 0);
  
      top.value++;
      top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
      coreAnim.saveState();
      
      //top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
      top.edge.setIdObjectB(mArray[top.value].getID());
      
      top.drawing.setText(top.value);
      top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
      coreAnim.saveState("Update the top pointer.", 1);
      
      //top.drawing.moveShape(500, 50);
      //coreAnim.saveState();
      
      coreAnim.play(coreAnim.getAnimationDuration());
    }
    
    return true;
  }
  
  this.pop = function () {
    if(this.isEmpty()){
      return false;
    }
    
    coreAnim.clearLog();
    coreAnim.newAction();
    this.generatePseudocode(POP);
    //coreAnim.saveState();
    
    top.value--;
    
    top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
    coreAnim.saveState();
    
    //top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
    top.edge.setIdObjectB(mArray[top.value].getID());
    
    top.drawing.setText(top.value);
    top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Update the top pointer.", 0);
    
    mArray[top.value].setFill(defaultProperties["shape"]["delete"]["fill"]);
    coreAnim.saveState(null, 1);
    
    mArray[top.value].setText(null);
    mArray[top.value].setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Pop the top position.", 2);
    
    coreAnim.play(coreAnim.getAnimationDuration());
    
    return true;
  }
}