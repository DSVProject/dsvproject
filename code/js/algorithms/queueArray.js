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
  var selfie = this;
  var coreAnim = new CoreAnimObject();
  coreAnim.init();
  
  coreAnim.newStateList();
  coreAnim.saveState();

  var cap = 16;
  var head = new Pointer();
  var tail = new Pointer();
  var mArray = [];
  
  for (var i=0; i<16; i++){
    mArray[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i);    
  }
  
  head.value = 0;
  head.drawing = coreAnim.newSquareObject("head", 50, 50, 0, "head");
  head.edge = coreAnim.newEdgeObject("head", head.drawing.getID(), head.drawing.getCoordinateX() + 25, head.drawing.getCoordinateY() + 100, mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
  
  tail.value = 0
  tail.drawing = coreAnim.newSquareObject("tail", 150, 50, 0, "tail");
  tail.edge = coreAnim.newEdgeObject("tail", tail.drawing.getID(), tail.drawing.getCoordinateX() + 25, tail.drawing.getCoordinateY() + 100, mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());

  coreAnim.saveState();
  coreAnim.play(0);

  this.getAnim = function () {
    return coreAnim;
  }

  this.init = function () {
    coreAnim.clearLog();
    coreAnim.newStateList();
    coreAnim.saveState();
    
    head.value = 0;
    head.drawing.setText(head.value);
    head.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
    
    tail.value = 0;
    tail.drawing.setText(tail.value);
    tail.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
    
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
    coreAnim.newStateList();
    
    coreAnim.saveState();
    
    if (coreAnim.isLearningMode()){
      var newValue = coreAnim.newSquareObject("newValue", 500, 50, insertedValue);
      
      //test.toggleDrag();
      coreAnim.saveState("Move the new value to its right position.");
    } else {
      mArray[tail.value].setText(item);
      coreAnim.saveState("Inserting the new value");
      
      tail.value++;
      tail.drawing.setFill(CELL_FILL_INCREMENT);
      coreAnim.saveState();
      
      tail.edge.moveEdgeEnd(mArray[tail.value].getCoordinateX() + 25, mArray[tail.value].getCoordinateY());
      
      tail.drawing.setText(tail.value);
      tail.drawing.setFill(CELL_FILL_DEFAULT);
      coreAnim.saveState("Update the tail pointer.");
    }
    
    coreAnim.play();
  }
    
  this.dequeue = function () {
    if (this.isEmpty()) {
      return false;
    }

    coreAnim.clearLog();
    coreAnim.newStateList();
    
    coreAnim.saveState();
    
    mArray[head.value].setFill(CELL_FILL_DECREMENT);
    coreAnim.saveState();
    
    mArray[head.value].setText(null);
    mArray[head.value].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Dequeue the head position.");
    
    head.value++;
    head.drawing.setFill(CELL_FILL_INCREMENT);
    coreAnim.saveState();
    
    head.edge.moveEdgeEnd(mArray[head.value].getCoordinateX() + 25, mArray[head.value].getCoordinateY());
    
    head.drawing.setText(head.value);
    head.drawing.setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Update the tail pointer.");
    
    if (head.value == tail.value) {
      head.value = 0;
      head.drawing.setText(head.value);
      head.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());

      tail.value = 0;
      tail.drawing.setText(tail.value);
      tail.edge.moveEdgeEnd(mArray[0].getCoordinateX() + 25, mArray[0].getCoordinateY());
      
      coreAnim.saveState();
    }
    
    coreAnim.play();
  }
}