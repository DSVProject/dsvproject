// Defines an Array of "Cells".
// All the animations are controled from this file.

var QueueLinkedListAnim = function(){
  var coreAnim = new CoreAnimObject();
  var pointers = {};
  var cells = {};
  var edges = {};
  
  var counter = 0;
  var head = 0;
  var tail = 0;
  
  var node = {
    "object": null,
    "edge": null,
    "next": null
  }

  this.init = function(type){
    coreAnim.init();
    
    pointers["head"] = coreAnim.newSquareObject("head",50,50,"null","head");
    pointers["tail"] = coreAnim.newSquareObject("tail",150,50,"null","tail");
    
    coreAnim.saveState();

    coreAnim.play(0);
  }

  this.empty = function(){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    for(var key in cells) {
      if(cells.hasOwnProperty(key)) {
        console.log("key: " + key, cells[key]);
        cells[key].remove();
      }
    }
    
    coreAnim.saveState();
    coreAnim.play();
  }
  
  this.enqueue = function(insertedValue, newHead, newTail){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    if (coreAnim.isLearningMode()){
    } else {
    
      var i = Object.keys(cells).length + 1;  
      cells[insertedValue.string] = coreAnim.newSquareObject(i, (i+1)*80, 300, insertedValue, i);
      
      coreAnim.saveState("Inserting the new value");
      
      pointers["head"].setFill(CELL_FILL_INCREMENT);
      pointers["tail"].setFill(CELL_FILL_INCREMENT);
      coreAnim.saveState();
      
      for(var key in cells) {
        if(cells.hasOwnProperty(key)) {
          if(cells[key].getText() == edges["head"].getText()) {
            edges["head"] = coreAnim.newEdgeObject("head", pointers["head"].getID(), cells[pointers[].getID());
          }
      
      edges["head"] = coreAnim.newEdgeObject("head", pointers["head"].getID(), cells[pointers[].getID());
      edges["tail"] = coreAnim.newEdgeObject("tail", pointers["tail"].getID(), cells[pointers[].getID());
      
      pointers["head"].setText(newHead);
      pointers["head"].setFill(CELL_FILL_DEFAULT);
      pointers["tail"].setText(newTail);
      pointers["tail"].setFill(CELL_FILL_DEFAULT);
      coreAnim.saveState("Update the tail pointer.");
    }
    
    coreAnim.play();
  }
  
  /*
  this.dequeue = function(removedValue, newHead){
    coreAnim.clearLog();
    coreAnim.newStateList();
    
    cells[removedValue].setFill(CELL_FILL_DECREMENT);
    coreAnim.saveState();
    
    cells[removedValue].remove();
    coreAnim.saveState("Dequeue the head position.");
    
    
    cells["head"].setFill(CELL_FILL_INCREMENT);
    coreAnim.saveState();
    
    //edges["head"].moveEdge(array[newHead].getCoordinateX(), array[newHead].getCoordinateY());
    
    cells["head"].setText(removedValue);
    cells["head"].setFill(CELL_FILL_DEFAULT);
    coreAnim.saveState("Update the tail pointer.")
    
    coreAnim.play();

  }*/
}