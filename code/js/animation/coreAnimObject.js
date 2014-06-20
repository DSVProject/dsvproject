// All key methods related to animation are located in this file
var CoreAnimObject = function(){
  // Internal arrays that keeps an instance of all objects on the screen
  var objectList = [];
  var edgeList = [];
  
  // Array to control the steps of the current animation
  var stateList = [];
  
  // Number of iterations of the current animation
  var iterationNumber = 0;
  
  // Initiliase the graphic objects related to this implementation
  this.init = function(){
    // This groups will hold the graphic elements 
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge");
        
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label");
             
    var shapeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-shape");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text");
  }
  
  // Animation Control Functions
  /**
    * Creates a snapshot of the current state of all the objects on the screen.
    * All other functions that change any property of a graphic element should call this function as a last instruction. 
    *
    * @param {String} status : an optional message about the changes, that will appear on the screen log.
    */
  this.saveState = function(status){
    var state = {}; // The current state being created
    var newList = []; // The copy of the current objectList
    var clone;  // The instance for the cloned Object
    
    for(var key in objectList){
      switch(objectList[key].getType()) {
        case "SquareObject":
          clone = new SquareObject();
          break;
      }
      
      clone.cloneProperties(objectList[key].getAttributes());
      clone.cloneEdges(objectList[key].getEdges());
      newList[key] = clone; 
    }
    
    // Each state will hold the "data" which is a copy of objectList, and a "status" which will appear on the log.
    state["data"] = newList;
    state["status"] = status;
  
    stateList[iterationNumber] = state;
    iterationNumber++;
  }
  
  /**
    * Reset the state list.
    * Called as the first instruction, before making changes on the graphic elements.
    */
  this.newStateList = function(){
    stateList = {};
    iterationNumber = 0;
  }
  
  /**
    * Start playing all the states saved in StateList.
    * 
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.play = function(duration){
    if(duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    if(stateList == null) return;
    iterationNumber = 0;
    
    draw(stateList[iterationNumber], duration);
    
    setTimeout(function(){
      next(duration);
    }, duration);
  }
  
  /**
    * Call the next item from StateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  function next(duration){
    if(iterationNumber < 0) iterationNumber = 0;
    
    iterationNumber++;
    
    if(iterationNumber < Object.keys(stateList).length) {
		  draw(stateList[iterationNumber], duration);
		  
		  setTimeout(function(){
        next(duration);
      }, duration);
	  }
  }
  
  /**
    * Create a square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value to be displayed inside the item.
    * @param {String} label : the label which will appear beneath the item.
    *
    * @return {SquareObject} : the new object.
    */
  this.newSquareObject = function(id, x, y, value, label){
    objectList[id] = new SquareObject(id, x, y, value, label, "shape", "innerText", "label");
    
    return objectList[id];
  }
  
  /**
    * Create an edge graphic element, that will be owned by the origin object.
    *
    * @param {String || Number} id : the id of the item.
    * @param {String || Number} idObjectA : the id of the origin object of the edge.
    * @param {String || Number} idObjectB : the id of the destination object of the edge.
    *
    * @return {EdgeObject} : the new object.
    */
  this.newEdgeObject = function(id, idObjectA, idObjectB){
    edgeList[id] = new EdgeObject(id, objectList[idObjectA].getCoordinateX(), objectList[idObjectA].getCoordinateY(), objectList[idObjectB].getCoordinateX(), objectList[idObjectB].getCoordinateY(), "edge");
    
    objectList[idObjectA].addEdge(edgeList[id]);
    
    return edgeList[id];
  }
  
  /*
  this.createArrayHighlight = function(id){
    objectList["highlight"] = new SquareObject("highlight", objectList[id].getCoordinateX(), objectList[id].getCoordinateY(), null, "shape", "innerText");
    
    objectList["highlight"].setFillOpacity(animProperties["cell"]["highlight"]["fill-opacity"]);
    objectList["highlight"].setStroke(animProperties["cell"]["highlight"]["stroke"]);
    objectList["highlight"].setStrokeWidth(animProperties["cell"]["highlight"]["stroke-width"]);
  
    //internalJson.push(objectList["highlight"].getAttributes());
    
    this.saveState("The current " + id + " index.");
  };
  
  this.moveHighlight = function(insertedIndex){
    objectList["highlight"].moveShape(objectList[insertedIndex].getCoordinateX(), objectList[insertedIndex].getCoordinateY());
    this.saveState("Where the new value should be inserted.");
  }
  
  this.deleteHighlight = function(){
    for(var k in internalJson) {
      if (internalJson[k].id == "highlight") {
        internalJson.splice(k,1);
        break;
      }
    }
    
    this.saveState();
  }
  */
  
  /**
    * Iterate through all items of objectList, drawing the changes on the screen.
    *
    * @param {state} currentState : a state containing the ["data"], which is a copy of objectList and a ["status"] to be printed on the log.
    * @param {Number} dur : the duration in miliseconds of the total animation.
    */
  function draw(currentState, dur){
    var currentObjectList = currentState["data"];

    for(var key in currentObjectList){
      currentObjectList[key].draw(dur);
    }


    if(typeof currentState["status"] != 'undefined'){
      d3.select("#log")
          .append("div")
          .transition()
          .duration(dur)
          .text(currentState["status"]);
    }
  }
  
  this.clearLog = function(){
    d3.select("#log").selectAll("div")
        .remove();
  }
  
  this.isLearningMode = function(){
    return $("#chk-learn").is(":checked");
  }
}