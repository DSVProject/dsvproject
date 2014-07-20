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
  
  for (var i=0; i<16; i++){
    mArray[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i, "position");    
  }
  
  top.value = 0;
  top.drawing = coreAnim.newSquareObject("top", 50, 50, 0, "top");
  top.edge = coreAnim.newEdgeObject("top", top.drawing.getID(), top.drawing.getCoordinateX() + 25, top.drawing.getCoordinateY() + 100, mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY(), EDGE_UNIDIRECTIONAL);
  top.edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  coreAnim.saveState();
  coreAnim.play(0);

  this.getAnim = function () {
    return coreAnim;
  }
  
  this.init = function() {
    coreAnim.clearLog();
    coreAnim.saveState();
    
    top.value = 0;
    top.drawing.setText(top.value);
    top.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
    
    for(var i=0; i<16; i++){
      mArray[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }
  
  this.isEmpty = function() { return top.value == 0; }
  
  this.push = function(item) {
    if (top.value >= cap && item == "") {
      return false;
    }
    
    coreAnim.clearLog();
    coreAnim.saveState();
    
    if (coreAnim.isLearningMode()){
      learnObj["newValue"] = coreAnim.newUserObject("newValue", 500, 75, 25, item, "draggable");
      //learnObj["newTopPointer"] = coreAnim.newUserObject("newTopPointer", top.edge.getCoordinateX2(), top.edge.getCoordinateY2(), 10, null, "draggable");
      
      for (var key in mArray) {
        mArray[key].setRectClass("validTarget");
        coreAnim.saveState();
      }
      
      coreAnim.saveState("Use the grey circles to create the final state.");
      coreAnim.play(0);
      
      /*
      mArray[insertedIndex].setText(insertedValue);
      mArray[insertedIndex].setFill("yellow");
    
      var newValue = coreAnim.newSquareObject("newValue", mArray[insertedIndex].getCoordinateX(), array[insertedIndex].getCoordinateY());
      
      coreAnim.saveState("Move the new value to its right position.");
      
      coreAnim.play(0);
      array[insertedIndex].setTransform(500-(insertedIndex*50) , -250);
      //newValue.toggleDrag();
      */
      
    } else {
      mArray[top.value].setText(item);
      coreAnim.saveState("Inserting the new value");
  
      top.value++;
      top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
      coreAnim.saveState();
      
      top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
      
      top.drawing.setText(top.value);
      top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
      coreAnim.saveState("Update the top pointer.");
      
      coreAnim.play();
    }
    
    return true;
  }
  
  this.pop = function() {
    if(this.isEmpty()){
      return false;
    }
    
    coreAnim.clearLog();
    coreAnim.saveState();
    
    top.value--;
    mArray[top.value].setFill(defaultProperties["shape"]["delete"]["fill"]);
    coreAnim.saveState();
    
    mArray[top.value].setText(null);
    mArray[top.value].setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Pop the top position.");
    
    top.drawing.setFill(defaultProperties["shape"]["update"]["fill"]);
    coreAnim.saveState();
    
    top.edge.moveEdgeEnd(mArray[top.value].getCoordinateX() + 25, mArray[top.value].getCoordinateY());
    
    top.drawing.setText(top.value);
    top.drawing.setFill(defaultProperties["shape"]["default"]["fill"]);
    coreAnim.saveState("Update the top pointer.")
    
    coreAnim.play();
    
    return true;
  }
}