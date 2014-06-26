// Defines an Array of "Cells".
// All the animations are controled from this file.

var QueueArrayAnim = function () {
  var coreAnim = new CoreAnimObject();
  var array = {};
  var edges = {};

  this.init = function (type) {
    coreAnim.init();
    
    array["head"] = coreAnim.newSquareObject("head", 50, 50, 0, "head");
    array["tail"] = coreAnim.newSquareObject("tail", 150, 50, 0, "tail");
    for (var i=0; i<16; i++){
      array[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i);    
    }
    
    edges["head"] = coreAnim.newEdgeObject("head", array["head"].getID(), array["head"].getCoordinateX() + 25, array["head"].getCoordinateY() + 100, array[0].getCoordinateX() + 25, array[0].getCoordinateY());
    edges["tail"] = coreAnim.newEdgeObject("tail", array["tail"].getID(), array["tail"].getCoordinateX() + 25, array["tail"].getCoordinateY() + 100, array[0].getCoordinateX() + 25, array[0].getCoordinateY());
    
    coreAnim.saveState();

    coreAnim.play(0);
  }

  this.empty = function(){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    array["head"].setText(0);
    array["tail"].setText(0);
    edges["head"].moveEdgeEnd(array[0].getCoordinateX() + 25, array[0].getCoordinateY());
    edges["tail"].moveEdgeEnd(array[0].getCoordinateX() + 25, array[0].getCoordinateY());
    for(var i=0; i<16; i++){
      array[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }
  
  this.enqueue = function(insertedValue, insertedIndex, newTail){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    if (coreAnim.isLearningMode()){
      var newValue = coreAnim.newSquareObject("newValue", 500, 50, insertedValue);
      
      //test.toggleDrag();
      coreAnim.saveState("Move the new value to its right position.");
    } else {
      //coreAnim.createArrayHighlight("top");
      //coreAnim.moveHighlight(insertedIndex);
      
      array[insertedIndex].setText(insertedValue);
      //array[insertedIndex].setRectClass("highlight");
      coreAnim.saveState("Inserting the new value");
  
      //coreAnim.deleteHighlight();
      
      array["tail"].setFill(CELL_FILL_INCREMENT);
      coreAnim.saveState();
      
      edges["tail"].moveEdgeEnd(array[newTail].getCoordinateX() + 25, array[newTail].getCoordinateY());
      
      array["tail"].setText(newTail);
      array["tail"].setFill(CELL_FILL_DEFAULT);
      coreAnim.saveState("Update the tail pointer.");
    }
    
    coreAnim.play();
  }
  
  this.dequeue = function(removedValue, newHead){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    array[removedValue].setFill(CELL_FILL_DECREMENT);
    coreAnim.saveState();
    
    array[removedValue].setText(null);
    array[removedValue].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Dequeue the head position.");
    
    
    array["head"].setFill(CELL_FILL_INCREMENT);
    coreAnim.saveState();
    
    edges["head"].moveEdgeEnd(array[newHead].getCoordinateX() + 25, array[newHead].getCoordinateY());
    
    array["head"].setText(removedValue);
    array["head"].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Update the tail pointer.");
    
    coreAnim.play();
  }
}