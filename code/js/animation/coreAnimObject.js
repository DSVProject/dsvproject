/**
  * Defines the unit the will control the animation main actions.
  *
  * When initiated it will create the svg groups that will hold the graphic elements:
  *   #g-shape: holds all the svg circles and squares
  *   #g-text: holds all the svg texts, that will appear inside the shapes
  *   #g-label: holds all the svg texts that are acting like labels, appearing beneath the shapes
  *   #g-edge: holds all the svg lines and paths, used to conect the elements
  *
  * 
  */
var CoreAnimObject = function () {
  var selfie = this;
  
  // Internal arrays that keeps an instance of all objects on the screen
  var objectList = [];
  
  // Array to control the steps of the current animation
  var stateList = [];
  
  // Number of iterations of the current animation
  var iterationNumber = 0;
  var animationStatus = ANIMATION_STOP;
  
  this.init = function () {
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge")
        .attr("class", "edge");
        
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label")
        .attr("class", "label");
             
    var shapeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-shape")
        .attr("class", "shape");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text")
        .attr("class", "innerText");
  }
  
  // Animation Control Functions
  
  /**
    * Creates a snapshot of the current state of all the objects on the screen.
    * All other functions that change any property of a graphic element should call this function as a last instruction. 
    *
    * @param {String} status : an optional message about the changes, that will appear on the screen log.
    */
  this.saveState = function (status) {
    var state = {}; // The current state being created
    var newList = []; // The copy of the current objectList
    var clone;  // The instance for the cloned Object
    
    for (var key in objectList){
      clone = objectList[key].cloneObject();
      newList[key] = clone; 
    }
    
    // Each state will hold the "data" which is a copy of objectList, and a "status" which will appear on the log.
    state.data = newList;
    state.status = status;
  
    stateList[iterationNumber] = state;
    iterationNumber++;
  }
  
  /**
    * Reset the state list.
    * Called as the first instruction, before making changes on the graphic elements.
    */
  this.newStateList = function () {
    stateList = {};
    iterationNumber = 0;
  }

  /**
    * Pause the current animation.
    */
  this.pause = function () {
    animationStatus = ANIMATION_PAUSE;
  }
  
  /**
    * Call the next item from StateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.next = function (duration) {
    if (iterationNumber < 0) iterationNumber = 0;
    
    iterationNumber++;

    if (iterationNumber >= Object.keys(stateList).length) animationStatus = ANIMATION_STOP;

    if (animationStatus !== ANIMATION_STOP) {
    //if (iterationNumber < Object.keys(stateList).length) {
      draw(stateList[iterationNumber], duration);	
      if (animationStatus === ANIMATION_PLAY) {
        setTimeout(function(){
          selfie.next(duration);
        }, duration);
      }
    }
  }
  
  this.previous = function () {
    if (iterationNumber >= Object.keys(stateList).length) iterationNumber = Object.keys(stateList).length - 1;
    
    iterationNumber--;
    
    if (iterationNumber < 0) iterationNumber = 0;
    
    if (iterationNumber < Object.keys(stateList).length) {
      draw(stateList[iterationNumber], 0, true);  
    }
  }
  
  /**
    * Start playing all the states saved in StateList.
    * 
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.play = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    if (stateList == null) return;
    if (animationStatus === ANIMATION_STOP) iterationNumber = 1;
    if (animationStatus != ANIMATION_PLAY) animationStatus = ANIMATION_PLAY;

    draw(stateList[iterationNumber], duration);
    
    setTimeout(function(){
      selfie.next(duration);
    }, duration);
  }
  
  /**
    * Create a square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value to be displayed inside the item.
    * @param {String} label : the label which will appear beneath the item.
    * @param {String} shapeClass : the class of the svg rect element, used for styling and functionality.
    *
    * @return {SquareObject} : the new object.
    */
  this.newSquareObject = function (id, x, y, value, label, shapeClass) {
    objectList[id] = new SquareObject(id, x, y, value, label, shapeClass, "innerText", "label");
    
    return objectList[id];
  }
  
   /**
    * Create a double square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value1 : the value to be displayed inside the first square.
    * @param {String} value1 : the value to be displayed inside the second square.
    * @param {String} label : the label which will appear beneath the item.
    * @param {String} shapeClass : the class of the svg element, used for styling and functionality.
    *
    * @return {SquareObject} : the new object.
    */
  this.newDoubleSquareObject = function (id, x, y, value1, value2, label, shapeClass) {
    objectList[id] = new DoubleSquareObject(id, x, y, value1, value2, label, shapeClass, "innerText", "label");
    
    return objectList[id];
  }
  
  this.newUserObject = function (id, cx, cy, radius, text, circleClass) {
    objectList[id] = new UserObject(id, cx, cy, radius, text, circleClass, "innerText");
    
    return objectList[id];
  }
  
  /**
    * Create an edge graphic element, that will be owned by the origin object.
    *
    * @param {String || Number} id : the id of the item.
    * @param {String || Number} idObjectA : the id of the origin object of the edge.
    * @param {Number} ax : the x coordinate of the start of the edge, with necessary adjustments.
    * @param {Number} ay : the y coordinate of the start of the edge, with necessary adjustments.
    * @param {Number} bx : the x coordinate of the end of the edge, with necessary adjustments.
    * @param {Number} by : the y coordinate of the end of the edge, with necessary adjustments.
    * @param {String} direction : if there's yet no current target for edge (with bx and by equal to null),
    *                             an edge will be created in this direction, using ax and ay as base.
    *
    * @return {EdgeObject} : the new object.
    */
  this.newEdgeObject = function (id, idObjectA, ax, ay, bx, by, direction) {
    if (bx == null || by == null) {
      if (direction === "right") {
          bx = ax + 50;
          by = ay;
      } else if (direction === "down") {
        bx = ax;
        by = ay + 50;
      }
    }
  
    var newEdge = new EdgeObject(id, ax, ay, bx, by, "edge");
    
    objectList[idObjectA].addEdge(newEdge);
    
    return newEdge;
  }
  
  this.removeShape = function (id) {
    objectList[id].setToRemove(true);
  }
  
  this.removeAll = function (selectedClass, duration) {
    for (var key in objectList) { 
      if (objectList[key].getRectClass() == selectedClass) {
        
        //alert("entrei");
        objectList[key].remove(duration);
        
        delete objectList[key];
      }
    }
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
    * @param {Boolean} withRemove : boolean flag to be used when reverting any changes with the media controls (Previous action).
    */
  function draw(currentState, dur, withRemove){
    var currentObjectList = currentState.data;
    
    if(typeof currentState.status != 'undefined'){
      d3.select("#log")
          .append("div")
          .transition()
          .duration(dur)
          .text(currentState.status);
    }
    
    if (withRemove === true) {
      for (var key in objectList) {
        if (typeof currentObjectList[key] == 'undefined') {
          objectList[key].remove(0);
          delete objectList[key];
        }
      }
    }

    for (var key in currentObjectList){
      if (currentObjectList[key].getToRemove()){
        currentObjectList[key].remove(0);
        delete objectList[key];
      } else {
        currentObjectList[key].draw(dur);
      }
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