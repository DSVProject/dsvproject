// All key methods related to animation are located in this file
var CoreAnimObject = function(){
  
  // Json object that will be used to change the graphics on the screen
  //var internalJson = [];
  
  // Internal array that keeps an instance of all objects on the screen
  var objectList = {};
  
  // Array to control the steps of the current animation
  var stateList = {};
  
  // Number of iterations of the current animation
  var iterationNumber = 0;
  
  // Initiliase the graphic objects related to this implementation
  this.init = function(){
    // This groups will hold the graphic elements          
    var shapeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-shape");
      
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text");
        
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge");
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
    var newList = {}; // The copy of the current objectList
    var clone;  // The instance for the cloned Object
    
    for(var key in objectList){
      switch(objectList[key].getType()) {
        case "SquareObject":
          clone = new SquareObject();
          break;
      }
      
      clone.cloneProperties(objectList[key].getAttributes())
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
    
    //this.saveState("Initial state.");
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
    * Create an initial graphic element, that will appear on the screen when the page is loaded.
    * When calling this function all the animations will happen at once, and not step by step.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value of the item.
    */
  this.createNewInitialItem = function(id, x, y, value){
    objectList[id] = new SquareObject(id, x, y, value, "shape", "innerText");
    
    internalJson.push(objectList[id].getAttributes());
    
    return objectList[id];
  }
  
  // Other Functions
  this.createNewCell = function(id, x, y, value){
    objectList[id] = new SquareObject(id, x, y, value, "shape", "innerText");
    
    internalJson.push(objectList[id].getAttributes());
    
    this.saveState("New cell created.");
  }
  
  /**
    * Create a square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value of the item.
    */
  this.newSquareObject = function(id, x, y, value){
    objectList[id] = new SquareObject(id, x, y, value, "shape", "innerText");
    
    return objectList[id];
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
}