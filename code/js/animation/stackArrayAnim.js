// Defines an Array of "Cells".
// All the animations are controled from this file.

var StackArrayAnim = function(){
  var coreAnim = new CoreAnimObject();
  var array = {};

  this.init = function(type){
    coreAnim.init();
    
    array["top"] = coreAnim.newSquareObject("top",50,50,0);
    for(var i=0; i<16; i++){
      array[i] = coreAnim.newSquareObject(i, (i+1)*50, 300, null);    
    }
    
    coreAnim.saveState();

    coreAnim.play(0);
  }

  // Structure Control Functions
  this.empty = function(){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    array["top"].setText(0);
    for(var i=0; i<16; i++){
      array[i].setText(null);
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }
  
  // Stack Functions
  
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
    
    array["top"].setText(removedIndex);
    array["top"].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Change the top pointer.")
    
    coreAnim.play();
  }
  
  this.push = function(insertedValue, insertedIndex, newTop){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    //coreAnim.createArrayHighlight("top");
    //coreAnim.moveHighlight(insertedIndex);
    
    array[insertedIndex].setText(insertedValue);
    array[insertedIndex].setRectClass("highlight");
    coreAnim.saveState("Inserting the new value");

    //coreAnim.deleteHighlight();
    
    array["top"].setFill(CELL_FILL_INCREMENT);
    coreAnim.saveState();
    
    array["top"].setText(newTop);
    array["top"].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Change the top pointer.")
    
    coreAnim.play();
  }
  
  // Queue Functions
  
  this.enqueue = function(insertedValue, insertedIndex, newTail){
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current queue.");
    
    if ($("#chk-learn").is(":checked")){
      createNewValue(insertedValue);
    } else {
      createArrayHighlight("tail");
      moveHighlight(insertedIndex);
      cellList[insertedIndex].setText(insertedValue);
      saveState(internalArray, "Inserting value.");
      deleteHighlight();
      
      blinkContainer("tail", CELL_FILL_INCREMENT);
      cellList["tail"].setText(newTail);
      saveState(internalArray, "Update the tail index.");
      blinkContainer("tail", CELL_FILL_DEFAULT);
    }
    
    play();
  }
  
  this.dequeue = function(removedValue, newHead){
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current queue.");
    
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DECREMENT);
    cellList[removedValue].setText(null);
    saveState(internalArray, "Dequeue the first used position.");
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DEFAULT);
    
    
    blinkContainer("head", "palegreen");
    updatePointer("head", newHead);
    blinkContainer("head", "white");
    
    play();
  }
}