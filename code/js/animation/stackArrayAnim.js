// Defines an Array of "Cells".
// All the animations are controled from this file.

var StackArrayAnim = function () {
  var coreAnim = new CoreAnimObject();
  var array = {};
  var edges = {};

  this.init = function (type) {
    coreAnim.init();
    
    array["top"] = coreAnim.newSquareObject("top", 50, 50, 0, "top");
    for (var i=0; i<16; i++){
      array[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null, i);    
    }
    
    edges["top"] = coreAnim.newEdgeObject("top", array["top"].getID(), array["top"].getCoordinateX() + 25, array["top"].getCoordinateY() + 100, array[0].getCoordinateX() + 25, array[0].getCoordinateY());
    
    coreAnim.saveState();

    coreAnim.play(0);
  }

  this.empty = function(){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    array["top"].setText(0);
    edges["top"].moveEdge(array[0].getCoordinateX(), array[0].getCoordinateY());
    for (var i=0; i<16; i++){
      array[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }

  this.push = function(insertedValue, insertedIndex, newTop){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    if (coreAnim.isLearningMode()){
      array[insertedIndex].setText(insertedValue);
      array[insertedIndex].setFill("yellow");
    
      var newValue = coreAnim.newSquareObject("newValue", array[insertedIndex].getCoordinateX(), array[insertedIndex].getCoordinateY());
      
      coreAnim.saveState("Move the new value to its right position.");
      
      coreAnim.play(0);
      array[insertedIndex].setTransform(500-(insertedIndex*50) , -250);
      //newValue.toggleDrag();
      
    } else {
      //coreAnim.createArrayHighlight("top");
      //coreAnim.moveHighlight(insertedIndex);
      
      array[insertedIndex].setText(insertedValue);
      //array[insertedIndex].setRectClass("highlight");
      coreAnim.saveState("Inserting the new value");
  
      //coreAnim.deleteHighlight();
      
      array["top"].setFill(CELL_FILL_INCREMENT);
      coreAnim.saveState();
      
      edges["top"].moveEdgeEnd(array[newTop].getCoordinateX() + 25, array[newTop].getCoordinateY());
      
      array["top"].setText(newTop);
      array["top"].setFill(CELL_FILL_DEFAULT);
      coreAnim.saveState("Update the top pointer.");
      
      coreAnim.play();
    }
  }
  
  this.pop = function(removedIndex){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    array[removedIndex].setFill(CELL_FILL_DECREMENT);
    coreAnim.saveState();
    
    array[removedIndex].setText(null);
    array[removedIndex].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Pop the top position.");
    
    array["top"].setFill(CELL_FILL_INCREMENT);
    coreAnim.saveState();
    
    edges["top"].moveEdgeEnd(array[removedIndex].getCoordinateX() + 25, array[removedIndex].getCoordinateY());
    
    array["top"].setText(removedIndex);
    array["top"].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Update the top pointer.")
    
    coreAnim.play();
  }
}